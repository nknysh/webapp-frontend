import { pipe, invoker, multiply, divide, replace, when } from 'ramda';
import { isString } from 'utils';

const removeCommasIfString = when(isString, replace(/,/g, ''));

export const formatPrice = pipe(
  removeCommasIfString,
  Number,
  invoker(1, 'toFixed')(2),
  replace(/\B(?=(\d{3})+(?!\d))/g, ',') // regex taken from https://stackoverflow.com/a/2901298
);

export const calculatePercentage = (amount, percent) =>
  divide(multiply(Number(removeCommasIfString(amount)), Number(percent)), 100);
