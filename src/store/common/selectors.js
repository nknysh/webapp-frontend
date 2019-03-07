import { curry, lensPath, path, prop, ifElse, is, map, over, pipe, values, reduce, memoizeWith, identity } from 'ramda';

const mapRelationship = curry((state, accum, rel) => {
  const lens = lensPath(path(['path'], rel));
  const resolver = prop('resolver', rel);
  const doResolve = value => resolver && resolver(state, value);
  const resolveRelationship = ifElse(is(Array), map(doResolve), doResolve);

  return over(lens, resolveRelationship, accum);
});

export const selectRelationships = curry(
  memoizeWith(identity, (state, relationships, entity) =>
    pipe(
      values,
      reduce(mapRelationship(state), entity)
    )(relationships)
  )
);
