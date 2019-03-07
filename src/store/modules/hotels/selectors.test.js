import { initialState } from 'store/common';

import { getHotels, getHotelsData, getHotel, getHotelName } from './selectors';

const state = {
  hotels: {
    ...initialState,
    data: {
      foo: {
        id: 'bar',
        title: 'FooBar',
        destinationUuid: undefined,
      },
    },
  },
};

describe('hotels selectors', () => {
  describe('getHotels', () => {
    it('returns the root key', () => {
      expect(getHotels(state)).toEqual(state.hotels);
    });
  });
  describe('getHotelsData', () => {
    it('returns the data key', () => {
      expect(getHotelsData(state)).toEqual(state.hotels.data);
    });
  });
  describe('getHotel', () => {
    it('returns the destination based on id', () => {
      expect(getHotel(state, 'foo')).toEqual(state.hotels.data.foo);
    });
  });
  describe('getHotelName', () => {
    it('returns the destination title based on id', () => {
      expect(getHotelName(state, 'foo')).toEqual(state.hotels.data.foo.title);
    });
  });
});
