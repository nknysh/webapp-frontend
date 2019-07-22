import styled, { css } from 'styled-components';

import { Select, Link as BaseLink } from 'components/elements';

import { theme, breakpoints } from 'styles';

export const StyledUserPanel = styled.div`
  position: relative;
  padding: ${theme.gutter}px;

  ${breakpoints.tablet`
    padding: 0;
  `}
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

export const Link = styled(BaseLink)`
  width: 100%;
  flex: 0;

  ${breakpoints.desktop`
      flex: 1;
    `}
`;
