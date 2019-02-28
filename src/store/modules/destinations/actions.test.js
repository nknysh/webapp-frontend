import { FETCH_DESTINATIONS, fetchDestinationsAction, fetchDestinations } from './actions';

describe('pages actions', () => {
  describe('fetchDestinationsAction', () => {
    it('returns action', () => {
      expect(fetchDestinationsAction('foo')).toEqual({
        type: FETCH_DESTINATIONS,
      });
    });
  });
  describe('fetchDestinations', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      fetchDestinations()(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
