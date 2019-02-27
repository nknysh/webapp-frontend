import headerLinks from 'config/links/header--logged-out';
import footerLinks from 'config/links/footer';

import reducer from './reducer';

const initialState = {
  isAuthenticated: false,
  menus: {
    header: headerLinks,
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
