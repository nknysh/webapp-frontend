import { fetchOffersAction } from './actions';

describe('offers actions', () => {
  describe('fetchOffersAction', () => {
    it('returns action', () => {
      expect(fetchOffersAction('foo')).toMatchSnapshot();
    });
  });
});
