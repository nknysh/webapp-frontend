import {
  addIndex,
  always,
  complement,
  cond,
  curry,
  either,
  equals,
  filter,
  identity,
  is,
  lensPath,
  map,
  mapObjIndexed,
  merge,
  pipe,
  prop,
  propOr,
  reduce,
  T,
  test,
  tryCatch,
  unapply,
  uniq,
  values,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

export const noop = () => {};

export const isArray = is(Array);
export const isObject = is(Object);
export const isFunction = is(Function);
export const isString = is(String);

export const mapWithIndex = addIndex(map);
export const reduceWithIndex = addIndex(reduce);

export const arrayToKeyValueObject = (keyProp, valueProp) => {
  const reducer = (accum, item) => merge(accum, { [prop(keyProp, item)]: prop(valueProp, item) });
  return reduce(reducer, {});
};

export const getUniqueMap = map(
  pipe(
    uniq,
    filter(complement(isNilOrEmpty))
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

export const getMapped = (key, reducer = reduceByKey) =>
  pipe(
    values,
    reduce(reducer(key), []),
    uniq
  );

export const reduceByKey = curry((key, accum, value) => (value ? [...accum, prop(key, value)] : accum));
export const reduceArrayByKey = curry((key, accum, value) => (value ? [...accum, ...propOr([], key, value)] : accum));

export const testAdult = test(/^adult$/i);
export const isAdult = either(testAdult, equals('default'));

export const parseJson = data => tryCatch(JSON.parse, always(identity(data)))(data);
