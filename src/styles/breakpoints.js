import { reduce, merge, keys, pipe } from 'ramda';
import { css } from 'styled-components';

import { breakpoints } from './theme';

const mediaQuery = breakpoint => (...args) => css`
  @media (min-width: ${breakpoints[breakpoint]}px) {
    ${css(...args)}
  }
`;

const breakpointReducer = (acc, breakpoint) => merge(acc, { [breakpoint]: mediaQuery(breakpoint) });

const buildBreakpoints = pipe(
  keys,
  reduce(breakpointReducer, {})
);

export default buildBreakpoints(breakpoints);
