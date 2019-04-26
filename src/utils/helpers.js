import {
  addIndex,
  always,
  complement,
  cond,
  curry,
  either,
  filter,
  identity,
  is,
  isEmpty,
  isNil,
  lensPath,
  map,
  mapObjIndexed,
  merge,
  pipe,
  prop,
  reduce,
  T,
  unapply,
  uniq,
} from 'ramda';

export const noop = () => {};

export const isArray = is(Array);
export const isObject = is(Object);
export const isFunction = is(Function);

export const isEmptyOrNil = either(isNil, isEmpty);

export const mapWithIndex = addIndex(map);

export const arrayToKeyValueObject = (keyProp, valueProp) => {
  const reducer = (accum, item) => merge(accum, { [prop(keyProp, item)]: prop(valueProp, item) });
  return reduce(reducer, {});
};

export const getUniqueMap = map(
  pipe(
    uniq,
    filter(complement(isEmptyOrNil))
  )
);

const lensFromObject = curry((previousKeys, value, key) => {
  const currentPath = [...previousKeys, key];

  if (isObject(value)) return mapObjIndexed(lensFromObject(currentPath), value);

  return lensPath(currentPath);
});

export const buildLensesFromObject = mapObjIndexed(lensFromObject([]));

export const toList = unapply(identity);

export const castToType = data =>
  cond([[isArray, always([...data])], [isObject, always({ ...data })], [T, identity]])(data);
