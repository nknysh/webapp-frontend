import { __, all, curry, equals, F, gt, ifElse, length, map, multiply, pipe, propOr, sum, values } from 'ramda';

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
