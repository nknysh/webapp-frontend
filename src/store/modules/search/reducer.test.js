import { buildIndex } from './actions';
import reducer from './reducer';

describe('search reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toMatchSnapshot();
  });

  it('should handle SEARCH_INDEX_BUILD', () => {
    const action = buildIndex({ index: 'foo', ref: 'id', fields: [], data: [] });
    const reducedState = reducer({}, action);

    expect(reducedState).toMatchSnapshot();
  });
});
