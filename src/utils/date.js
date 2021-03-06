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
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  format,
  startOfMonth,
  subDays,
  addDays,
  parseISO,
} from 'date-fns';

import config from '../config';
import { isString } from './helpers';

/**
 * To date
 *
 * Returns a new Date object
 *
 * @param {string | Date} date
 * @returns {Date}
 */
export const toDate = date => (date ? new Date(date) : new Date());

/**
 * Returns correct object length
 *
 * @param {object}
 * @returns {boolean}
 */
const correctLength = pipe(length, equals(2));

/**
 * Ensure all keys are populate
 *
 * @param {*}
 * @returns {boolean}
 */
const allPopulated = all(complement(isNilOrEmpty));

/**
 * Returns difference bewteen days
 *
 * @param {array} dates
 * @returns {*}
 */
const getDifference = dates => differenceInCalendarDays(...dates);

/**
 * Check both to and from exist
 *
 * @param {object}
 * @returns {boolean}
 */
const hasToFrom = both(correctLength, allPopulated);

/**
 * Get the number of days (nights) bewteen dates
 *
 * @param {object}
 * @returns {number | undefined}
 */
export const getNumberOfDays = pipe(values, reverse, ifElse(hasToFrom, getDifference, always(undefined)));

/**
 * Get from date format
 *
 * Format the from date to a string that returns
 * either the day, the day and month (if split over months)
 * or the day, month, year (if split over years)
 *
 * @param {object} dates
 * @returns {string}
 */
export const getFromDateFormat = (dates = {}) => {
  let { startDate, endDate } = dates;

  if (!startDate || !endDate) return '';

  // Make sure dates are formatted
  startDate = isString(startDate) ? new Date(startDate) : startDate;
  endDate = isString(endDate) ? new Date(endDate) : endDate;

  // Check that mnonth and year are the same
  const sameMonth = endDate && startDate.getMonth() === endDate.getMonth();
  const sameYear = endDate && startDate.getYear() === endDate.getYear();

  const month = sameMonth && sameYear ? '' : 'MMM';
  const year = sameYear ? '' : 'yyyy';

  // Run date through build format string
  return format(startDate, `d ${month} ${year}`);
};

/**
 * Get to date format
 *
 * Formats the to date to return the full end date
 *
 * @param {object} dates
 * @returns {string}
 */
export const getToDateFormat = (dates = {}) => {
  const { endDate } = dates;

  if (!endDate) return '';
  return ` - ${format(endDate, 'd MMM yyyy')}`;
};

/**
 * Date formatter
 *
 * Wrapper around date-fns date formatter
 *
 * @param {string | Date} date
 * @param {string} pattern
 */
export const formatDate = (date, pattern = path(['defaults', 'dateFormat'], config)) => {
  const safeDate = isString(date) ? new Date(date) : date;
  return format(safeDate, pattern);
};

/**
 * Get start of month
 *
 * Returns the first day of the month for the given date
 *
 * @param {string | Date}
 * @returns {string}
 */
export const getStartOfMonth = pipe(startOfMonth, formatDate);

/**
 * Get end of month
 *
 * Returns the last day of the month for the given date
 *
 * @param {string | Date}
 * @returns {string}
 */
export const getEndOfMonth = pipe(endOfMonth, formatDate);

/**
 * Get from to from dates
 *
 * Returns start/end date object from array
 *
 * @param {array} dates
 * @returns {object}
 */
export const getFromToFromDates = (dates = []) => ({
  startDate: head(dates) && new Date(head(dates)),
  endDate: last(dates) && new Date(last(dates)),
});

/**
 * Get Days between
 *
 * Returns the days bewteen the current selected days
 *
 * @param {string | Date} startDate
 * @param {string | Date} endDate
 * @returns {Array<Date>}
 */
export const getDaysBetween = (startDate, endDate) =>
  eachDayOfInterval({
    start: startDate,
    end: subDays(endDate, 1),
  });

/**
 * Minus days
 *
 * Curried function to remove days from a date
 *
 * @param {number} amount Amount of days to remove
 * @param {string | Date} date
 * @returns {Function | Date}
 */
export const minusDays = curry((amount, date) => subDays(date, amount));

export const addDaysUTC = (date, amount) => addDays(new Date(date), amount);
export const subDaysUTC = (date, amount) => subDays(new Date(date), amount);

// @see https://pureescapes.atlassian.net/browse/OWA-1031
export const subDaysString = (dateAsString, amount) => {
  const newDate = subDays(new Date(dateAsString), amount);
  return formatDate(newDate);
};

export const formatDateDisplay = date => formatDate(date, path(['defaults', 'displayDateFormat'], config));
export const formatDateTimeDisplay = date => formatDate(date, path(['defaults', 'displayDateTimeFormat'], config));

export const formatDateRangeDisplay = (startDate, endDate) => {
  if (!endDate) {
    return startDate ? formatDateDisplay(startDate) : null;
  }

  if (startDate === endDate) {
    return formatDateDisplay(startDate);
  }

  return `${formatDateDisplay(startDate)} - ${formatDateDisplay(endDate)}`;
};

export const generateArrayOfDatesBetween = (startDate, endDate) => {
  return eachDayOfInterval({
    start: typeof startDate === 'string' ? parseISO(startDate) : startDate,
    end: typeof endDate === 'string' ? parseISO(endDate) : endDate,
  }).map(date => formatDate(date));
};
