export enum OneKeyErrorClassNames {
  OneKeyError = 'OneKeyError',
  OneKeyHardwareError = 'OneKeyHardwareError',
  OneKeyValidatorError = 'OneKeyValidatorError',
  OneKeyValidatorTip = 'OneKeyValidatorTip',
  OneKeyAbortError = 'OneKeyAbortError',
  OneKeyWalletConnectModalCloseError = 'OneKeyWalletConnectModalCloseError',
  OneKeyAlreadyExistWalletError = 'OneKeyAlreadyExistWalletError',
  OneKeyErrorInsufficientNativeBalance = 'OneKeyErrorInsufficientNativeBalance',
}

export type IOneKeyErrorInfo = Record<string | number, string | number>;

export type OneKeyHardwareErrorData = {
  reconnect?: boolean | undefined;
  connectId?: string;
  deviceId?: string;
};

export type OneKeyHardwareErrorPayload = {
  code?: number;
  error?: string;
  message?: string;
  params?: any;
  connectId?: string;
  deviceId?: string;
};
