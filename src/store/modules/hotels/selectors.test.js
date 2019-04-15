import { initialState } from 'store/common';

import { getHotels, getHotelsData } from './selectors';

const state = {
  hotels: {
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
});
