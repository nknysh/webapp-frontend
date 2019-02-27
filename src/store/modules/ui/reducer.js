import { lensPath, lensProp, set, pipe } from 'ramda';

import headerAuthLinks from 'config/links/header--logged-out';
import headerLinks from 'config/links/header--authenticated';
import footerLinks from 'config/links/footer';

import { AUTH_OK } from 'store/modules/auth/actions';

const isAuthenticatedLens = lensProp('isAuthenticated');
const headerLens = lensPath(['menus', 'header']);

const initialState = {
  isAuthenticated: false,
  menus: {
    header: headerAuthLinks,
    footer: footerLinks,
  },
};

const authenticatedState = pipe(
  set(isAuthenticatedLens, true),
  set(headerLens, headerLinks)
);

const uiReducer = (state = initialState, { type }) => {
  if (type === AUTH_OK) {
    return { ...state, ...authenticatedState(state) };
  }

  return state;
};

export default uiReducer;
