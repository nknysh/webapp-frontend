import styled, { css } from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';

import { theme, breakpoints, buttonStyles } from 'styles';

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

      ${({ ['data-bold']: bold, ['data-active']: active }) =>
        (bold || active) &&
        css`
          font-weight: ${theme.fonts.bold};
        `}
    `}

  ${({ ['data-button']: button }) =>
    button &&
    css`
      ${buttonStyles};
      background: ${theme.light};
      display: block;
      text-align: center;
      margin-bottom: ${theme.gutter * 2}px;
    `}
`;
export const Link = styled.a`
  ${linkStyles}
`;

export const StyledLink = styled(RouterLink)`
  ${linkStyles};
`;
