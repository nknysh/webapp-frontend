import { pipe, set, propOr, values, map } from 'ramda';

import { isArray } from 'utils';
import { Status } from 'store/common';
import { statusLens, errorLens, dataLens } from 'store/utils';

export const loadingReducer = state => set(statusLens, Status.LOADING, { ...state, error: undefined });

export const sendingReducer = state => set(statusLens, Status.SENDING, { ...state, error: undefined });

export const successReducer = (state, { payload }) => {
  const setData = pipe(
    set(statusLens, Status.SUCCESS),
    set(
      dataLens,
      isArray(payload)
        ? [...values(propOr([], 'data', state)), ...payload]
        : { ...propOr({}, 'data', state), ...payload }
    ),
    set(errorLens, undefined)
  );

  return setData(state);
};

export const errorReducer = (state, { payload }) => {
  const setData = pipe(
    set(statusLens, Status.ERROR),
    set(dataLens, undefined),
    set(errorLens, isArray(payload) ? [...payload] : payload)
  );

  return setData(state);
};

export const successResetReducer = (state, { payload }) => {
  const setData = pipe(
    set(statusLens, Status.SUCCESS),
    set(dataLens, isArray(payload) ? [...payload] : { ...payload }),
    set(errorLens, undefined)
  );

  return setData(state);
};

export const resetStoreStatuses = state => {
  const setStatusToIdle = set(statusLens, Status.IDLE);
  return map(setStatusToIdle, state);
};
