import styled, { css } from 'styled-components';

import theme from 'styles/theme';

export const Link = styled.div`    
  a, a:visited {
    color: ${({ inverse }) => (inverse ? theme.colors.white : theme.secondary)};

    &:hover, &:active {
      color: ${({ inverse }) => (inverse ? theme.colors.white : theme.primary)};
    }

    ${({ spaced }) =>
      spaced &&
      css`
        padding: ${theme.gutter / 2}px ${theme.gutter}px;
        margin: ${theme.gutter / 2}px ${theme.gutter}px;
      `}

    ${({ inverse }) =>
      inverse &&
      css`
        background: ${theme.primary};
        border-radius: 1px;

        &:hover {
          background: ${theme.secondary};
        }
      `}

    ${({ bold }) =>
      bold &&
      css`
        font-weight: bold;
      `}
  }
`;
