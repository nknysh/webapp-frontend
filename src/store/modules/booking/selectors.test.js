import { initialState } from 'store/common';

import { getBooking, getBookingData } from './selectors';

const state = {
  booking: {
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
      expect(getBooking(state)).toEqual(state.booking);
    });
  });
  describe('getBookingData', () => {
    it('returns the data key', () => {
      expect(getBookingData(state)).toEqual(state.booking.data);
    });
  });
});
