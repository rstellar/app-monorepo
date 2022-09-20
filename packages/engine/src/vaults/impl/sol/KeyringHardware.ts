/* eslint no-unused-vars: ["warn", { "argsIgnorePattern": "^_" }] */
/* eslint @typescript-eslint/no-unused-vars: ["warn", { "argsIgnorePattern": "^_" }] */
import {
  SignedTx,
  UnsignedTx,
} from '@onekeyfe/blockchain-libs/dist/types/provider';
import { PublicKey, Transaction } from '@solana/web3.js';

import { HardwareSDK, deviceUtils } from '@onekeyhq/kit/src/utils/hardware';
import debugLogger from '@onekeyhq/shared/src/logger/debugLogger';

import { COINTYPE_SOL as COIN_TYPE } from '../../../constants';
import { NotImplemented, OneKeyHardwareError } from '../../../errors';
import { AccountType, DBSimpleAccount } from '../../../types/account';
import { KeyringHardwareBase } from '../../keyring/KeyringHardwareBase';

import type {
  IGetAddressParams,
  IPrepareHardwareAccountsParams,
  ISignCredentialOptions,
} from '../../types';

const PATH_PREFIX = `m/44'/${COIN_TYPE}'`;
const CURVE_NAME = 'ed25519';

export class KeyringHardware extends KeyringHardwareBase {
  override async signTransaction(
    unsignedTx: UnsignedTx,
    _options: ISignCredentialOptions,
  ): Promise<SignedTx> {
    const dbAccount = await this.getDbAccount();
    await this.getHardwareSDKInstance();
    const { connectId, deviceId } = await this.getHardwareInfo();
    const passphraseState = await this.getWalletPassphraseState();
    const { nativeTx: transaction, feePayer } = unsignedTx.payload as {
      nativeTx: Transaction;
      feePayer: PublicKey;
    };

    const response = await HardwareSDK.solSignTransaction(connectId, deviceId, {
      path: dbAccount.path,
      rawTx: transaction.serializeMessage().toString('hex'),
      ...passphraseState,
    });

    if (response.success && response.payload.signature) {
      const { signature } = response.payload;
      transaction.addSignature(feePayer, Buffer.from(signature, 'hex'));
      return {
        txid: signature,
        rawTx: transaction
          .serialize({ requireAllSignatures: false })
          .toString('base64'),
      };
    }

    throw deviceUtils.convertDeviceError(response.payload);
  }

  override signMessage(
    _messages: any[],
    _options: ISignCredentialOptions,
  ): any {
    throw new NotImplemented('Signing solana message is not supported yet.');
  }

  override async prepareAccounts(
    params: IPrepareHardwareAccountsParams,
  ): Promise<Array<DBSimpleAccount>> {
    const { indexes, names } = params;
    await this.getHardwareSDKInstance();
    const { connectId, deviceId } = await this.getHardwareInfo();
    const passphraseState = await this.getWalletPassphraseState();

    let response;
    try {
      response = await HardwareSDK.batchGetPublicKey(connectId, deviceId, {
        showOnOneKey: false,
        ecdsaCurveName: CURVE_NAME,
        paths: indexes.map((index) => `${PATH_PREFIX}/${index}'/0'`),
        ...passphraseState,
      });
    } catch (error: any) {
      debugLogger.common.error(error);
      throw new OneKeyHardwareError(error);
    }
    if (!response.success) {
      debugLogger.common.error(response.payload);
      throw deviceUtils.convertDeviceError(response.payload);
    }

    return response.payload.map(({ path, publicKey }, index) => {
      const address = new PublicKey(publicKey).toBase58();
      return {
        id: `${this.walletId}--${path}`,
        name: (names || [])[index] || `SOL #${indexes[index] + 1}`,
        type: AccountType.SIMPLE,
        path,
        coinType: COIN_TYPE,
        pub: address, // base58 encoded
        address,
      };
    });
  }

  override async getAddress(params: IGetAddressParams): Promise<string> {
    await this.getHardwareSDKInstance();
    const { connectId, deviceId } = await this.getHardwareInfo();
    const passphraseState = await this.getWalletPassphraseState();
    const response = await HardwareSDK.solGetAddress(connectId, deviceId, {
      path: params.path,
      showOnOneKey: params.showOnOneKey,
      ...passphraseState,
    });
    if (response.success && !!response.payload?.address) {
      return response.payload.address;
    }
    throw deviceUtils.convertDeviceError(response.payload);
  }
}
