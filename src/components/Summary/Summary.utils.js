import {
  __,
  all,
  always,
  append,
  complement,
  defaultTo,
  gt,
  head,
  ifElse,
  isEmpty,
  keys,
  last,
  map,
  pipe,
  propOr,
  props,
  propSatisfies,
  reduce,
  toPairs,
  values,
} from 'ramda';

import { getPluralisation } from 'config/ui';

import { isEmptyOrNil, toDate } from 'utils';

export const getGuestsFromBooking = booking => ({
  adults: propOr(0, 'adults', booking),
  teens: propOr(0, 'teens', booking),
  children: propOr(0, 'children', booking),
  infants: propOr(0, 'infants', booking),
});

const reduceDisabledDays = (accum, [key, rate]) => {
  if (!rate) return append(key, accum);

  const hasRate = propSatisfies(complement(isEmptyOrNil), 'rate');

  return hasRate(rate) ? accum : append(key, accum);
};

export const getDisabledDays = pipe(
  toPairs,
  reduce(reduceDisabledDays, []),
  map(toDate)
);

export const guestLine = (type, amount) => `${amount} ${getPluralisation(type, amount)}`;
export const additionalGuestLine = (type, amount) => gt(amount, 0) && ` + ${guestLine(type, amount)}`;

export const getOptionsFromRates = rates => {
  const ratesDates = keys(rates).sort();
  const firstDate = head(ratesDates);
  const lastDate = last(ratesDates);
  const disabled = getDisabledDays(rates);

  return { ratesDates, firstDate, lastDate, disabled };
};

const hasRequisites = pipe(
  props(['quantity', 'adults']),
  map(defaultTo(0)),
  all(gt(__, 0))
);

export const canBook = pipe(
  propOr({}, 'accommodationProducts'),
  values,
  ifElse(isEmpty, always(false), all(hasRequisites))
);
