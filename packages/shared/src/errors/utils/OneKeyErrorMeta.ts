import type { IOneKeyErrorMeta } from '../types/errorTypes';

export function OneKeyErrorMeta(meta: IOneKeyErrorMeta) {
  return function (constructor: new (...args: any[]) => any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    constructor.prototype.meta = meta;
  };
}
