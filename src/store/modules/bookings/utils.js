import {
  forEach,
  lensPath,
  lensProp,
  map,
  mapObjIndexed,
  over,
  partialRight,
  path,
  pathOr,
  pipe,
  prop,
  reduce,
  set,
  sum,
  values,
} from 'ramda';
import { addDays } from 'date-fns';

import { ProductTypes } from 'config/enums';

/**
 * To total
 *
 * @param {object}
 * @returns {number}
 */
export const toTotal = pipe(values, sum);

/**
 * Extract age from options
 *
 * Collects all the age names for a product
 *
 * @param {object} accum
 * @param {object} rate
 */
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

/**
 * Extract ages
 *
 * @param {object}
 * @return {object}
 */
export const extractAges = pipe(prop('rates'), values, reduce(extractAgeFromOptions, {}));

/**
 * Add final day to booking
 *
 * Adds the missing day at the end of a booking
 *
 * @param {object}
 * @returns {object}
 */
export const addFinalDayToBooking = over(
  lensPath(['breakdown', 'requestedBuild', ProductTypes.ACCOMMODATION]),
  map(
    over(
      lensProp('endDate'),
      pipe(input => new Date(input), partialRight(addDays, [1]))
    )
  )
);
