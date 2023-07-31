// jest tests
import {
  InvalidAccount,
  InvalidAddress,
  OneKeyError,
  TooManyHWPassphraseWallets,
} from '.';

describe('OneKey Error tests', () => {
  it('common tests', () => {
    const e1 = new TooManyHWPassphraseWallets(12);
    expect(e1.constructorName).toBe('TooManyHWPassphraseWallets');
    expect(e1.message).toBe('Unknown Onekey Internal Error. ');
  });
  it('default error message matched', () => {
    let e = new InvalidAccount();
    expect(e.message).toBe('InvalidAccount');
    expect(e.constructorName).toBe('InvalidAccount');
    expect(e.code).toBe(-99999);

    e = new InvalidAccount({ message: 'test111' });
    expect(e.message).toBe('test111');

    // e = new InvalidAccount('hello');
    e = new InvalidAddress();
    expect(e.message).toBe('InvalidAddress');
  });
});
