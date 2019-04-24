import { fetchHotelAction, fetchHotel } from './actions';

describe('hotel actions', () => {
  describe('fetchHotelAction', () => {
    it('returns action', () => {
      expect(fetchHotelAction('foo')).toMatchSnapshot();
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
