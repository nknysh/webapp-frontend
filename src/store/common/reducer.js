import { pipe, set } from 'ramda';

import { isArray } from 'utils';
import { Status } from 'store/common';
import { statusLens, errorLens, dataLens } from 'store/utils';

export const loadingReducer = state => set(statusLens, Status.LOADING, state);

export const savingReducer = state => set(statusLens, Status.SAVING, state);

export const successReducer = (state, { payload }) => {
  const setData = pipe(
    set(statusLens, Status.SUCCESS),
    set(dataLens, isArray(payload) ? [...payload] : { ...payload }),
    set(errorLens, undefined)
  );

  return setData(state);
};

export const errorReducer = (state, { payload }) => {
  const setData = pipe(
    set(statusLens, Status.ERROR),
    set(dataLens, undefined),
    set(errorLens, isArray(payload) ? [...payload] : { ...payload })
  );

  return setData(state);
};
