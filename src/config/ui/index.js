import { __, pipe, prop, propOr, head, last, toLower } from 'ramda';

import en from './lang/en';

const uiConfig = {
  ...en,
};

export const getSingular = pipe(
  propOr([], __, prop('plurals', uiConfig)),
  head
);

export const getPlural = pipe(
  propOr([], __, prop('plurals', uiConfig)),
  last
);

export const getPluralisation = (key, value) => (value === 1 ? getSingular(toLower(key)) : getPlural(toLower(key)));

export default uiConfig;
