import { initialState } from 'store/common';

import { fetchHotels } from './actions';
import reducer from './reducer';

describe('pages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_HOTELS', () => {
    const action = fetchHotels();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle FETCH_HOTELS_SUCCESS', () => {
    const action = fetchHotels();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle FETCH_HOTELS_ERROR', () => {
    const action = fetchHotels();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });
});
