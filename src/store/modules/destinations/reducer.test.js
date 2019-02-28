import { initialState } from 'store/common';

import { fetchDestinations } from './actions';
import reducer from './reducer';

describe('pages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_DESTINATIONS', () => {
    const action = fetchDestinations();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle FETCH_DESTINATIONS_SUCCESS', () => {
    const action = fetchDestinations();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle FETCH_DESTINATIONS_ERROR', () => {
    const action = fetchDestinations();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });
});
