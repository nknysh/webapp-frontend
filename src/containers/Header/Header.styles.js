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

  > div {
    flex: 1 1 50%;
    width: 50%;
    margin: 0 ${theme.gutter * 2}px;
  }

  ${breakpoints.tablet`
    height: ${theme.headerSizes.tablet}px;

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
  border-bottom: 1px solid ${theme.borders.default};
  width: 100%;
  position: fixed;
  z-index: 10000;
  top: 0;

  ${breakpoints.tablet`
    position: relative;
    padding: 0;
    z-index: 1000;
  `}
`;

export const HeaderLogo = styled(Link)`
  margin: ${theme.gutter}px ${theme.gutter * 2}px;
  display: block;
  margin: 0;
  padding: 0;

  ${breakpoints.tablet`
    margin: ${theme.gutter}px;
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

  ${breakpoints.tablet`
    display: none !important;
  `}
`;

export const HeaderMenu = styled(Menu)`
  position: absolute;
  background: ${theme.backgrounds.default};
  padding: ${theme.gutter}px;
  top: ${theme.headerSizes.mobile}px;
  right: 0;
  left: 0;
  border-top: 1px solid ${theme.primary};
  transition: ${theme.defaultTransition};
  text-align: left;
  font-size: ${theme.fonts.sizes.default}px;
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
    display: flex;
  
    > div:not(:last-child) {
      flex: 0 1 auto;
    }
  `}
`;

export const HeaderMenuWrapper = styled.div``;
