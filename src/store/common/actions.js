import { curry, pipe, propOr, objOf, pathOr, forEach } from 'ramda';

import { APP_VERBOSE_ERRORS } from 'config';
import { isArray } from 'utils';

import { getErrorActionName, getIdleActionName, getSuccessActionName, getLoadingActionName } from 'store/utils';
import { enqueueNotification } from 'store/modules/ui/actions';

export const STATUS_TO_IDLE = 'STATUS_TO_IDLE';
export const STORE_RESET = 'STORE_RESET';

export const resetStatuses = () => ({
  type: STATUS_TO_IDLE,
});

export const storeReset = () => ({
  type: STORE_RESET,
});

export const idleAction = curry((type, data) => ({
  type: getIdleActionName(type),
  payload: isArray(data) ? [...data] : { ...data },
}));

export const loadingAction = curry((type, data) => ({
  type: getLoadingActionName(type),
  payload: isArray(data) ? [...data] : { ...data },
}));

export const successAction = curry((type, data) => ({
  type: getSuccessActionName(type),
  payload: isArray(data) ? [...data] : { ...data },
}));

export const errorAction = curry((type, error) => ({
  type: getErrorActionName(type),
  payload: isArray(error) ? [...error] : { ...error },
}));

export const entitiesObject = curry((type, data) =>
  pipe(
    objOf(type),
    objOf('entities')
  )(data)
);

export const errorFromResponse = (action, error, defaultMessage) => async dispatch => {
  dispatch(errorAction(action, propOr({ message: propOr('Unknown error', 'message', error) }, 'response', error)));

  const errors = pathOr([], ['response', 'data', 'errors'], error);

  defaultMessage &&
    dispatch(
      enqueueNotification({
        message: defaultMessage,
        options: { variant: 'error' },
      })
    );

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

export const genericAction = (type, payload) => ({
  type,
  payload,
});
