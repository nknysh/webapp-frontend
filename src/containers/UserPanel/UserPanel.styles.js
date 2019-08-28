import styled, { css } from 'styled-components';
import { Select, Link as BaseLink } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const StyledUserPanel = styled.div`
  position: relative;
  padding: ${theme.spacing.gutter}px;

  ${props => props.theme.breakpoints.tablet`
    padding: 0;
  `}
`;

export const Text = styled.div`
    margin ${theme.spacing.gutter / 2}px 0;
    padding: ${theme.spacing.gutter / 2}px 0;
    text-transform: uppercase;
    font-weight: ${theme.fonts.bold};
    cursor: pointer;
    transition: ${theme.defaultTransition};

    &:hover {
        color: ${theme.palette.primary};
    }

    ${({ ['data-placeholder']: placeholder }) =>
      placeholder &&
      css`
        color: ${theme.colors.gray};
      `}

    ${props => props.theme.breakpoints.tablet`
      margin-left: ${theme.spacing.gutter}px;
      padding-left: ${theme.spacing.gutter}px;
    `}
`;

export const Country = styled.div``;
export const CountrySelect = styled(Select)``;

export const Link = styled(BaseLink)`
  width: 100%;
  flex: 0;

  ${props => props.theme.breakpoints.desktop`
      flex: 1;
    `}
`;
