import { updateBooking } from './actions';

describe('booking actions', () => {
  describe('updateBooking', () => {
    it('calls dispatch thunks', () => {
      const dispatch = jest.fn();

      updateBooking()(dispatch, () => {});

      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
