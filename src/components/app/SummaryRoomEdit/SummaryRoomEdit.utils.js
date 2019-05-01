import {
  append,
  complement,
  head,
  keys,
  last,
  map,
  path,
  pipe,
  prop,
  propSatisfies,
  reduce,
  toPairs,
  reverse,
  equals,
} from 'ramda';

import { isEmptyOrNil, toDate } from 'utils';

const reduceDisabledDays = (accum, [key, dayRate]) => {
  const rateUuid = prop('result', dayRate);
  const rate = path(['entities', 'rates', rateUuid], dayRate);
  if (!rate) return append(key, accum);

  const hasRate = propSatisfies(complement(isEmptyOrNil), 'rate');

  return hasRate(rate) ? accum : append(key, accum);
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
  path(['options', 'ages']),
  reverse,
  reduce((accum, { name, ...ages }) => ({ ...accum, [name]: ages }), {})
);

export const getMinMax = pipe(
  path(['options', 'occupancy', 'limits']),
  reduce(
    (accum, { name, maximum, minimum }) => ({
      ...accum,
      [equals('default', name) ? 'adult' : name]: { max: maximum, min: minimum },
    }),
    {}
  )
);
