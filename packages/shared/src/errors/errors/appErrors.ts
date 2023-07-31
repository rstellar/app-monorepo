/* eslint max-classes-per-file: "off" */
import { isString } from 'lodash';

import type { LocaleIds } from '@onekeyhq/components/src/locale';
import type { LocaleKeyInfoMap } from '@onekeyhq/components/src/locale/LocaleKeyInfoMap';

import { OneKeyErrorClassNames } from '../types/errorTypes';
import { normalizeErrorProps } from '../utils/errorUtils';

import { OneKeyError } from './baseErrors';

import type { IOneKeyError } from '../types/errorTypes';

// Generic errors.

export class NotImplemented extends OneKeyError {
  override key: LocaleIds = 'msg__engine__not_implemented';

  constructor(props?: IOneKeyError | string) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'OneKeyError: NotImplemented',
      }),
    );
  }
}

export class OneKeyInternalError extends OneKeyError {
  override key: LocaleIds = 'msg__engine__internal_error';

  constructor(props?: IOneKeyError | string) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'OneKeyError: InternalError',
      }),
    );
  }
}

export class OneKeyValidatorError<
  K extends keyof LocaleKeyInfoMap = any,
> extends OneKeyError<LocaleKeyInfoMap[K]> {
  override className = OneKeyErrorClassNames.OneKeyValidatorError;

  override key: LocaleIds = 'onekey_error_validator' as LocaleIds;

  constructor({
    key,
    info,
    message,
  }: {
    key: K;
    info?: LocaleKeyInfoMap[K];
    message?: string;
  }) {
    super({
      key: key as any,
      info,
      message,
    });
  }
}

export class OneKeyValidatorTip<
  K extends keyof LocaleKeyInfoMap = any,
> extends OneKeyError<LocaleKeyInfoMap[K]> {
  override className = OneKeyErrorClassNames.OneKeyValidatorTip;

  override key: LocaleIds = 'onekey_tip_validator' as LocaleIds;

  constructor({
    key,
    info,
    message,
  }: {
    key: K;
    info?: LocaleKeyInfoMap[K];
    message?: string;
  }) {
    super({
      key: key as any,
      info,
      message,
    });
  }
}

export class FailedToTransfer extends OneKeyError {
  override key: LocaleIds = 'msg__engine__failed_to_transfer';
}

export class WrongPassword extends OneKeyError {
  override key: LocaleIds = 'msg__engine__incorrect_password';
}

export class PasswordStrengthValidationFailed extends OneKeyError {
  override key: LocaleIds = 'msg__password_validation';
}

// Simple input errors.

export class InvalidMnemonic extends OneKeyError {
  override key: LocaleIds = 'msg__engine__invalid_mnemonic';

  // give the default constructor to ensure unittest expect.toThrow() checking passed
  constructor(props?: IOneKeyError) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'InvalidMnemonic',
      }),
    );
  }
}

export type IMimimumBalanceRequiredInfo = {
  token: string;
  amount: string;
};
export class MimimumBalanceRequired extends OneKeyError<IMimimumBalanceRequiredInfo> {
  override key: LocaleIds = 'msg__str_minimum_balance_is_str';

  constructor(props?: IOneKeyError<IMimimumBalanceRequiredInfo>) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'MimimumBalanceRequired',
      }),
    );
  }
}

export type IRecipientHasNotActivedInfo = {
  '0': string; // tokenName
};
export class RecipientHasNotActived extends OneKeyError<IRecipientHasNotActivedInfo> {
  override key: LocaleIds = 'msg__recipient_hasnt_activated_str';

  constructor(props?: IOneKeyError<IRecipientHasNotActivedInfo>) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'RecipientHasNotActived',
      }),
    );
  }
}

export class InvalidAddress extends OneKeyError {
  override key: LocaleIds = 'msg__engine__incorrect_address';

  constructor(props?: IOneKeyError) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'InvalidAddress',
      }),
    );
  }
}

export type IInvalidSameAddressInfo = {
  '0': string;
};
export class InvalidSameAddress extends OneKeyError<IInvalidSameAddressInfo> {
  override key: LocaleIds = 'form__address_cannot_send_to_myself';

  constructor(props?: IOneKeyError<IInvalidSameAddressInfo>) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'InvalidSameAddress',
      }),
    );
  }
}

export class InvalidAccount extends OneKeyError {
  override key: LocaleIds = 'msg__engine__account_not_activated';

  constructor(props?: IOneKeyError) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'InvalidAccount',
      }),
    );
  }
}

export class InvalidTokenAddress extends OneKeyError {
  override key: LocaleIds = 'msg__engine__incorrect_token_address';
}

export type IInvalidTransferValueInfo = {
  amount: string;
  unit: string;
};
export class InvalidTransferValue extends OneKeyError<IInvalidTransferValueInfo> {
  override key: LocaleIds = 'msg__engine__incorrect_transfer_value';

  constructor(props?: IOneKeyError<IInvalidTransferValueInfo>) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'InvalidTransferValue',
      }),
    );
  }
}

export class TransferValueTooSmall extends OneKeyError {
  override key: LocaleIds = 'msg__amount_too_small';

  constructor(props?: IOneKeyError) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'TransferValueTooSmall',
      }),
    );
  }
}

// **** only for Native Token  InsufficientBalance
export class InsufficientBalance extends OneKeyError {
  override className =
    OneKeyErrorClassNames.OneKeyErrorInsufficientNativeBalance;

  // For situations that utxo selection failed.
  override key: LocaleIds = 'form__amount_invalid';
}
export type IStringLengthRequirementInfo = {
  minLength: string | number;
  maxLength: string | number;
};
export class StringLengthRequirement<
  T = IStringLengthRequirementInfo,
> extends OneKeyError<T> {
  override key: LocaleIds = 'generic_string_length_requirement' as any;

  constructor(props: IOneKeyError<T>) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'StringLengthRequirement',
      }),
    );
  }
}
export class WalletNameLengthError extends StringLengthRequirement {
  override key: LocaleIds = 'msg__engine__wallet_name_length_error';
}
export type IAccountNameLengthErrorInfo = {
  name: string;
  minLength: number;
  maxLength: number;
};
export class AccountNameLengthError extends OneKeyError<IAccountNameLengthErrorInfo> {
  override key: LocaleIds = 'msg__engine__account_name_length_error';
}

export class WatchedAccountTradeError extends OneKeyError {
  override key: LocaleIds = 'form__error_trade_with_watched_acocunt';
}

// Limitations.

export class AccountAlreadyExists extends OneKeyError {
  override key: LocaleIds = 'msg__engine__account_already_exists';
}

export type IPreviousAccountIsEmptyInfo = {
  '0': string; // accountLabel
};
export class PreviousAccountIsEmpty extends OneKeyError<IPreviousAccountIsEmptyInfo> {
  override key: LocaleIds = 'content__previous_str_account_is_empty';

  constructor(props: IOneKeyError<IPreviousAccountIsEmptyInfo>) {
    super(
      normalizeErrorProps(props, {
        defaultMessage: 'PreviousAccountIsEmpty',
      }),
    );
  }
}

export type INumberLimitInfo = {
  limit: string;
};
export class NumberLimit<T = INumberLimitInfo> extends OneKeyError<T> {
  override key: LocaleIds = 'generic_number_limitation' as any;

  constructor(limit: number) {
    const info: INumberLimitInfo = { limit: limit.toString() };
    super({
      info: info as T,
    });
  }
}
export class TooManyWatchingAccounts extends NumberLimit {
  override key: LocaleIds = 'msg__engine_too_many_watching_accounts';
}

export class TooManyExternalAccounts extends NumberLimit {
  override key: LocaleIds = 'msg__engine_too_many_external_accounts';
}

export class TooManyImportedAccounts extends NumberLimit {
  override key: LocaleIds = 'msg__engine__too_many_imported_accounts';
}

export class TooManyHDWallets extends NumberLimit {
  override key: LocaleIds = 'msg__engine__too_many_hd_wallets';
}

export class TooManyHWWallets extends NumberLimit {
  override key: LocaleIds = 'msg__engine__too_many_hw_wallets';
}

export class TooManyHWPassphraseWallets extends NumberLimit {
  override key: LocaleIds =
    'msg__engine__too_many_hw_passphrase_wallets' as any;
}

export type ITooManyDerivedAccountsInfo = INumberLimitInfo & {
  coinType: string;
  purpose: string;
};
export class TooManyDerivedAccounts extends OneKeyError<ITooManyDerivedAccountsInfo> {
  override key: LocaleIds = 'msg__engine__too_many_derived_accounts';
}

export class PendingQueueTooLong extends NumberLimit {
  override key: LocaleIds = 'msg__engine__pending_queue_too_long';
}

// WalletConnect ----------------------------------------------
export class OneKeyWalletConnectModalCloseError extends OneKeyError {
  override className = OneKeyErrorClassNames.OneKeyWalletConnectModalCloseError;
  // override key: LocaleIds = 'msg__engine__internal_error';
}

export class FailedToEstimatedGasError extends OneKeyError {
  override key: LocaleIds = 'msg__estimated_gas_failure';
}

// Lightning Network ----------------------------------------------
export class InvalidLightningPaymentRequest extends OneKeyError {
  override key: LocaleIds = 'msg__invalid_lightning_payment_request';
}

export class InvoiceAlreadPaid extends OneKeyError {
  override key: LocaleIds = 'msg__invoice_is_already_paid';
}

export class NoRouteFoundError extends OneKeyError {
  override key: LocaleIds = 'msg__no_route_found';
}

export class ChannelInsufficientLiquidityError extends OneKeyError {
  override key: LocaleIds =
    'msg__insufficient_liquidity_of_lightning_node_channels';
}

export class BadAuthError extends OneKeyError {
  override key: LocaleIds = 'msg__authentication_failed_verify_again';
}

export class InvoiceExpiredError extends OneKeyError {
  override key: LocaleIds = 'msg__the_invoice_has_expired';
}

export type IMaxSendAmountErrorInfo = {
  '0': number;
};
export class MaxSendAmountError extends OneKeyError<IMaxSendAmountErrorInfo> {
  override key: LocaleIds = 'msg__the_sending_amount_cannot_exceed_int_sats';
}

export class TaprootAddressError extends OneKeyError {
  override key: LocaleIds =
    'msg__invalid_address_ordinal_can_only_be_sent_to_taproot_address';
}

export type IInscribeFileTooLargeErrorInfo = {
  '0': string;
};
export class InscribeFileTooLargeError extends OneKeyError<IInscribeFileTooLargeErrorInfo> {
  override key: LocaleIds = 'msg__file_size_should_less_than_str';

  constructor(key?: LocaleIds) {
    super({
      info: { '0': '200KB' },
      key,
    });
  }
}

export class UtxoNotFoundError extends OneKeyError {
  override key: LocaleIds = 'msg__nft_does_not_exist';
}

// all networks ----------------------------------------------
export class AllNetworksMinAccountsError extends OneKeyError {
  override key: LocaleIds =
    'msg__you_need_str_accounts_on_any_network_to_create';
}

export class AllNetworksUpto3LimitsError extends OneKeyError {
  override key: LocaleIds =
    'msg__currently_supports_up_to_str_all_networks_accounts';
}
