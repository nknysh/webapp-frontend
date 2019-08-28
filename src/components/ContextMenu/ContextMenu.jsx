import React from 'react';

import { propTypes, defaultProps } from './ContextMenu.props';
import { DropDownMenu, MenuIcon } from './ContextMenu.styles';

export const ContextMenu = ({ children, title, className }) => (
  <DropDownMenu className={className} showArrow={false} title={title || <MenuIcon>more_vert</MenuIcon>}>
    {children}
  </DropDownMenu>
);

ContextMenu.propTypes = propTypes;
ContextMenu.defaultProps = defaultProps;

export default ContextMenu;
