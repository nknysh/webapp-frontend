import { __, curry, map, pipe, path, has, prop, mapObjIndexed } from 'ramda';

import { isArray, getUniqueMap } from 'utils';
import { getErrorActionName, getSuccessActionName } from 'store/utils';
import { isActive } from 'store/common';

export const successAction = (type, data) => ({
  type: getSuccessActionName(type),
  payload: isArray(data) ? [...data] : { ...data },
});

export const errorAction = (type, error) => ({
  type: getErrorActionName(type),
  payload: isArray(error) ? [...error] : { ...error },
});

export const extractRelationships = curry((relationships, entities) => {
  const mapRelationships = pipe(
    path(['path']),
    curry(path),
    map(__, entities)
  );

  const mapEntities = map(mapRelationships);
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
