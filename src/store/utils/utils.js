import { curry, lensProp, pipe, identity, defaultTo, view, set, reduce, merge, prop } from 'ramda';

import { Status } from 'store/common/status';

export const statusLens = lensProp('status');
export const errorLens = lensProp('error');
export const dataLens = lensProp('data');

const buildActionName = curry((status, type) => `${type}_${status}`);

export const getIdleActionName = buildActionName(Status.IDLE);
export const getLoadingActionName = buildActionName(Status.LOADING);
export const getSuccessActionName = buildActionName(Status.SUCCESS);
export const getErrorActionName = buildActionName(Status.ERROR);

export const reducerShim = pipe(
  identity,
  defaultTo({})
);

export const normalizer = curry((id, reducedState) => {
  const normalizeItem = (acc, item) => merge(acc, { [prop(id, item)]: item });
  const normalizeItems = reduce(normalizeItem, {});
  const rawData = view(dataLens, reducedState);
  const normalizedState = set(dataLens, normalizeItems(rawData), reducedState);
  return normalizedState;
});
