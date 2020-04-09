import {
  append,
  complement,
  equals,
  head,
  keys,
  last,
  map,
  objOf,
  path,
  pathOr,
  pick,
  pipe,
  prop,
  propOr,
  propSatisfies,
  reduce,
  reverse,
  toPairs,
  values,
} from 'ramda';
import { isNilOrEmpty, renameKeys } from 'ramda-adjunct';

import { ProductTypes, Occassions } from 'config/enums';
import { toDate, parseJson } from 'utils';

export { getAgeSplits } from 'containers/SummaryRoom/SummaryRoom.utils';

const reduceDisabledDays = (accum, [key, dayRate]) => {
  if (!dayRate) return append(key, accum);

  const hasRate = propSatisfies(complement(isNilOrEmpty), 'price');

  return hasRate(dayRate) ? accum : append(key, accum);
};

export const getDisabledDays = pipe(toPairs, reduce(reduceDisabledDays, []), map(toDate));

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

export const getMonthToDisplay = pipe(head, prop('startDate'), toDate);

export const prepareDates = renameKeys({ from: 'startDate', to: 'endDate' });

export const parseMealPlans = pipe(parseJson, map(objOf('uuid')));

export const getMealPlan = pipe(
  head,
  pathOr([], ['subProducts', ProductTypes.MEAL_PLAN]),
  map(prop('uuid')),
  JSON.stringify
);

export const getSelectedOccasions = pipe(head, pick(values(Occassions)));

export const getRepeatGuest = pipe(head, propOr(false, 'repeatCustomer'));
