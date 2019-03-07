import { fetchOffersAction, fetchOffers } from './actions';

describe('offers actions', () => {
  describe('fetchOffersAction', () => {
    it('returns action', () => {
      expect(fetchOffersAction('foo')).toMatchSnapshot();
    });
  });
  describe('fetchOffers', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      fetchOffers()(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
