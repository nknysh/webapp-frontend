import { pipe, set, propOr, values, map } from 'ramda';

import { isArray } from 'utils';
import { Status } from 'store/common';
import { statusLens, errorLens, dataLens } from 'store/utils';

export const loadingReducer = (state, { type }) =>
  set(statusLens, `${type}_${Status.LOADING}`, { ...state, error: undefined });

export const sendingReducer = (state, { type }) =>
  set(statusLens, `${type}_${Status.SENDING}`, { ...state, error: undefined });

export const successReducer = (state, { type, payload }) => {
  const setData = pipe(
    set(statusLens, type),
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

export const errorReducer = (state, { type, payload }) => {
  const setData = pipe(
    set(statusLens, type),
    set(dataLens, undefined),
    set(errorLens, isArray(payload) ? [...payload] : { ...payload })
  );

  return setData(state);
};

export const successResetReducer = (state, { type, payload }) => {
  const setData = pipe(
    set(statusLens, type),
    set(dataLens, isArray(payload) ? [...payload] : { ...payload }),
    set(errorLens, undefined)
  );

  return setData(state);
};

export const resetStatuses = state => {
  const setStatusToIdle = set(statusLens, Status.IDLE);
  return map(setStatusToIdle, state);
};
