import { __, prop, lensPath, set, mergeDeepRight, complement, pipe, equals, filter, objOf } from 'ramda';

import headerLinks from 'config/links/header--authenticated';
import footerLinks from 'config/links/footer';

import { createReducer } from 'store/utils';

import { AUTH_TOKEN, AUTH_SET_TOKEN } from 'store/modules/auth/actions';

import { UI_ENQUEUE_NOTIFICATION, UI_REMOVE_NOTIFICATION } from './actions';

const headerLens = lensPath(['menus', 'header']);

const initialState = {
  menus: {
    header: [],
    footer: footerLinks,
  },
  notifications: [],
};

const authenticatedState = set(headerLens, headerLinks);

export const setAuthenticatedState = state => ({ ...state, ...authenticatedState(state) });

export const enqueueNotification = (state, { payload }) => mergeDeepRight(state, { notifications: [{ ...payload }] });

export const removeNotification = (state, { payload }) => {
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
      [UI_ENQUEUE_NOTIFICATION]: enqueueNotification,
      [UI_REMOVE_NOTIFICATION]: removeNotification,
    },
    initialState
  )(state, payload);
};

export default uiReducer;
