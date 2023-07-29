import { NotAutoPrintError } from '../errors';
import { toPlainErrorObject } from '../errors/utils/errorUtils';

let prevErrorStack: string | undefined;
const isJest =
  process.env.JEST_WORKER_ID !== undefined || process.env.NODE_ENV === 'test';

const autoLogger = {
  error: (error: Error, ...messages: unknown[]) => {
    if (isJest) {
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      if (
        error.stack !== prevErrorStack &&
        !(error instanceof NotAutoPrintError)
      ) {
        setTimeout(() => {
          // @ts-ignore
          if (error && error.$$autoPrintErrorIgnore) {
            return;
          }
          const plainError = toPlainErrorObject(error);
          console.error('AUTO-LOGS:', error, plainError, ...messages);
        }, 600);
        prevErrorStack = error.stack;
      }
    }
  },
};

export default autoLogger;
