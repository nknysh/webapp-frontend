import { initialState } from 'store/common';

import { getOffers, getOffersData } from './selectors';

const state = {
  offers: {
    ...initialState,
    data: {
      foo: {
        id: 'bar',
        name: 'FooBar',
      },
    },
  },
};

describe('offers selectors', () => {
  describe('getOffers', () => {
    it('returns the root key', () => {
      expect(getOffers(state)).toEqual(state.offers);
    });
  });
  describe('getOffersData', () => {
    it('returns the data key', () => {
      expect(getOffersData(state)).toEqual(state.offers.data);
    });
  });
});
