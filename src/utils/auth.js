import { propEq, defaultTo, pipe } from 'ramda';

export const isSr = pipe(
  defaultTo({}),
  propEq('type', 'sr')
);
