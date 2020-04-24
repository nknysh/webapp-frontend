import styled, { css, keyframes } from 'styled-components';
import { Select, Link as BaseLink } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';
import { pureUiTheme } from 'pureUi/pureUiTheme';

const dropdownIn = keyframes`
  from {
    opacity: 0;
    top: 15px;
  }

  to {
    opacity: 1;
    top: 30px;
  }
`;

export const StyledUserPanel = styled.div`
  position: relative;
  padding: ${theme.spacing.gutter}px;

  ${props => props.theme.breakpoints.tablet`
    padding: 0;
  `}

  .link {
    color: ${pureUiTheme.colors.black};
    font-size: 16px;
    display: block;
  }

  ul.dropdown {
    animation: ${dropdownIn} 0.25s ease-out;
    border-radius: 8px;
    position: absolute;
    right: 0;
    top: 30px;
    background-color: white;
    padding: 10px 0;
    list-style: none;
    margin: 0;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    border: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    color: ${pureUiTheme.colors.black};
    font: ${pureUiTheme.typography.sansSerifFont};
    text-transform: uppercase;
  }

  ul.dropdown > li {
    font-size: 16px;
    padding: 10px;
    border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;

    &:last-child {
      border: none;
    }
  }

  .dropdownBG {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0);
  }
`;

export const Text = styled.div`
  margin: ${theme.spacing.gutter / 2}px 0;
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
