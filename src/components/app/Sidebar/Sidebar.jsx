import React, { useState } from 'react';
import { isEmpty } from 'ramda';

import { useCurrentWidth } from 'effects';
import { mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './Sidebar.props';
import { StyledSidebar, SidebarTitle, SidebarLinks, SidebarLink, SidebarChildren, SidebarIcon } from './Sidebar.styles';

export const Sidebar = ({ title, links, isOpen: isOpenProp, children, ...props }) => {
  const { isMobile } = useCurrentWidth();
  const [isOpen, setIsOpen] = useState(isOpenProp);

  const onToggle = () => setIsOpen(!isOpen);
  const onClick = () => setIsOpen(false);

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

  const renderLink = (link, i) => (
    <SidebarLink key={i} onClick={onClick}>
      {link}
    </SidebarLink>
  );

  const renderLinks = () => hasLinks && <SidebarLinks isOpen={isOpen}>{mapWithIndex(renderLink, links)}</SidebarLinks>;

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
