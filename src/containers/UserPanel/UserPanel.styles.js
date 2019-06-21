import styled, { css } from 'styled-components';

import { Select } from 'components/elements';

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
      margin-left: ${theme.gutter}px;
      padding-left: ${theme.gutter}px;
    `}
`;

export const Country = styled.div``;
export const CountrySelect = styled(Select)``;
