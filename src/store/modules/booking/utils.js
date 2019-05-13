import {
  __,
  add,
  all,
  always,
  append,
  both,
  curry,
  defaultTo,
  either,
  equals,
  F,
  find,
  gt,
  gte,
  ifElse,
  length,
  lte,
  map,
  mapObjIndexed,
  multiply,
  pipe,
  prop,
  propEq,
  propOr,
  propSatisfies,
  reduce,
  sum,
  values,
} from 'ramda';

import { isAdult } from 'utils';

export const noQuantity = pipe(
  length,
  equals(0)
);

export const hasOccupancy = pipe(
  map(
    pipe(
      values,
      length
    )
  ),
  all(gt(__, 0))
);

export const canBook = pipe(
  prop('guests'),
  ifElse(noQuantity, F, hasOccupancy)
);

export const categoryEquals = propEq('category');

export const totalShim = always({ total: 0 });

export const toTotal = pipe(
  values,
  sum
);

export const getRateAmount = pipe(
  propOr(0, 'rate'),
  Number
);

export const getTotalRate = (accum, rate) => append(getRateAmount(rate), accum);
export const totalByQuantity = curry((rate, amount) => multiply(propOr(0, 'rate', rate), amount));

const mapProductRatesToAges = curry((rates, age) => {
  const betweenAges = both(propSatisfies(gte(age), 'ageFrom'), propSatisfies(lte(age), 'ageTo'));

  return pipe(
    find(betweenAges),
    propOr(0, 'rate')
  )(rates);
});

const getGuestRatesTotal = curry((rates, ages, type) => {
  if (isAdult(type)) {
    const rate = find(either(propEq('default', true), propEq('name', 'adult')), rates);
    return totalByQuantity(rate, length(ages));
  }

  return pipe(
    defaultTo([]),
    map(mapProductRatesToAges(rates)),
    sum
  )(ages);
});

const reduceGuestsAndRates = curry((rates, accum, quantity) =>
  append(
    pipe(
      mapObjIndexed(getGuestRatesTotal(rates)),
      values,
      sum
    )(quantity),
    accum
  )
);

export const getGuestsTotals = curry((rates, quantity = {}) =>
  pipe(
    reduce(reduceGuestsAndRates(rates), []),
    sum
  )(quantity)
);

export const getTotalExtraSupplements = (accum, rates) => {
  mapObjIndexed(({ amount, dates }, rate) => {
    const total = rate * amount * length(dates);
    accum = add(accum, total);
  }, rates);

  return accum;
};
