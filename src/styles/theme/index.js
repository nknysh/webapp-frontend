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
  error: 'red',
  ok: undefined,

  navigation: getColor('whiteish'),
  backgroundColor: getColor('white'),
  boxShadowColor: getColor('black-light'),
  boxShadow: `0 4px 10px ${getColor('black-light')}`,
  boxShadowEven: `0 0 10px ${getColor('black-light')}`,
  inputBorder: getColor('gray-medium'),
  borderColor: getColor('gray-dark'),
  listSeparatorColor: getColor('gold'),
  selected: getColor('aqua'),

  opacity: 0.35,
});

export const spacing = Object.freeze({
  gutter: 10,
  unit: 'px',
});

export const sizes = Object.freeze({
  borderRadius: 1,

  headerSizes: {
    mobile: 70,
    tablet: 120,
  },
});

export const animations = Object.freeze({
  defaultTransition: 'ease-in-out 0.25s all',
});

export const fonts = Object.freeze({
  defaultFont: 'HurmeGeometricSans2, "Open Sans", sans-serif',
  headingFont: 'NoeDisplay, "Open Sans", sans-serif',
  linkSize: 11,
  bolder: 800,
  bold: 600,
  normal: 'normal',
  light: 300,
  lighter: 200,
});

export default {
  ...animations,
  ...fonts,
  ...palette,
  ...sizes,
  ...spacing,
  breakpoints,
  colors,
};
