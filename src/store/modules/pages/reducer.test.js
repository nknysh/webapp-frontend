import { initialState } from 'store/common';

import { getPageById } from './actions';
import reducer from './reducer';

describe('pages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_PAGE', () => {
    const action = getPageById('about-us');
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle FETCH_PAGE_SUCCESS', () => {
    const action = getPageById('about-us');
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle FETCH_PAGE_ERROR', () => {
    const action = getPageById('about-us');
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });
});
