import { getCurrency, getCurrencySymbol } from './currency';

describe('currency', () => {
  it('getCurrency matches snapshot', () => {
    expect(getCurrency('GBP')).toMatchSnapshot();
  });
  it('getCurrencySymbol matches snapshot', () => {
    expect(getCurrencySymbol('GBP')).toMatchSnapshot();
  });
});
