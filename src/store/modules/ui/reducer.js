import { __, prop, lensPath, propOr, set, mergeDeepRight, complement, pipe, equals, filter, objOf } from 'ramda';

import headerLinks from 'config/links/header';
import footerLinks from 'config/links/footer';

import { createReducer } from 'store/utils';
import { parseJson } from 'utils';

import { AUTH_TOKEN, AUTH_SET_TOKEN, AUTH_USER } from 'store/modules/auth/actions';

import { UI_ENQUEUE_NOTIFICATION, UI_REMOVE_NOTIFICATION } from './actions';

const headerLens = lensPath(['menus', 'header']);

const initialState = {
  menus: {
    header: [],
    footer: footerLinks,
  },
  notifications: [],
};

const defaultProp = prop('default');

const authenticatedState = state => {
  const localStorageUser = parseJson(localStorage.getItem(AUTH_USER));
  return set(
    headerLens,
    propOr(defaultProp(headerLinks), propOr('default', 'type', localStorageUser), headerLinks),
    state
  );
};

export const setAuthenticatedState = state => ({ ...state, ...authenticatedState(state) });

export const addNotification = (state, { payload }) => mergeDeepRight(state, { notifications: [{ ...payload }] });

export const clearNotification = (state, { payload }) => {
  const notifications = prop('notifications', state);

  const notKey = pipe(
    prop('key'),
    complement(equals(__, payload))
  );

  const filterNotificationKey = pipe(
    filter(notKey),
    objOf('notifications')
  );

  return mergeDeepRight(state, filterNotificationKey(notifications));
};

const uiReducer = (state = initialState, payload) => {
  const { type } = payload;

  if (type === AUTH_SET_TOKEN || localStorage.getItem(AUTH_TOKEN)) {
    state = { ...state, ...authenticatedState(state) };
  }

  return createReducer(
    {
      [AUTH_SET_TOKEN]: setAuthenticatedState,
      [UI_ENQUEUE_NOTIFICATION]: addNotification,
      [UI_REMOVE_NOTIFICATION]: clearNotification,
    },
    initialState
  )(state, payload);
};

export default uiReducer;
