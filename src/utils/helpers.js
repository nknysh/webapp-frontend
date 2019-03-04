import { is, addIndex, map } from 'ramda';

export const noop = () => {};

export const isArray = is(Array);
export const isFunction = is(Function);
export const mapWithIndex = addIndex(map);
