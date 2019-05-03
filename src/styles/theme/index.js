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
  neutral: getColor('gold-neutral'),
  selected: getColor('aqua'),

  warning: undefined,
  error: 'red',
  ok: 'green',

  navigation: getColor('whiteish'),

  boxShadows: {
    default: '4px 4px 8px 0 rgba(0,0,0,0.1)',
  },
  borders: {
    default: getColor('gray-dark'),
    medium: getColor('gray-medium'),
    normal: getColor('gray'),
  },
  backgrounds: {
    default: getColor('white'),
    defaultOpacity: getColor('white-opacity-1'),
    secondary: getColor('whiteish'),
    light: getColor('gray-light'),
  },

  listSeparatorColor: getColor('gold'),
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
  sizes: {
    default: 12,
    less: 13,
    normal: 14,
    mid: 16,
    big: 18,
    bigger: 22,
    link: 11,
  },
  bolder: 800,
  bold: 600,
  normal: 'normal',
  light: 300,
  lighter: 200,
  letterSpacing: {
    whole: 1,
    mid: 0.46,
    medium: 0.5,
  },
});

export default {
  ...animations,
  ...palette,
  ...sizes,
  ...spacing,
  breakpoints,
  colors,
  fonts,
};
