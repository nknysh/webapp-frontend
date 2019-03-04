import { FETCH_HOTELS, fetchHotelsAction, fetchHotels } from './actions';

describe('pages actions', () => {
  describe('fetchHotelsAction', () => {
    it('returns action', () => {
      expect(fetchHotelsAction('foo')).toEqual({
        type: FETCH_HOTELS,
      });
    });
  });
  describe('fetchHotels', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      fetchHotels()(dispatch);

      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
