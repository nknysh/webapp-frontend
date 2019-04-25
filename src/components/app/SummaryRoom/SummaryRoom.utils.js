import {
  complement,
  gt,
  map,
  pipe,
  reduce,
  sum,
  toPairs,
  values,
  apply,
  mapObjIndexed,
  defaultTo,
  over,
  lensProp,
  add,
  join,
  filter,
  equals,
} from 'ramda';

import { getPluralisation } from 'config/ui';

const reduceByAge = (accum, data) => {
  if (!data) return accum;

  mapObjIndexed((amount, type) => {
    const addAmount = pipe(
      defaultTo(0),
      add(amount)
    );
    accum = over(lensProp(type), addAmount, accum);
  }, data);

  return accum;
};

export const getTotalGuests = pipe(
  map(
    pipe(
      values,
      sum
    )
  ),
  sum
);

export const guestLine = (type, amount) => gt(amount, 0) && `${amount} ${getPluralisation(type, amount)}`;

export const getAgeSplits = pipe(
  reduce(reduceByAge, {}),
  toPairs,
  map(apply(guestLine)),
  filter(complement(equals(false))),
  join(' + ')
);
