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
  length,
  filter,
  equals,
} from 'ramda';

import i18n from 'config/i18n';

const reduceByAge = (accum, data) => {
  if (!data) return accum;

  mapObjIndexed((ages, type) => {
    const addAmount = pipe(
      defaultTo(0),
      add(length(ages))
    );
    accum = over(lensProp(type), addAmount, accum);
  }, data);

  return accum;
};

export const getTotalGuests = pipe(
  map(
    pipe(
      defaultTo([]),
      map(length),
      values,
      sum
    )
  ),
  sum
);

export const guestLine = (type, count) => gt(count, 0) && `${count} ${i18n.t(type, { count }) || type}`;

export const getAgeSplits = pipe(
  reduce(reduceByAge, {}),
  toPairs,
  map(apply(guestLine)),
  filter(complement(equals(false))),
  join(' + ')
);
