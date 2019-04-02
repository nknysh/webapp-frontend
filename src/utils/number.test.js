import { formatPrice } from './number';

describe('number utils', () => {
  describe('formatPrice', () => {
    it('returns formatted price', () => {
      expect(formatPrice(1000)).toMatchSnapshot();
    });
  });
});
