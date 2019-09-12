import { curry, pipe, propOr, objOf, pathOr, forEach } from 'ramda';

import { APP_VERBOSE_ERRORS } from 'config';
import { isArray } from 'utils';

import { getErrorActionName, getIdleActionName, getSuccessActionName, getLoadingActionName } from 'store/utils';
import { enqueueNotification } from 'store/modules/ui/actions';

export const STATUS_TO_IDLE = 'STATUS_TO_IDLE';
export const STORE_RESET = 'STORE_RESET';
export const PAGE_CHANGE = 'PAGE_CHANGE';

/**
 * Reset statuses action
 *
 * @returns {object}
 */
export const resetStatuses = () => ({
  type: STATUS_TO_IDLE,
});

/**
 * Store reset action
 *
 * @returns {object}
 */
export const storeReset = () => ({
  type: STORE_RESET,
});

/**
 * Page change action
 *
 * @param {*} payload
 */
export const pageChange = payload => ({
  type: PAGE_CHANGE,
  payload,
});

/**
 * Idle action
 *
 * Curried function that creates an idle action object
 * based on the action type passed in
 *
 * @param {string} type The action type e.g. `'STORE_RESET'`
 * @param {array | object} data the payload
 * @returns {Function | object}
 */
export const idleAction = curry((type, data) => ({
  type: getIdleActionName(type),
  payload: isArray(data) ? [...data] : { ...data },
}));

/**
 * Loading action
 *
 * Curried function that creates an loading action object
 * based on the action type passed in
 *
 * @param {string} type The action type e.g. `'STORE_RESET'`
 * @param {array | object} data the payload
 * @returns {Function | object}
 */
export const loadingAction = curry((type, data) => ({
  type: getLoadingActionName(type),
  payload: isArray(data) ? [...data] : { ...data },
}));

/**
 * Success action
 *
 * Curried function that creates an success action object
 * based on the action type passed in
 *
 * @param {string} type The action type e.g. `'STORE_RESET'`
 * @param {array | object} data the payload
 * @returns {Function | object}
 */
export const successAction = curry((type, data) => ({
  type: getSuccessActionName(type),
  payload: isArray(data) ? [...data] : { ...data },
}));

/**
 * Error action
 *
 * Curried function that creates an error action object
 * based on the action type passed in
 *
 * @param {string} type The action type e.g. `'STORE_RESET'`
 * @param {array | object} data the payload
 * @returns {Function | object}
 */
export const errorAction = curry((type, error) => ({
  type: getErrorActionName(type),
  payload: isArray(error) ? [...error] : { ...error },
}));

/**
 * Entities object
 *
 * Curried function that creates an object like `{ entities: { [type]: data }}`
 *
 * @param {string} type Final key
 * @param {*} data
 * @returns {Function | object}
 */
export const entitiesObject = curry((type, data) =>
  pipe(
    objOf(type),
    objOf('entities')
  )(data)
);

/**
 * Error from response action
 *
 * Thunk that will dispatch notifications and deal
 * with errors from API call responses
 *
 * @param {object} action
 * @param {object} error
 * @param {string} defaultMessage
 */
export const errorFromResponse = (action, error, defaultMessage) => async dispatch => {
  dispatch(errorAction(action, propOr({ message: propOr('Unknown error', 'message', error) }, 'response', error)));

  // Extracts the errors from the error response
  const errors = pathOr([], ['response', 'data', 'errors'], error);

  // If there was a default message to show, then enqueue a notification
  // that will show to the user
  defaultMessage &&
    dispatch(
      enqueueNotification({
        message: defaultMessage,
        options: { variant: 'error' },
      })
    );

  // If the app should show verbose errors then run through all the errors
  // from the response and show them
  APP_VERBOSE_ERRORS &&
    forEach(
      ({ detail, message }) =>
        dispatch(
          enqueueNotification({
            message: message || detail || 'Unknown Error',
            options: { variant: 'error' },
          })
        ),
      errors
    );
};

/**
 * Generic action
 *
 * @param {string} type
 * @param {*} payload
 * @returns {object}
 */
export const genericAction = (type, payload) => ({
  type,
  payload,
});
