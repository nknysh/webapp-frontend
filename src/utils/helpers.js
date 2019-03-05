import { is, addIndex, map, reduce, merge, prop, memoizeWith, identity, lensProp } from 'ramda';

export const noop = () => {};

export const isArray = is(Array);
export const isFunction = is(Function);
export const mapWithIndex = addIndex(map);

export const arrayToKeyValueObject = memoizeWith(identity, (keyProp, valueProp) => {
  const reducer = (accum, item) => merge(accum, { [prop(keyProp, item)]: prop(valueProp, item) });

  return reduce(reducer, {});
});

const newLensProp = (accum, key) => merge(accum, { [key]: lensProp(key) });

export const lensesFromObject = reduce(newLensProp, {});
