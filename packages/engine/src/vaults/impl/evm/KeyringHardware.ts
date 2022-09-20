/* eslint-disable @typescript-eslint/no-unused-vars */
import { ethers } from '@onekeyfe/blockchain-libs';
import {
  SignedTx,
  UnsignedTx,
} from '@onekeyfe/blockchain-libs/dist/types/provider';

import { HardwareSDK, deviceUtils } from '@onekeyhq/kit/src/utils/hardware';
import debugLogger from '@onekeyhq/shared/src/logger/debugLogger';

import { COINTYPE_ETH as COIN_TYPE, IMPL_EVM } from '../../../constants';
import * as engineUtils from '../../../engineUtils';
import { OneKeyHardwareError } from '../../../errors';
import * as OneKeyHardware from '../../../hardware';
import { AccountType, DBSimpleAccount } from '../../../types/account';
import { KeyringHardwareBase } from '../../keyring/KeyringHardwareBase';
import {
  IGetAddressParams,
  IPrepareHardwareAccountsParams,
  ISignCredentialOptions,
} from '../../types';

import type { IUnsignedMessageEvm } from './Vault';

const PATH_PREFIX = `m/44'/${COIN_TYPE}'/0'/0`;
const CURVE_NAME = 'secp256k1';

export class KeyringHardware extends KeyringHardwareBase {
  async signTransaction(unsignedTx: UnsignedTx): Promise<SignedTx> {
    await this.getHardwareSDKInstance();
    const path = await this.getAccountPath();
    const chainId = await this.getNetworkChainId();
    const { connectId, deviceId } = await this.getHardwareInfo();
    const passphraseState = await this.getWalletPassphraseState();
    return OneKeyHardware.ethereumSignTransaction(
      connectId,
      deviceId,
      path,
      chainId,
      unsignedTx,
      passphraseState,
    );
  }

  async signMessage(
    messages: IUnsignedMessageEvm[],
    options: ISignCredentialOptions,
  ): Promise<string[]> {
    const path = await this.getAccountPath();
    const { connectId, deviceId } = await this.getHardwareInfo();
    const passphraseState = await this.getWalletPassphraseState();
    return Promise.all(
      messages.map((message) =>
        OneKeyHardware.ethereumSignMessage({
          connectId,
          deviceId,
          passphraseState,
          path,
          message,
        }),
      ),
    );
  }

  override async prepareAccounts(
    params: IPrepareHardwareAccountsParams,
  ): Promise<Array<DBSimpleAccount>> {
    await this.getHardwareSDKInstance();
    const { connectId, deviceId } = await this.getHardwareInfo();
    const passphraseState = await this.getWalletPassphraseState();
    const { indexes, names, type } = params;

    let response;
    try {
      response = await HardwareSDK.batchGetPublicKey(connectId, deviceId, {
        ecdsaCurveName: CURVE_NAME,
        paths: indexes.map((index) => `${PATH_PREFIX}/${index}`),
        ...passphraseState,
      });
    } catch (e: any) {
      debugLogger.engine.error(e);
      throw new OneKeyHardwareError(e);
    }
    if (!response.success) {
      throw deviceUtils.convertDeviceError(response.payload);
    }

    const unresolvedRet = response.payload.map(
      async ({ path, publicKey }, idx) => ({
        id: `${this.walletId}--${path}`,
        name: (names || [])[idx] || `EVM #${indexes[idx] + 1}`,
        type: AccountType.SIMPLE,
        path,
        coinType: COIN_TYPE,
        pub: publicKey,
        address: await this.engine.providerManager.addressFromPub(
          this.networkId,
          publicKey,
        ),
      }),
    );
    const result = await Promise.all(unresolvedRet);
    return result;
  }

  async getAddress(params: IGetAddressParams): Promise<string> {
    await this.getHardwareSDKInstance();
    const { connectId, deviceId } = await this.getHardwareInfo();
    const passphraseState = await this.getWalletPassphraseState();
    const address = await OneKeyHardware.ethereumGetAddress(
      connectId,
      deviceId,
      params.path,
      params.showOnOneKey,
      passphraseState,
    );

    return address;
  }
}
