import { FETCH_HOTEL, fetchHotelAction, fetchHotel } from './actions';

describe('pages actions', () => {
  describe('fetchHotelAction', () => {
    it('returns action', () => {
      expect(fetchHotelAction('foo')).toEqual({
        type: FETCH_HOTEL,
      });
    });
  });
  describe('fetchHotel', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      fetchHotel()(dispatch, () => {});

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
