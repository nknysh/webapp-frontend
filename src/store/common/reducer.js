import { pipe, set, propOr, values, map, mergeDeepRight } from 'ramda';

import { isArray, castToType } from 'utils';
import { Status } from 'store/common';
import { statusLens, errorLens, dataLens } from 'store/utils';

export const loadingReducer = state => set(statusLens, Status.LOADING, { ...state, error: undefined });

export const sendingReducer = state => set(statusLens, Status.SENDING, { ...state, error: undefined });

export const successReducer = (state, { payload }) => {
  const prevData = propOr([], 'data', state);
  const setData = pipe(
    set(statusLens, Status.SUCCESS),
    set(dataLens, isArray(payload) ? [...values(prevData), ...payload] : mergeDeepRight(prevData, payload)),
    set(errorLens, undefined)
  );

  return setData(state);
};

export const errorReducer = (state, { payload }) => {
  const prevData = propOr([], 'data', state);
  const setData = pipe(
    set(statusLens, Status.ERROR),
    set(dataLens, prevData),
    set(errorLens, isArray(payload) ? [...payload] : payload)
  );

  return setData(state);
};

export const successResetReducer = (state, { payload }) => {
  const setData = pipe(
    set(statusLens, Status.SUCCESS),
    set(dataLens, castToType(payload)),
    set(errorLens, undefined)
  );

  return setData(state);
};

export const resetStoreStatuses = state => {
  const setStatusToIdle = set(statusLens, Status.IDLE);
  return map(setStatusToIdle, state);
};
