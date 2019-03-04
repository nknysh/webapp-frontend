import { initialState } from 'store/common';

import { getHotels, getHotelsData, getHotel, getHotelTitle } from './selectors';

const state = {
  hotels: {
    ...initialState,
    data: {
      foo: {
        id: 'bar',
        title: 'FooBar',
      },
    },
  },
};

describe('hotels selectors', () => {
  describe('getHotels', () => {
    it('returns the root key', () => {
      expect(getHotels(state)).toBe(state.hotels);
    });
  });
  describe('getHotelsData', () => {
    it('returns the data key', () => {
      expect(getHotelsData(state)).toBe(state.hotels.data);
    });
  });
  describe('getHotel', () => {
    it('returns the destination based on id', () => {
      expect(getHotel(state, 'foo')).toBe(state.hotels.data.foo);
    });
  });
  describe('getHotelTitle', () => {
    it('returns the destination title based on id', () => {
      expect(getHotelTitle(state, 'foo')).toBe(state.hotels.data.foo.title);
    });
  });
});
