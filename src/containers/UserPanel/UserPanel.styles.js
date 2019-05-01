import styled, { css } from 'styled-components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const StyledUserPanel = styled.div`
  position: relative;
`;

export const Text = styled.div`
    margin ${theme.gutter / 2}px 0;
    padding: ${theme.gutter / 2}px 0;
    text-transform: uppercase;
    font-weight: ${theme.fonts.bold};
    cursor: pointer;
    transition: ${theme.defaultTransition};

    &:hover {
        color: ${theme.primary};
    }

    ${({ ['data-placeholder']: placeholder }) =>
      placeholder &&
      css`
        color: ${theme.colors.gray};
      `}

    ${breakpoints.tablet`
        margin ${theme.gutter / 2}px ${theme.gutter}px;
        padding: ${theme.gutter / 2}px ${theme.gutter}px;
    `}
`;
