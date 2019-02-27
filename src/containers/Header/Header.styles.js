import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';

import { Container } from 'styles/elements';
import breakpoints from 'styles/breakpoints';
import theme from 'styles/theme';

import { Link, Menu } from 'components';

export const HeaderContainer = styled(Container)`
  display: flex;
  width: 100%;
  height: ${theme.headerSizes.mobile}px;
  align-items: center;

  ${breakpoints.tablet`
    height: ${theme.headerSizes.tablet}px;
  `}
`;

export const StyledHeader = styled.div`
  background: ${theme.backgroundColor}
  border-bottom: 1px solid ${theme.colors['gray-light']};
  padding: ${theme.gutter}px ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    padding: 0;
  `}
`;

export const HeaderLogo = styled(Link)`
  height: 26px;
  width: auto;
  display: block;

  a {
    display: block;
  }

  img {
    height: 100%;
    width: auto;
  }

  ${breakpoints.tablet`
    height: auto;
    padding: 0 ${theme.gutter}px !important;
  `}
`;

export const HeaderMenuArea = styled.div`
  width: 100%;
  text-align: right;
`;

export const HeaderMobileMenuButton = styled(Icon)`
  display: block;
  color: ${theme.colors.gold};
  font-size: 38px !important;

  ${breakpoints.tablet`
    display: none !important;
  `}
`;

export const HeaderMenu = styled(Menu)`
  position: absolute;
  background: ${theme.backgroundColor};
  padding: ${theme.gutter}px;
  top: ${theme.headerSizes.mobile + theme.gutter * 2}px;
  right: 0;
  left: 0;
  border-top: 1px solid ${theme.colors.gold};
  transition: ease-in-out 0.25s all;
  text-align: left;
  font-size: 12px;
  z-index: 100;

  ${({ isOpen }) => css`
    opacity: ${isOpen ? 1 : 0};
    pointer-events: ${isOpen ? 'auto' : 'none'};
  `}

  ${breakpoints.tablet`
    border: 0;
    position: relative;
    padding: 0;
    top: unset;
    right: unset;
    left: unset;
    width: 100%;
    opacity: 1;
    pointer-events: auto;
    font-size: 11px;
  `}
`;

export const HeaderMenuWrapper = styled.div``;
