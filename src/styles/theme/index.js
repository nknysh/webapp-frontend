import { __, prop, pipe, defaultTo } from 'ramda';

import colors from './colors';

const getColor = pipe(
  prop(__, colors),
  defaultTo('#000000')
);

export const breakpoints = {
  desktop: 1200,
  tablet: 700,
};

export const palette = {
  primary: getColor('gold'),
  secondary: getColor('gold-dark'),

  warning: undefined,
  error: undefined,
  ok: undefined,

  backgroundColor: getColor('white'),
  inputBorder: getColor('gray-medium'),
};

export const spacing = {
  gutter: 10,
};

export default {
  ...palette,
  ...spacing,
  breakpoints,
  colors,
};
