import { Currencies } from './currencies';

describe('Currencies', () => {
  let currencies: Currencies;

  beforeEach(() => {
    currencies = new Currencies();
  });

  it('should convert an amount using a rate', () => {
    expect(currencies.convert(100, 0.058)).toBe(5.8);
  });

  it('should round the conversion to two decimals', () => {
    expect(currencies.convert(1000, 0.058)).toBe(58);
  });

  it('should throw when the rate is not positive', () => {
    expect(() => currencies.convert(100, 0)).toThrowError('El tipo de cambio debe ser mayor a cero');
  });

  it('should convert MXN to USD', () => {
    expect(currencies.mxnToUsd(100)).toBe(5.8);
  });
});
