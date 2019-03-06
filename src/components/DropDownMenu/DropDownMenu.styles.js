import styled from 'styled-components';
import { MenuList, MenuItem, Popper, Icon } from '@material-ui/core';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const Button = styled.span`
  cursor: pointer;
`;

export const Area = styled.div`
  min-width: 170px;
  ${breakpoints.tablet`
    background: ${theme.backgroundColor};
    box-shadow: ${theme.boxShadow};
  `}
`;

export const MaterialMenuList = styled(MenuList)`
  font-family: ${theme.defaultFont} !important;
  margin: 0 !important;
  padding: 0 !important;
`;
export const MaterialMenuItem = styled(MenuItem)`
  font-family: ${theme.defaultFont} !important;
  font-size: 12px !important;
  border-bottom: 1px solid ${theme.borderColor} !important;
  margin: 0 ${theme.gutter / 2}px !important;
  padding: ${theme.gutter}px !important;
  text-transform: uppercase;

  &:hover {
    background: none !important;
  }

  &:last-child {
    border: 0 !important;
  }

  ${breakpoints.tablet`
    font-size: 14px !important;
  `}
`;

export const MaterialPopper = styled(Popper)`
  position: relative !important;
  right: 0;
  left: unset !important;
  width: 100%;

  ${breakpoints.tablet`
    position: absolute !important;
    top: ${theme.gutter * 4}px !important;
    width: auto;
  `}
`;

export const MaterialIcon = styled(Icon)`
  position: absolute;
  right: 0;
  font-size: 13px !important;
  opacity: 1;
  top: ${theme.gutter + theme.gutter / 2}px;

  ${breakpoints.tablet`
    top: ${theme.gutter - 1}px;
  `}
`;
