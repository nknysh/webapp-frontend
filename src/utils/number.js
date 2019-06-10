import { pipe, invoker, multiply, divide } from 'ramda';

export const formatPrice = pipe(
  Number,
  invoker(1, 'toFixed')(2)
);

export const calculatePercentage = (amount, percent) => divide(multiply(Number(amount), Number(percent)), 100);
