import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';
import { Link, Menu, Container } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const HeaderContainer = styled(Container)`
  display: flex;
  height: ${theme.sizes.headerSizes.mobile}px;
  align-items: center;

  > div {
    flex: 1 1 50%;
    width: 50%;
    margin: 0 ${theme.spacing.gutter * 2}px;
  }

  ${props => props.theme.breakpoints.desktop`
    height: ${theme.sizes.headerSizes.tablet}px;

    > div {
      width: unset;
      flex: 1 1 auto;
      
      :first-child, :last-child {
        margin: 0;
      }
    }
  `}
`;

export const StyledHeader = styled.div`
  position: relative;
  background: ${theme.backgrounds.default};
  border-bottom: 1px solid ${theme.borders.medium};
  width: 100%;
  position: fixed;
  z-index: 800;
  top: 0;

  ${props => props.theme.breakpoints.desktop`
    position: relative;
    padding: 0;
    z-index: 1000;
  `}
`;

export const HeaderLogo = styled(Link)`
  margin: ${theme.spacing.gutter}px ${theme.spacing.gutter * 1.5}px;
  display: block;
  margin: 0 ${theme.spacing.gutter * 2}px;
  padding: 0;
  outline: 0;

  ${props => props.theme.breakpoints.desktop`
    margin: ${theme.spacing.gutter}px;
  `}

  img {
    display: block;
    margin: 0;
    padding: 0;
    max-width: 100%;
  }
`;

export const HeaderMenuArea = styled.div`
  width: 100%;
  text-align: right;
`;

export const HeaderMobileMenuButton = styled(Icon)`
  display: block;
  color: ${theme.colors.gold};
  font-size: 38px !important;

  ${props => props.theme.breakpoints.desktop`
    display: none !important;
  `}
`;

export const HeaderMenu = styled(Menu)`
  background: ${theme.backgrounds.default};
  border-top: 1px solid ${theme.palette.primary};
  box-shadow: ${theme.boxShadows.default};
  font-size: ${theme.fonts.sizes.default}px;
  left: 0;
  padding: 0 ${theme.spacing.gutter}px;
  position: absolute;
  right: 0;
  text-align: left;
  top: ${theme.sizes.headerSizes.mobile}px;
  transition: ${theme.defaultTransition};
  z-index: 100;

  > a {
    flex: 0;
  }

  ${({ isOpen }) => css`
    opacity: ${isOpen ? 1 : 0};
    pointer-events: ${isOpen ? 'auto' : 'none'};
  `}

  ${props => props.theme.breakpoints.desktop`
    border: 0;
    display: flex;
    font-size: 11px;
    left: unset;
    opacity: 1;
    padding: 0;
    pointer-events: auto;
    position: relative;
    right: unset;
    top: unset;
    width: 100%;
    box-shadow: 0 0 0;

    > a {
      flex: 0 1 auto;
    }
  `}
`;

export const HeaderMenuWrapper = styled.div``;
