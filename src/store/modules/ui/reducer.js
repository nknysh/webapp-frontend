import { lensPath, set } from 'ramda';

import headerLinks from 'config/links/header--authenticated';
import footerLinks from 'config/links/footer';

import { AUTH_TOKEN, AUTH_SET_TOKEN } from 'store/modules/auth/actions';

const headerLens = lensPath(['menus', 'header']);

const initialState = {
  menus: {
    header: [],
    footer: footerLinks,
  },
};

const authenticatedState = set(headerLens, headerLinks);

const uiReducer = (state = initialState, { type }) => {
  if (type === AUTH_SET_TOKEN || localStorage.getItem(AUTH_TOKEN)) {
    return { ...state, ...authenticatedState(state) };
  }

  return state;
};

export default uiReducer;
