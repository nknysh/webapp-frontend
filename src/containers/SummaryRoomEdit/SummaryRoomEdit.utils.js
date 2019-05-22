import {
  append,
  complement,
  equals,
  head,
  keys,
  last,
  map,
  path,
  pipe,
  prop,
  propSatisfies,
  reduce,
  reverse,
  toPairs,
} from 'ramda';

import { isEmptyOrNil, toDate } from 'utils';

const reduceDisabledDays = (accum, [key, dayRate]) => {
  if (!dayRate) return append(key, accum);

  const hasRate = propSatisfies(complement(isEmptyOrNil), 'rate');

  return hasRate(dayRate) ? accum : append(key, accum);
};

export const getDisabledDays = pipe(
  toPairs,
  reduce(reduceDisabledDays, []),
  map(toDate)
);

export const getOptionsFromRates = rates => {
  const ratesDates = keys(rates).sort();
  const firstDate = head(ratesDates);
  const lastDate = last(ratesDates);
  const disabled = getDisabledDays(rates);

  return { ratesDates, firstDate, lastDate, disabled };
};

export const getAgeRanges = pipe(
  prop('ages'),
  reverse,
  reduce((accum, { name, ...ages }) => ({ ...accum, [name]: ages }), {})
);

export const getMinMax = pipe(
  path(['occupancy', 'limits']),
  reduce(
    (accum, { name, maximum, minimum }) => ({
      ...accum,
      [equals('default', name) ? 'adult' : name]: { max: maximum, min: minimum },
    }),
    {}
  )
);
