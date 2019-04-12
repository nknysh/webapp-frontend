import { invoker, multiply, divide } from 'ramda';

export const formatPrice = invoker(1, 'toFixed')(2);

export const calculatePercentage = (amount, percent) => divide(multiply(amount, percent), 100);
