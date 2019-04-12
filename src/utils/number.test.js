import { formatPrice, calculatePercentage } from './number';

describe('number utils', () => {
  describe('formatPrice', () => {
    it('returns formatted price', () => {
      expect(formatPrice(1000)).toMatchSnapshot();
    });
  });
  describe('calcualtePercentage', () => {
    it('returns correct percentage', () => {
      expect(calculatePercentage(234, 12)).toMatchSnapshot();
    });
  });
});
