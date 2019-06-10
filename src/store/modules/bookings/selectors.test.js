import { initialState } from 'store/common';

import { getBookings, getBookingData } from './selectors';

const state = {
  bookings: {
    ...initialState,
    data: {
      foo: {
        id: 'bar',
        name: 'FooBar',
        destinationUuid: undefined,
      },
    },
  },
};

describe('Booking selectors', () => {
  describe('getBooking', () => {
    it('returns the root key', () => {
      expect(getBookings(state)).toEqual(state.bookings);
    });
  });
  describe('getBookingData', () => {
    it('returns the data key', () => {
      expect(getBookingData(state)).toEqual(state.bookings.data);
    });
  });
});
