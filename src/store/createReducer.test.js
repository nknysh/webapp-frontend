import createReducer from './createReducer';

describe('createReducer', () => {
  it('returns a reducer function', () => {
    const reducer = createReducer({}, {});
    expect(reducer).toBeInstanceOf(Function);
  });

  it('reducer takes initial state and returns', () => {
    const initialState = { foo: 'bar' };

    const reducer = createReducer({}, initialState);

    // Reducer is passed undefined on first trigger (i.e. redux tree build) so must
    // return the initial state.
    const result = reducer(undefined);
    expect(result).toEqual(initialState);
  });

  it('returns state when action is not in map', () => {
    const initialState = { foo: 'bar' };
    const actionsMap = { FOO: jest.fn() };
    const reducer = createReducer(actionsMap, initialState);
    const result = reducer({ returned: 'action' }, { type: 'BAR' });

    expect(result).toEqual({ returned: 'action' });
  });

  it('calls the correct reducer when passed an action', () => {
    const Actions = {
      FOO: 'FOO',
      BAR: 'BAR',
    };

    const mockFoo = jest.fn();
    const mockBar = jest.fn();

    // is(Function) returns false for jest.fn() function. We must wrap these
    // in a normal function
    const mockFooAction = (...args) => mockFoo(...args);
    const mockBarAction = (...args) => mockBar(...args);

    const initialState = { foo: 'bar' };
    const actionsMap = {
      [Actions.FOO]: mockFooAction,
      [Actions.BAR]: mockBarAction,
    };
    const reducer = createReducer(actionsMap, initialState);

    reducer({}, { type: Actions.FOO });

    expect(mockFoo).toBeCalled();
    expect(mockBar).not.toBeCalled();
  });
});
