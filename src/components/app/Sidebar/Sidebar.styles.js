import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Heading1 } from 'styles/typography';

const doubleSpaced = theme.gutter * 2;
const sidebarGutter = `${doubleSpaced}px`;

const sidebarUl = css`
  background: ${theme.colors.white};
  box-shadow: ${theme.boxShadows.default};
  list-style: none;
  margin: 0;
  transition: ${theme.defaultTransition};
  position: absolute;
  left: -${sidebarGutter};
  right: -${sidebarGutter};
  padding: ${theme.gutter}px ${sidebarGutter};
  margin-top: -${doubleSpaced}px;

  ${({ isOpen }) =>
    !isOpen &&
    css`
      opacity: 0;
      pointer-events: none;
      padding-top: 0;
    `}

  ${breakpoints.tablet`
    box-shadow: 0 0 0;

    ${({ isOpen }) =>
      !isOpen &&
      css`
        opacity: 1;
        pointer-events: auto;
      `}
  `}
`;

const sidebarLi = css`
  padding: ${doubleSpaced}px 0;
  color: ${theme.primary};
  border-bottom: 1px solid ${theme.borders.medium};

  &:last-child {
    border-bottom: 0;
  }

  a {
    color: ${theme.primary};
    font-size: ${theme.fonts.sizes.link}px;
    text-transform: uppercase;
  }
`;

export const StyledSidebar = styled.div`
  position: relative;
`;

export const SidebarTitle = styled(Heading1)`
  border-bottom: 1px solid ${theme.borders.normal};
  position: relative;
  padding: ${theme.gutter}px ${sidebarGutter} ${doubleSpaced}px 0;
  margin: 0 0 ${doubleSpaced}px;
`;

export const SidebarLinks = styled.ul`
  ${sidebarUl}
`;

export const SidebarLink = styled.li`
  ${sidebarLi}
`;

// For prerendered lists
export const SidebarChildren = styled.div`
  ul {
    ${sidebarUl}

    li {
      ${sidebarLi}
    }
  }
`;

export const SidebarIcon = styled(Icon)`
  position: absolute;
  color: ${theme.colors['black-darker']} !important;
  font-size: ${theme.fonts.sizes.mid}px !important;
  right: 3px;
  top: ${theme.gutter + 7}px;
  transition: ${theme.defaultTransition};
`;