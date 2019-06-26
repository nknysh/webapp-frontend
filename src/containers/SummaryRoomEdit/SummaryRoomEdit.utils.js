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
  objOf,
  pathOr,
} from 'ramda';
import { isNilOrEmpty, renameKeys } from 'ramda-adjunct';

import { ProductTypes } from 'config/enums';
import { toDate, parseJson } from 'utils';

export { getAgeSplits } from 'containers/SummaryRoom/SummaryRoom.utils';

const reduceDisabledDays = (accum, [key, dayRate]) => {
  if (!dayRate) return append(key, accum);

  const hasRate = propSatisfies(complement(isNilOrEmpty), 'price');

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

export const getAgeRanges = map(
  pipe(
    pathOr([], ['product', 'options', 'ages']),
    reverse,
    reduce((accum, { name, ...ages }) => ({ ...accum, [name]: ages }), {})
  )
);

export const getMinMax = map(
  pipe(
    path(['product', 'options', 'occupancy', 'limits']),
    reduce(
      (accum, { name, maximum, minimum }) => ({
        ...accum,
        [equals('default', name) ? 'adult' : name]: { max: maximum, min: minimum },
      }),
      {}
    )
  )
);

export const getMonthToDisplay = pipe(
  head,
  prop('endDate'),
  toDate
);

export const prepareDates = renameKeys({ from: 'startDate', to: 'endDate' });

export const parseMealPlans = pipe(
  parseJson,
  map(objOf('uuid'))
);

export const getMealPlan = pipe(
  head,
  pathOr([], ['subProducts', ProductTypes.MEAL_PLAN]),
  map(prop('uuid')),
  JSON.stringify
);
