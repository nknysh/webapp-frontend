import {
  __,
  all,
  always,
  append,
  curry,
  equals,
  evolve,
  F,
  forEach,
  gt,
  ifElse,
  length,
  lensPath,
  lensProp,
  map,
  mapObjIndexed,
  multiply,
  objOf,
  over,
  partialRight,
  path,
  pathOr,
  pipe,
  prop,
  propOr,
  reduce,
  set,
  sum,
  toPairs,
  values,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { addDays } from 'date-fns';

import { ProductTypes } from 'config/enums';
import { formatDate, minusDays } from 'utils';

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
  propOr([], 'guests'),
  ifElse(noQuantity, F, hasOccupancy)
);

export const toTotal = pipe(
  values,
  sum
);

export const getRateAmount = pipe(
  propOr(0, 'rate'),
  Number
);

export const totalByQuantity = curry((rate, amount) => multiply(propOr(0, 'rate', rate), amount));

export const formatDatesForProductObj = evolve({
  startDate: formatDate,
  endDate: pipe(
    minusDays(1),
    formatDate
  ),
});

export const reduceOneWayProducts = (accum, [direction, products]) => {
  mapObjIndexed((selected, uuid) => {
    if (!selected) return;

    accum = append({ uuid, direction }, accum);
  }, products);
  return accum;
};

export const getOneWayProducts = pipe(
  toPairs,
  reduce(reduceOneWayProducts, [])
);

export const getSingularProduct = ifElse(
  isNilOrEmpty,
  always([]),
  pipe(
    objOf('uuid'),
    append(__, [])
  )
);

export const extractAgeFromOptions = (accum, rate) => {
  const products = path(['entities', 'products'], rate);

  mapObjIndexed(product => {
    const ages = pathOr([], ['options', 'ages'], product);

    forEach(({ name, ...age }) => {
      const ageLens = lensProp(name);
      accum = set(ageLens, age, accum);
    }, ages);
  }, products);

  return accum;
};

export const extractAges = pipe(
  prop('rates'),
  values,
  reduce(extractAgeFromOptions, {})
);

export const addFinalDayToBooking = over(
  lensPath(['breakdown', 'requestedBuild', ProductTypes.ACCOMMODATION]),
  map(over(lensProp('endDate'), partialRight(addDays, [1])))
);
