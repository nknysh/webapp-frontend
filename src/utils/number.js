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
 * @param {string | number}
 * @returns {string}
 */
export const formatPrice = pipe(
  removeCommasIfString,
  Number,
  invoker(1, 'toFixed')(2),
  replace(/\B(?=(\d{3})+(?!\d))/g, ',') // regex taken from https://stackoverflow.com/a/2901298
);

/**
 * Calculate percentage
 *
 * @param {string | number} amount
 * @param {string | number} percent
 */
export const calculatePercentage = (amount, percent) =>
  divide(multiply(Number(removeCommasIfString(amount)), Number(percent)), 100);
