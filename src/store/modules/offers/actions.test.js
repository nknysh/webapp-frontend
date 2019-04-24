import { fetchOffersAction, fetchLatestOffers } from './actions';

describe('offers actions', () => {
  describe('fetchOffersAction', () => {
    it('returns action', () => {
      expect(fetchOffersAction('foo')).toMatchSnapshot();
    });
  });
  describe('fetchLatestOffers', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      fetchLatestOffers({})(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
