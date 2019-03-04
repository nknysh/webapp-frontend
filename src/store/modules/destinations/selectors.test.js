import { initialState } from 'store/common';

import { getDestinations, getDestinationsData, getDestination, getDestinationTitle } from './selectors';

const state = {
  destinations: {
    ...initialState,
    data: {
      foo: {
        id: 'bar',
        title: 'FooBar',
      },
    },
  },
};

describe('destinations selectors', () => {
  describe('getDestinations', () => {
    it('returns the root key', () => {
      expect(getDestinations(state)).toBe(state.destinations);
    });
  });
  describe('getDestinationsData', () => {
    it('returns the data key', () => {
      expect(getDestinationsData(state)).toBe(state.destinations.data);
    });
  });
  describe('getDestination', () => {
    it('returns the destination based on id', () => {
      expect(getDestination(state, 'foo')).toBe(state.destinations.data.foo);
    });
  });
  describe('getDestinationTitle', () => {
    it('returns the destination title based on id', () => {
      expect(getDestinationTitle(state, 'foo')).toBe(state.destinations.data.foo.title);
    });
  });
});
