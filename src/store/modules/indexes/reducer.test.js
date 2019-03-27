import { index } from './actions';
import reducer from './reducer';

describe('indexes reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle INDEXING', () => {
    const action = index();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle INDEXING_SUCCESS', () => {
    const action = index();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });

  it('should handle INDEXING_ERROR', () => {
    const action = index();
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });
});
