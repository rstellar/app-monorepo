import platformEnv from '../../platformEnv';

/**
 * Converts an error object into a plain object with specific properties.
 *
 * @param {Object} error - The error object to convert. It may have properties such as name, message, stack (js native Error), code, data (Web3RpcError), className, info, key (OneKeyError).
 * @returns {Object} A plain object with properties: name, message, code, data, className, info, key, stack. If the platform is Android hermes engine, the stack property will be a specific error message.
 */
export function toPlainErrorObject(error: {
  // js native Error props
  name?: any;
  message?: any;
  stack?: any;
  // Web3RpcError props
  code?: any;
  data?: any;
  // OneKeyError props
  className?: any;
  key?: any;
  info?: any;
}) {
  return {
    name: error.name,
    message: error.message,
    code: error.code,
    data: error.data,
    className: error.className,
    info: error.info,
    key: error.key,
    // Crash in Android hermes engine (error.stack serialize fail, only if Web3Errors object)
    stack: platformEnv.isNativeAndroid
      ? 'Access error.stack failed in Android hermes engine: unable to serialize, circular reference is too complex to analyze'
      : error.stack,
  };
}

// 生成 jsdoc 文档, 包含一个 example
export function safeConsoleLogError(error: Error | unknown) {
  if (platformEnv.isNativeAndroid) {
    // sometimes error.stack cause Android hermes engine crash
    delete (error as Error).stack;
  }
  console.error(error);
}
