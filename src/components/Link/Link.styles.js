import styled, { css } from 'styled-components';

import breakpoints from 'styles/breakpoints';
import theme from 'styles/theme';

export const Link = styled.div`
  a,
  a:visited {
    color: ${theme.secondary};

    &:hover,
    &:active {
      color: ${theme.primary};
    }

    padding: ${theme.gutter}${theme.unit} 0;

    ${breakpoints.tablet`
    ${({ spaced }) =>
      spaced &&
      css`
        padding: ${theme.gutter / 2}${theme.unit} ${theme.gutter}${theme.unit};
        margin: ${theme.gutter / 2}${theme.unit} ${theme.gutter}${theme.unit};
      `}

    ${({ inverse }) =>
      inverse &&
      css`
        color: ${theme.colors.white};
        background: ${theme.primary};
        border-radius: ${theme.borderRadius}${theme.unit};

        &:hover {
          background: ${theme.secondary};
        }
      `}


      ${({ bold }) =>
        bold &&
        css`
          font-weight: bold;
        `}
    `}
  }
`;
