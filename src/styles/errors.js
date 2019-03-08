import styled from 'styled-components';

import { Markdown } from 'components';

import theme from './theme';
import breakpoints from './breakpoints';

export const ServerError = styled(Markdown)`
  border: 1px solid ${theme.primary};
  background: ${theme.colors.whiteish};
  text-align: center;
  padding: ${theme.gutter}px;

  ${breakpoints.tablet`
    width: 400px;
  `}

  h3 {
    font-family: ${theme.headingFont};
    color: ${theme.primary};
    font-size: 14px;
  }

  p {
    font-size: 12px;
  }
`;
