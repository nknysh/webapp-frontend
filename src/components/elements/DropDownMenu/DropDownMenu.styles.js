import styled from 'styled-components';
import { MenuList, MenuItem, Popper, Icon } from '@material-ui/core';

import theme from 'styles/theme';

export const Button = styled.span`
  cursor: pointer;
`;

export const Area = styled.div`
  min-width: 170px;
  background: ${theme.backgrounds.default};
  box-shadow: ${theme.boxShadows.default};
`;

export const MaterialMenuList = styled(MenuList)`
  font-family: ${theme.fonts.defaultFont} !important;
  margin: 0 !important;
  padding: 0 !important;
`;

export const MaterialMenuItem = styled(MenuItem)`
  font-family: ${theme.fonts.defaultFont} !important;
  font-size: ${theme.fonts.sizes.normal}px !important;
  border-bottom: 1px solid ${theme.borders.default} !important;
  margin: 0 ${theme.gutter / 2}px !important;
  padding: ${theme.gutter}px !important;
  text-transform: uppercase;
  height: auto !important;

  &:hover {
    background: none !important;
  }

  &:last-child {
    border: 0 !important;
  }
`;

export const MaterialPopper = styled(Popper)`
  position: relative !important;
  right: 0;
  left: unset !important;
  position: absolute !important;
  top: ${theme.gutter * 4}px !important;
  width: auto;
  z-index: 900;
`;

export const MaterialIcon = styled(Icon)`
  position: absolute;
  right: 0;
  font-size: ${theme.fonts.sizes.less}px !important;
  opacity: 1;
  top: ${theme.gutter - 1}px;
`;
