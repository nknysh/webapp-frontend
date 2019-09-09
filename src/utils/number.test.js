import { formatPrice, calculatePercentage } from './number';

describe('number utils', () => {
  describe('formatPrice', () => {
    it('returns formatted price for a number', () => {
      expect(formatPrice(1000)).toMatchSnapshot();
    });

    it('returns formatted price for a string', () => {
      expect(formatPrice('1000')).toEqual('1,000.00');
    });

    it('returns formatted price for a string number with decimal suffix', () => {
      expect(formatPrice('1000.00')).toEqual('1,000.00');
    });

    it('returns formatted price for a string number already formatted', () => {
      expect(formatPrice('1,000.00')).toEqual('1,000.00');
    });

    it('returns formatted price for a string number with broken formatting', () => {
      expect(formatPrice('1,0,0,0.0000')).toEqual('1,000.00');
    });

    it('returns formatted price for a string with broken decimal suffix', () => {
      expect(formatPrice('1000.0000')).toEqual('1,000.00');
    });

    it('returns formatted price for a string with a single value decimal suffix', () => {
      expect(formatPrice('1000.4')).toEqual('1,000.40');
    });

    it('returns NaN for a non-number string', () => {
      expect(formatPrice('foobar')).toEqual('NaN');
    });
  });
  describe('calculatePercentage', () => {
    it('returns correct percentage', () => {
      expect(calculatePercentage(234, 12)).toMatchSnapshot();
    });
  });
});
