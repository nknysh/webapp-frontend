import { setCountries } from './actions';
import reducer from './reducer';

describe('countries reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
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
