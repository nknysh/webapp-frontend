import { initialState } from 'store/common';

import { signUp } from './actions';
import reducer from './reducer';

describe('pages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle AUTH_SIGN_UP', () => {
    const action = signUp({ foo: 'bar' });
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle AUTH_SIGN_UP_SUCCESS', () => {
    const action = signUp({ foo: 'bar' });
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle AUTH_SIGN_UP_ERROR', () => {
    const action = signUp({ foo: 'bar' });
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });
});
