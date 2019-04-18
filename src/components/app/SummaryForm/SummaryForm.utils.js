import {
  append,
  complement,
  gt,
  head,
  keys,
  last,
  map,
  path,
  pipe,
  prop,
  propOr,
  propSatisfies,
  reduce,
  sum,
  toPairs,
  values,
  apply,
  mapObjIndexed,
  defaultTo,
  over,
  lensProp,
  add,
  join,
  filter,
  equals,
} from 'ramda';

import { getPluralisation } from 'config/ui';

import { isEmptyOrNil, toDate } from 'utils';

export const getGuestsFromBooking = booking => ({
  adult: propOr(0, 'adult', booking),
  teen: propOr(0, 'teen', booking),
  child: propOr(0, 'child', booking),
  infant: propOr(0, 'infant', booking),
});

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

export const guestLine = (type, amount) => gt(amount, 0) && `${amount} ${getPluralisation(type, amount)}`;

export const getOptionsFromRates = rates => {
  const ratesDates = keys(rates).sort();
  const firstDate = head(ratesDates);
  const lastDate = last(ratesDates);
  const disabled = getDisabledDays(rates);

  return { ratesDates, firstDate, lastDate, disabled };
};

export const getTotalGuests = pipe(
  map(
    pipe(
      values,
      sum
    )
  ),
  sum
);

const reduceByAge = (accum, data) => {
  if (!data) return accum;

  mapObjIndexed((amount, type) => {
    const addAmount = pipe(
      defaultTo(0),
      add(amount)
    );
    accum = over(lensProp(type), addAmount, accum);
  }, data);

  return accum;
};

export const getAgeSplits = pipe(
  reduce(reduceByAge, {}),
  toPairs,
  map(apply(guestLine)),
  filter(complement(equals(false))),
  join(' + ')
);
