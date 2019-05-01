import {
  __,
  add,
  all,
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
  head,
  ifElse,
  length,
  lte,
  map,
  mapObjIndexed,
  multiply,
  path,
  pipe,
  prop,
  propEq,
  propOr,
  propSatisfies,
  reduce,
  sum,
  test,
  values,
} from 'ramda';

export const testAdult = test(/^adult$/i);
export const isAdult = either(testAdult, equals('default'));

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
  prop('quantity'),
  ifElse(noQuantity, F, hasOccupancy)
);

export const getRateAmount = pipe(
  path(['entities', 'rates']),
  values,
  head,
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
