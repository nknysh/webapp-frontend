import { signUp, authRequest } from './actions';
import reducer from './reducer';

describe('auth reducer', () => {
  it('should handle AUTH_REQUEST', () => {
    const action = authRequest({ foo: 'bar' });
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle AUTH_REQUEST_SUCCESS', () => {
    const action = authRequest({ foo: 'bar' });
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
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
