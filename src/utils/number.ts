import { pipe, invoker, multiply, divide, replace, when } from 'ramda';
import { isString } from './helpers';

/**
 * Remove commas if string
 *
 * @param {string}
 * @returns {string}
 */
const removeCommasIfString = when(isString, replace(/,/g, ''));

/**
 * Format price
 *
 * @param {string | number} data
 * @param {number} decimals
 * @returns {string}
 */
export const formatPrice = (data, decimals = 2) =>
  pipe(
    removeCommasIfString,
    Number,
    invoker(1, 'toFixed')(decimals),
    replace(/\B(?=(\d{3})+(?!\d))/g, ',') // regex taken from https://stackoverflow.com/a/2901298
  )(data);

/**
 * Calculate percentage
 *
 * @param {string | number} amount
 * @param {string | number} percent
 */
export const calculatePercentage = (amount, percent) =>
  divide(multiply(Number(removeCommasIfString(amount)), Number(percent)), 100);

export const sanitizeInteger = (newValue: string, oldValue: any): number | undefined => {
  if (newValue === '') {
    return undefined;
  }
  const parsed = parseInt(newValue, 10);
  return isNaN(parsed) ? oldValue : parsed;
};
