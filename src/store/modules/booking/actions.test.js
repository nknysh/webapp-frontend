import { updateBookingAction, updateBooking } from './actions';

describe('booking actions', () => {
  describe('fetchHotelAction', () => {
    it('returns action', () => {
      expect(updateBookingAction('foo')).toMatchSnapshot();
    });
  });
  describe('updateBooking', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      updateBooking()(dispatch, () => {});

      expect(dispatch).toHaveBeenCalledTimes(1);
    });
  });
});
