import {
  append,
  filter,
  flatten,
  groupBy,
  has,
  hasPath,
  map,
  mapObjIndexed,
  mergeDeepRight,
  objOf,
  pipe,
  prop,
  propEq,
  propOr,
  reduce,
  reject,
  toPairs,
  values as Rvalues,
} from 'ramda';

const hasDirection = hasPath(['meta', 'direction']);
export const productsBothWays = reject(hasDirection);
export const productsOneWay = filter(hasDirection);

export const fromOneWayProducts = (type, data) => {
  const products = propOr({}, type, data);

  const reduced = pipe(
    mapObjIndexed((uuids, direction) => map(uuid => ({ uuid, direction }), uuids)),
    reject(propEq('uuid', '')),
    Rvalues,
    flatten
  )(products);

  return reduced;
};

export const toOneWayProducts = pipe(filter(has('direction')), groupBy(prop('direction')), map(map(prop('uuid'))));

export const extractChosenAddons = (type, data) =>
  pipe(
    prop(type),
    toPairs,
    reduce((accum, [uuid, checked]) => (checked ? append(objOf('uuid', uuid), accum) : accum), [])
  )(data);

export const toSelectedAddon = reduce((accum, { uuid }) => mergeDeepRight({ [uuid]: true }, accum), {});

export const groupByProductsUuid = groupBy(pipe(prop('products'), map(prop('uuid'))));
