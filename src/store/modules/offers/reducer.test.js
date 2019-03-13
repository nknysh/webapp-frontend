import { initialState } from 'store/common';

import { fetchLatestOffers } from './actions';
import reducer from './reducer';

describe('offers reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_LATEST_OFFERS', () => {
    const action = fetchLatestOffers();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle FETCH_OFFERS_SUCCESS', () => {
    const action = fetchLatestOffers();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle FETCH_OFFERS_ERROR', () => {
    const action = fetchLatestOffers();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });
});
