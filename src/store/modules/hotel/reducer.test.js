import { initialState } from 'store/common';

import { fetchHotel } from './actions';
import reducer from './reducer';

describe('pages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_HOTEL', () => {
    const action = fetchHotel();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle FETCH_HOTEL_SUCCESS', () => {
    const action = fetchHotel();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle FETCH_HOTEL_ERROR', () => {
    const action = fetchHotel();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });
});
