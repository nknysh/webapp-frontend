import { lensPath, set } from 'ramda';

import headerLinks from 'config/links/header--authenticated';
import footerLinks from 'config/links/footer';

import { createReducer } from 'store/utils';

import { AUTH_TOKEN, AUTH_SET_TOKEN } from 'store/modules/auth/actions';

const headerLens = lensPath(['menus', 'header']);

const initialState = {
  menus: {
    header: [],
    footer: footerLinks,
  },
};

const authenticatedState = set(headerLens, headerLinks);

export const setAuthenticatedState = state => ({ ...state, ...authenticatedState(state) });

const uiReducer = (state = initialState, payload) => {
  const { type } = payload;

  if (type === AUTH_SET_TOKEN || localStorage.getItem(AUTH_TOKEN)) {
    state = { ...state, ...authenticatedState(state) };
  }

  return createReducer(
    {
      [AUTH_SET_TOKEN]: setAuthenticatedState,
    },
    initialState
  )(state, payload);
};

export default uiReducer;
