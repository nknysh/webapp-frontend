import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';

import { Container } from 'styles/elements';
import breakpoints from 'styles/breakpoints';
import theme from 'styles/theme';

import { Link, Menu } from 'components';

export const HeaderContainer = styled(Container)`
  display: flex;
  width: 100%;
  height: ${theme.headerSizes.mobile}${theme.unit};
  align-items: center;

  ${breakpoints.tablet`
    height: ${theme.headerSizes.tablet}${theme.unit};
  `}
`;

export const StyledHeader = styled.div`
  background: ${theme.backgroundColor}
  border-bottom: 1${theme.unit} solid ${theme.colors['gray-light']};
  padding: ${theme.gutter}${theme.unit} ${theme.gutter * 2}${theme.unit};

  ${breakpoints.tablet`
    padding: ${theme.gutter};
  `}
`;

export const HeaderLogo = styled(Link)`
  padding: ${theme.gutter}${theme.unit};
  height: 26${theme.unit};
  width: auto;
  display: block;

  a{
    display: block;
  }
    
  img {
    height: 100%;
    width: auto;
  }
  ${breakpoints.tablet`
    height: auto;
  `}
`;

export const HeaderMenuArea = styled.div`
  width: 100%;
  text-align: right;
`;

export const HeaderMobileMenuButton = styled(Icon)`
  display: block;
  color: ${theme.colors.gold};
  font-size: 38${theme.unit} !important;

  ${breakpoints.tablet`
    display: none !important;
  `}
`;

export const HeaderMenu = styled(Menu)`
  position: absolute;
  background: ${theme.backgroundColor};
  padding: ${theme.gutter}${theme.unit};
  top: ${theme.headerSizes.mobile + theme.gutter * 2}${theme.unit};
  right: 0;
  left: 0;
  border-top: 1${theme.unit} solid ${theme.colors.gold};
  transition: ease-in-out 0.25s all;
  text-align: left;
  font-size: 12${theme.unit};

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
    font-size: 11${theme.unit};
  `}
`;

export const HeaderMenuWrapper = styled.div``;
