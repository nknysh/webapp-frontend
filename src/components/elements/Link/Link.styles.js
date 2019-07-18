import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const linkStyles = css`
  cursor: pointer;
  color: ${theme.secondary};

  &:active {
    color: ${theme.primary};
  }

  padding: ${theme.gutter}px 0;

  ${breakpoints.tablet`
    ${({ ['data-spaced']: spaced }) =>
      spaced &&
      css`
        padding: ${theme.gutter / 2}px ${theme.gutter}px;
        margin: ${theme.gutter / 2}px ${theme.gutter}px;
      `}

    ${({ ['data-inverse']: inverse }) =>
      inverse &&
      css`
        color: ${theme.colors.white};
        background: ${theme.primary};
        border-radius: ${theme.borderRadius}px;
      `}

      ${({ ['data-bold']: bold }) =>
        bold &&
        css`
          font-weight: ${theme.fonts.bold};
        `}
    `}
`;
export const Link = styled.a`
  ${linkStyles}
`;

export const StyledLink = styled(RouterLink)`
  ${linkStyles};
`;
