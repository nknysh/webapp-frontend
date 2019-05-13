import { pipe, values, reverse, ifElse, always, length, equals, all, complement, both, path } from 'ramda';
import { differenceInCalendarDays, format, startOfMonth, endOfMonth, eachDay, subDays } from 'date-fns';

import uiConfig from 'config/ui';
import { isEmptyOrNil } from 'utils';

export const toDate = date => (date ? new Date(date) : new Date());

const correctLength = pipe(
  length,
  equals(2)
);

const allPopulated = all(complement(isEmptyOrNil));

const getDifference = dates => differenceInCalendarDays(...dates);

const hasToFrom = both(correctLength, allPopulated);

export const getNumberOfDays = pipe(
  values,
  reverse,
  ifElse(hasToFrom, getDifference, always(undefined))
);

export const getFromDateFormat = ({ from, to }) => {
  if (!from) return '';

  const sameMonth = to && from.getMonth() === to.getMonth();
  const sameYear = to && from.getYear() === to.getYear();

  const month = sameMonth && sameYear ? '' : 'MMM';
  const year = sameYear ? '' : 'YYYY';

  return format(from, `D ${month} ${year}`);
};

export const getToDateFormat = ({ to }) => ` - ${format(to, 'D MMM YYYY')}`;

export const formatDate = (date, pattern = path(['dates', 'defaultFormat'], uiConfig)) => format(date, pattern);

export const getStartOfMonth = pipe(
  startOfMonth,
  formatDate
);
export const getEndOfMonth = pipe(
  endOfMonth,
  formatDate
);

export const getDaysBetween = (from, to) => eachDay(from, subDays(to, 1));