import { __, curry, map, pipe, path, has, prop, mapObjIndexed, propOr } from 'ramda';

import { isArray, getUniqueMap, noop } from 'utils';
import { getErrorActionName, getSuccessActionName } from 'store/utils';
import { isActive } from 'store/common';

export const STATUS_TO_IDLE = 'STATUS_TO_IDLE';

export const resetStatuses = () => ({
  type: STATUS_TO_IDLE,
});

export const successAction = curry((type, data) => ({
  type: getSuccessActionName(type),
  payload: isArray(data) ? [...data] : { ...data },
}));

export const errorAction = curry((type, error) => ({
  type: getErrorActionName(type),
  payload: isArray(error) ? [...error] : { ...error },
}));

export const extractData = curry((pathTo, relationships, entities) => {
  if (!entities) return [];

  const mapData = pipe(
    path(pathTo),
    curry(path),
    map(__, entities)
  );

  const mapEntities = map(mapData);

  return pipe(
    mapEntities,
    getUniqueMap
  )(relationships);
});

export const fetchRelationships = curry(async (relationships, actions, getState, dispatch) => {
  const getRelationship = (values, key) => {
    const fetchEntity = value => {
      const state = getState();

      const stateKeyExists = has(key, state);
      const valueExists = path([key, 'data', value], state);
      const fetchAction = prop(key, actions);
      const active = isActive(path([key, 'status'], state));

      if (!stateKeyExists) return;

      if (!valueExists && !active && fetchAction) {
        dispatch(fetchAction(value));
      }
    };

    return map(fetchEntity, values);
  };

  return mapObjIndexed(getRelationship, relationships);
});

export const setIncludes = curry(async (includes, actions, dispatch) => {
  const setIncludeKey = (data, key) => {
    const setAction = propOr(noop, key, actions);
    dispatch(setAction({ data }));
  };

  return mapObjIndexed(setIncludeKey, includes);
});
