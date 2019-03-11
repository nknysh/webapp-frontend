import {
  addIndex,
  curry,
  identity,
  is,
  lensPath,
  map,
  mapObjIndexed,
  memoizeWith,
  merge,
  prop,
  reduce,
  uniq,
} from 'ramda';

export const noop = () => {};

export const isArray = is(Array);
export const isObject = is(Object);
export const isFunction = is(Function);

export const mapWithIndex = addIndex(map);

export const arrayToKeyValueObject = memoizeWith(identity, (keyProp, valueProp) => {
  const reducer = (accum, item) => merge(accum, { [prop(keyProp, item)]: prop(valueProp, item) });
  return reduce(reducer, {});
});

export const getUniqueMap = map(uniq);

const lensFromObject = curry((previousKeys, value, key) => {
  const currentPath = [...previousKeys, key];

  if (isObject(value)) return mapObjIndexed(lensFromObject(currentPath), value);

  return lensPath(currentPath);
});

export const buildLensesFromObject = mapObjIndexed(lensFromObject([]));
