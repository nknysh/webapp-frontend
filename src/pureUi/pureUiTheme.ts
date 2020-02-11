// This needsa review. The names are nonsense, and it would be better
// to name colors by their role, not what they look like. e.g.,
// - primaryActionColor
// - secondaryActionColor
// - neutralColor
// - text
// ...etc

export const colors = {
  gold: '#A18265',
  goldDark: '#382A21',
  goldNeutral: '#736A65',
  goldLight: '#9D9591',
  goldBorder: '#816850',
  goldOpacity: 'rgba(161,130,101, 0.75)',
  black: '#373C46',
  blackLight: '#999999',
  blackDarker: '#333333',
  blackSecondary: '#9F9F9F',

  white: '#FFFFFF',
  whiteish: '#F8F8F8',
  whiteOpacity1: 'rgba(248,248,248,0.85)',
  whiteOpacity2: 'rgba(255,255,255, 0.9)',

  gray: '#EAEAEA',
  grayLight: '#F8F8F8',
  grayMedium: '#E9E8E9',
  grayDark: '#E0E0E0',
  graySecondary: '#E1E1E1',
  grayDarker: '#7b7b7b',

  grayDepth1: '#E5E3E2',
  grayDepth2: '#F3F3F3',
  grayDepth3: '#FAFAFA',

  grayOpacity1: 'rgba(0,0,0,0.35)',

  grayFaded: '#9d9591', // duplicate
  grayNeutral: '#a18265',

  marine: '#56D1BF',
  aqua: '#D4F3EE',

  lightBlue: '#F3F9FB',

  teal: '#57d2bf',

  redFade: '#FD5656',
  yellow: '#f5a623',
  green: '#56d1bf',
};

const colorRoles = {
  lightGreyBorder: colors.grayDark,
  areaBackground: colors.whiteish,
  grayLabel: '#736A65',
  error: colors.redFade,
};

const checkboxSize = 23;
const checkboxTittleSize = 6;
const measurements = {
  checkboxSize,
  checkboxTittleSize,
  controlDottOffset: Math.floor(checkboxSize / 2) - Math.floor(checkboxTittleSize / 2),
};

export const pureUiTheme = {
  fontSize: '16px',
  baseUnit: '4px',
  colors,
  colorRoles,
  measurements,
};

export type PureUiTheme = typeof pureUiTheme;
