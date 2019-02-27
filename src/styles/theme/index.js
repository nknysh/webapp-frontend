import { __, prop, pipe, defaultTo } from 'ramda';

import colors from './colors';

const getColor = pipe(
  prop(__, colors),
  defaultTo('#000000')
);

export const breakpoints = Object.freeze({
  desktop: 1200,
  tablet: 700,
});

export const palette = Object.freeze({
  primary: getColor('gold'),
  secondary: getColor('gold-dark'),

  warning: undefined,
  error: undefined,
  ok: undefined,

  backgroundColor: getColor('white'),
  inputBorder: getColor('gray-medium'),
});

export const spacing = Object.freeze({
  gutter: 10,
  unit: 'px',
});

export const sizes = Object.freeze({
  linkSize: 11,
  borderRadius: 1,

  headerSizes: {
    mobile: 70,
    tablet: 120,
  },
});

export default {
  ...palette,
  ...spacing,
  ...sizes,
  breakpoints,
  colors,
};
