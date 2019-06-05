import {
  pipe,
  values,
  reverse,
  ifElse,
  always,
  length,
  equals,
  all,
  complement,
  both,
  curry,
  path,
  head,
  last,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { differenceInCalendarDays, eachDay, endOfMonth, format, startOfMonth, subDays } from 'date-fns';

import config from 'config';
import { isString } from './helpers';

export const toDate = date => (date ? new Date(date) : new Date());

const correctLength = pipe(
  length,
  equals(2)
);

const allPopulated = all(complement(isNilOrEmpty));

const getDifference = dates => differenceInCalendarDays(...dates);

const hasToFrom = both(correctLength, allPopulated);

export const getNumberOfDays = pipe(
  values,
  reverse,
  ifElse(hasToFrom, getDifference, always(undefined))
);

export const getFromDateFormat = (dates = {}) => {
  let { startDate, endDate } = dates;

  if (!startDate || !endDate) return '';

  startDate = isString(startDate) ? new Date(startDate) : startDate;
  endDate = isString(endDate) ? new Date(endDate) : endDate;

  const sameMonth = endDate && startDate.getMonth() === endDate.getMonth();
  const sameYear = endDate && startDate.getYear() === endDate.getYear();

  const month = sameMonth && sameYear ? '' : 'MMM';
  const year = sameYear ? '' : 'YYYY';

  return format(startDate, `D ${month} ${year}`);
};

export const getToDateFormat = (dates = {}) => {
  const { endDate } = dates;

  if (!endDate) return '';
  return ` - ${format(endDate, 'D MMM YYYY')}`;
};

export const formatDate = (date, pattern = path(['defaults', 'dateFormat'], config)) => format(date, pattern);

export const getStartOfMonth = pipe(
  startOfMonth,
  formatDate
);
export const getEndOfMonth = pipe(
  endOfMonth,
  formatDate
);

export const getFromToFromDates = (dates = []) => ({
  startDate: head(dates) && new Date(head(dates)),
  endDate: last(dates) && new Date(last(dates)),
});

export const getDaysBetween = (startDate, endDate) => eachDay(startDate, subDays(endDate, 1));

export const minusDays = curry((amount, date) => subDays(date, amount));
