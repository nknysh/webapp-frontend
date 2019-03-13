import { initialState } from 'store/common';

import { setCountries } from './actions';
import reducer from './reducer';

describe('pages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_COUNTRIES', () => {
    const action = setCountries();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle SET_COUNTRIES_SUCCESS', () => {
    const action = setCountries();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle SET_COUNTRIES_ERROR', () => {
    const action = setCountries();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });
});
