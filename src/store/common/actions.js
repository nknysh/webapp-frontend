import { curry, pipe, propOr, objOf } from 'ramda';

import { isArray } from 'utils';
import { getErrorActionName, getSuccessActionName, getLoadingActionName } from 'store/utils';

export const STATUS_TO_IDLE = 'STATUS_TO_IDLE';

export const resetStatuses = () => ({
  type: STATUS_TO_IDLE,
});

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

export const errorFromResponse = curry((action, error) =>
  errorAction(action, propOr({ message: propOr('Unknown error', 'message', error) }, 'response', error))
);
