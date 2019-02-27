import styled, { css } from 'styled-components';

import breakpoints from 'styles/breakpoints';
import theme from 'styles/theme';

export const Link = styled.div`
  a,
  a:visited {
    color: ${theme.secondary};

    &:active {
      color: ${theme.primary};
    }

    padding: ${theme.gutter}px 0;

    ${breakpoints.tablet`
    ${({ spaced }) =>
      spaced &&
      css`
        padding: ${theme.gutter / 2}px ${theme.gutter}px;
        margin: ${theme.gutter / 2}px ${theme.gutter}px;
      `}

    ${({ inverse }) =>
      inverse &&
      css`
        color: ${theme.colors.white};
        background: ${theme.primary};
        border-radius: ${theme.borderRadius}px;
      `}


      ${({ bold }) =>
        bold &&
        css`
          font-weight: bold;
        `}
    `}
  }
`;
