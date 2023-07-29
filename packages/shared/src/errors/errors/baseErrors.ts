/* eslint-disable max-classes-per-file */

import { Web3RpcError } from '@onekeyfe/cross-inpage-provider-errors';

import type { LocaleIds } from '@onekeyhq/components/src/locale';

import { OneKeyErrorClassNames } from '../types/errorTypes';

import type { IOneKeyErrorInfo } from '../types/errorTypes';

// @ts-ignore
export interface OneKeyJsError extends Error {
  // ES5 Error props
  name?: string;
  message?: string;
  stack?: string;
  // ES2022 Error props
  cause?: unknown;
}

export class OneKeyWeb3RpcError<T = OneKeyJsError> extends Web3RpcError<T> {}

export class OneKeyError<T = OneKeyJsError> extends OneKeyWeb3RpcError<T> {
  className = OneKeyErrorClassNames.OneKeyError;

  info: IOneKeyErrorInfo;

  key: LocaleIds | string = 'onekey_error';

  constructor(message?: string, info?: IOneKeyErrorInfo) {
    super(-99999, message || '');
    this.info = info || {};
  }

  override get message() {
    // TODO key message with i18n
    // @ts-ignore
    return super.message || `Unknown onekey internal error. ${this.key}`;
  }
}
