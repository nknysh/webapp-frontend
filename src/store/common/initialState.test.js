import initialState from './initialState';

describe('initialState', () => {
  it('returns common initial state', () => {
    expect(initialState).toMatchSnapshot();
  });
});
