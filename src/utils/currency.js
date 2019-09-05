import { __, pipe, prop } from 'ramda';

import currencies from 'config/data/currencies';

export const getCurrency = prop(__, currencies);

export const getCurrencySymbol = pipe(
  getCurrency,
  prop('symbol')
);
