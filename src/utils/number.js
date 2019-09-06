import { pipe, invoker, multiply, divide, replace } from 'ramda';

export const formatPrice = pipe(
  Number,
  invoker(1, 'toFixed')(2),
  replace(/\B(?=(\d{3})+(?!\d))/g, ',') // regex taken from https://stackoverflow.com/a/2901298
);

export const calculatePercentage = (amount, percent) => divide(multiply(Number(amount), Number(percent)), 100);
