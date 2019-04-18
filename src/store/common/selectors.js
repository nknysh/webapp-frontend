import { curry, lensPath, path, prop, ifElse, is, map, over, pipe, values, reduce } from 'ramda';

const mapRelationship = curry((state, accum, rel) => {
  const lens = lensPath(path(['path'], rel));
  const resolver = prop('resolver', rel);
  const doResolve = value => resolver && resolver(state, value);
  const resolveRelationship = ifElse(is(Array), map(doResolve), doResolve);

  return over(lens, resolveRelationship, accum);
});

export const selectRelationships = curry((state, relationships, entity) =>
  pipe(
    values,
    reduce(mapRelationship(state), entity)
  )(relationships)
);

export const getStatus = prop('status');
export const getData = prop('data');
export const getEntities = pipe(
  getData,
  prop('entities')
);
export const getResults = pipe(
  getData,
  prop('result')
);
