import React, { useState } from 'react';
import { map, isEmpty } from 'ramda';
import hash from 'object-hash';

import theme from 'styles/theme';
import { useCurrentWidth } from 'effects';

import { propTypes, defaultProps } from './Sidebar.props';
import { StyledSidebar, SidebarTitle, SidebarLinks, SidebarLink, SidebarChildren, SidebarIcon } from './Sidebar.styles';

export const Sidebar = ({ title, links, isOpen: isOpenProp, children, ...props }) => {
  const currentWidth = useCurrentWidth();
  const [isOpen, setIsOpen] = useState(isOpenProp);

  const onToggle = () => setIsOpen(!isOpen);
  const onClick = () => setIsOpen(false);

  const isMobile = currentWidth <= theme.breakpoints.tablet;
  const hasLinks = !isEmpty(links) || children;

  const renderIcon = () =>
    isMobile && hasLinks && <SidebarIcon>{isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</SidebarIcon>;

  const renderTitle = () =>
    title && (
      <SidebarTitle onClick={onToggle}>
        {title}
        {renderIcon(isOpen, isMobile)}
      </SidebarTitle>
    );

  const renderLink = link => (
    <SidebarLink key={hash(link)} onClick={onClick}>
      {link}
    </SidebarLink>
  );

  const renderLinks = () => hasLinks && <SidebarLinks isOpen={isOpen}>{map(renderLink, links)}</SidebarLinks>;

  const renderChildren = () =>
    children && (
      <SidebarChildren onClick={onClick} isOpen={isOpen}>
        {children}
      </SidebarChildren>
    );

  return (
    <StyledSidebar {...props}>
      {renderTitle()}
      {renderLinks()}
      {renderChildren()}
    </StyledSidebar>
  );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
