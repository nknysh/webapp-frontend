import { getPageById } from './actions';
import reducer from './reducer';

describe('pages reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });

  it('should handle GET_PAGE', () => {
    const action = getPageById('about-us');
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });
});
