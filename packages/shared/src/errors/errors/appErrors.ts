/* eslint max-classes-per-file: "off" */
import type { LocaleIds } from '@onekeyhq/components/src/locale';

import { OneKeyErrorClassNames } from '../types/errorTypes';

import { OneKeyError } from './baseErrors';

import type { IOneKeyErrorInfo } from '../types/errorTypes';

export type IStringLengthRequirementInfo = {
  minLength: string;
  maxLength: string;
};

// Generic errors.

export class NotImplemented extends OneKeyError {
  constructor(message?: string) {
    super({
      message: message || 'OneKeyError: NotImplemented',
    });
  }

  override key: LocaleIds = 'msg__engine__not_implemented';
}

export class OneKeyInternalError extends OneKeyError {
  override key: LocaleIds = 'msg__engine__internal_error';

  constructor(message?: string, key?: LocaleIds) {
    super({
      message: message || 'OneKeyError: Internal error',
      key,
    });
  }
}

export class OneKeyValidatorError extends OneKeyError<IOneKeyErrorInfo> {
  override className = OneKeyErrorClassNames.OneKeyValidatorError;

  override key: LocaleIds = 'onekey_error_validator' as any;

  constructor(key: LocaleIds, info?: IOneKeyErrorInfo, message?: string) {
    super({
      key,
      info,
      message,
    });
  }
}

export class OneKeyValidatorTip extends OneKeyError<IOneKeyErrorInfo> {
  override className = OneKeyErrorClassNames.OneKeyValidatorTip;

  override key: LocaleIds = 'onekey_tip_validator' as any;

  constructor(key: LocaleIds, info?: IOneKeyErrorInfo, message?: string) {
    super({ message, info, key });
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
  constructor() {
    super({
      message: 'InvalidMnemonic',
    });
  }
}

export type IMimimumBalanceRequiredInfo = {
  token: string;
  amount: string;
};
export class MimimumBalanceRequired extends OneKeyError<IMimimumBalanceRequiredInfo> {
  override key: LocaleIds = 'msg__str_minimum_balance_is_str';

  constructor(token: string, amount: string) {
    super({
      info: { token, amount },
    });
  }
}

export type IRecipientHasNotActivedInfo = {
  '0': string;
};
export class RecipientHasNotActived extends OneKeyError<IRecipientHasNotActivedInfo> {
  override key: LocaleIds = 'msg__recipient_hasnt_activated_str';

  constructor(tokenName: string) {
    super({
      info: { '0': tokenName },
    });
  }
}

export class InvalidAddress extends OneKeyError<IOneKeyErrorInfo> {
  override key: LocaleIds = 'msg__engine__incorrect_address';

  constructor(message?: string, info?: IOneKeyErrorInfo) {
    super({
      message: message || 'InvalidAddress.',
      info,
    });
  }
}

export class InvalidSameAddress extends OneKeyError<IOneKeyErrorInfo> {
  override key: LocaleIds = 'form__address_cannot_send_to_myself';

  constructor(message?: string, info?: IOneKeyErrorInfo) {
    super({
      message: message || 'InvalidAddress.',
      info,
    });
  }
}

export class InvalidAccount extends OneKeyError<IOneKeyErrorInfo> {
  override key: LocaleIds = 'msg__engine__account_not_activated';

  constructor(message?: string, info?: IOneKeyErrorInfo) {
    super({
      message: message || 'InvalidAccount.',
      info,
    });
  }
}

export class InvalidTokenAddress extends OneKeyError {
  override key: LocaleIds = 'msg__engine__incorrect_token_address';
}

export class InvalidTransferValue extends OneKeyError<IOneKeyErrorInfo> {
  override key: LocaleIds = 'msg__engine__incorrect_transfer_value';

  constructor(key?: LocaleIds, info?: IOneKeyErrorInfo) {
    super({
      message: 'Invalid Transfer Value',
      info,
      key: key ?? 'msg__engine__incorrect_transfer_value',
    });
  }
}

export class TransferValueTooSmall extends OneKeyError<IOneKeyErrorInfo> {
  override key: LocaleIds = 'msg__amount_too_small';

  constructor(key?: LocaleIds, info?: IOneKeyErrorInfo) {
    super({
      key: key ?? 'msg__amount_too_small',
      message: 'Transfer Value too small',
      info,
    });
  }
}

// **** only for Native Token  InsufficientBalance
export class InsufficientBalance extends OneKeyError {
  override className =
    OneKeyErrorClassNames.OneKeyErrorInsufficientNativeBalance;

  // For situations that utxo selection failed.
  override key: LocaleIds = 'form__amount_invalid';
}
export class StringLengthRequirement<
  T = IStringLengthRequirementInfo,
> extends OneKeyError<T> {
  override key: LocaleIds = 'generic_string_length_requirement' as any;

  constructor(minLength: number, maxLength: number) {
    const info: IStringLengthRequirementInfo = {
      minLength: minLength.toString(),
      maxLength: maxLength.toString(),
    };
    super({
      info: info as T,
    });
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
  '0': string;
};
export class PreviousAccountIsEmpty extends OneKeyError<IPreviousAccountIsEmptyInfo> {
  override key: LocaleIds = 'content__previous_str_account_is_empty';

  constructor(accountTypeStr: string, key?: LocaleIds) {
    super({ key, info: { '0': accountTypeStr } });
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

export class MaxSendAmountError extends OneKeyError<IOneKeyErrorInfo> {
  override key: LocaleIds = 'msg__the_sending_amount_cannot_exceed_int_sats';

  constructor(key: string, info?: IOneKeyErrorInfo, message?: string) {
    super({ message, info });
  }
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
