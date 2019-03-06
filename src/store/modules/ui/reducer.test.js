import footerLinks from 'config/links/footer';

import reducer from './reducer';

const initialState = {
  menus: {
    header: [],
    footer: footerLinks,
  },
};

describe('ui reducer', () => {
  it('returns initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('always returns state as is', () => {
    const testState = { foo: 'bar' };
    const testAction = { type: 'SOME_ACTION' };

    expect(reducer(testState, testAction)).toEqual(testState);
  });
});
