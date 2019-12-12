import { __, prop, lensPath, propOr, set, mergeDeepRight, complement, pipe, equals, filter, objOf } from 'ramda';

import headerLinks from 'config/links/header';
import footerLinks from 'config/links/footer';

import { createReducer } from 'store/utils';
import { parseJson } from 'utils';

import { AUTH_TOKEN, AUTH_SET_TOKEN, AUTH_USER } from 'store/modules/auth/actions';

import { UI_ENQUEUE_NOTIFICATION, UI_REMOVE_NOTIFICATION, SET_IS_BOOKING_SUMMARY_SECTION_COLLAPSED } from './actions';
import { CLEAR_BOOKING_BUILDER_UI_STATE } from '../bookingBuilder';

const headerLens = lensPath(['menus', 'header']);

const initialState = {
  menus: {
    header: [],
    footer: footerLinks,
  },
  notifications: [],
};

/**
 * Default prop
 *
 * @param {object}
 * @returns {*}
 */
const defaultProp = prop('default');

/**
 * Authenticated state reducer
 *
 * @param {object} state
 * @returns {object}
 */
const authenticatedState = state => {
  const localStorageUser = parseJson(localStorage.getItem(AUTH_USER));
  return set(
    headerLens,
    // Extracts which links to use in the header based on the current user's role
    propOr(defaultProp(headerLinks), propOr('default', 'type', localStorageUser), headerLinks),
    state
  );
};

/**
 * Set authenticated state reducer
 *
 * @param {object} state
 * @returns {object}
 */
export const setAuthenticatedState = state => ({ ...state, ...authenticatedState(state) });

/**
 * Add notification reducer
 *
 * @param {object} state
 * @returns {object}
 */
export const addNotification = (state, { payload }) => mergeDeepRight(state, { notifications: [{ ...payload }] });

/**
 * Clear notification reducer
 *
 * @param {object} state
 * @returns {object}
 */
export const clearNotification = (state, { payload }) => {
  const notifications = prop('notifications', state);

  /**
   * Not key
   *
   * @param {object}
   * @returns {boolean}
   */
  const notKey = pipe(
    prop('key'),
    complement(equals(__, payload))
  );

  /**
   * Filter notification key
   *
   * @param {object}
   * @returns {object}
   */
  const filterNotificationKey = pipe(
    filter(notKey),
    objOf('notifications')
  );

  return mergeDeepRight(state, filterNotificationKey(notifications));
};

export const setIsBookingSummarySectionCollapsed = (state, { payload }) => {
  if (!state.bookingSummarySections) {
    state.bookingSummarySections = {};
  }

  state.bookingSummarySections = {
    ...state.bookingSummarySections,
    [payload.type]: payload.value,
  };
  return state;
};

export const clearBookingBuilderUiStateReducer = state => {
  return {
    state,
    bookingSummarySections: {},
  };
};
/**
 * UI reducer
 *
 * @param {object} state
 * @param {object} payload
 */
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
      [SET_IS_BOOKING_SUMMARY_SECTION_COLLAPSED]: setIsBookingSummarySectionCollapsed,
      [CLEAR_BOOKING_BUILDER_UI_STATE]: clearBookingBuilderUiStateReducer,
    },
    initialState
  )(state, payload);
};

export default uiReducer;
