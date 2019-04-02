import { invoker } from 'ramda';

export const formatPrice = invoker(1, 'toFixed')(2);
