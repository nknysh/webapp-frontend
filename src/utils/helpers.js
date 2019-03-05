import { is, addIndex, map, reduce, merge, prop, memoizeWith, identity } from 'ramda';

export const noop = () => {};

export const isArray = is(Array);
export const isFunction = is(Function);
export const mapWithIndex = addIndex(map);

export const arrayToKeyValueObject = memoizeWith(identity, (keyProp, valueProp) => {
  const reducer = (accum, item) => merge(accum, { [prop(keyProp, item)]: prop(valueProp, item) });

  return reduce(reducer, {});
});
