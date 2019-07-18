import React, { useState, useCallback } from 'react';
import { isEmpty, partial } from 'ramda';

import { useCurrentWidth } from 'effects';
import { mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './Sidebar.props';
import { StyledSidebar, SidebarTitle, SidebarLinks, SidebarLink, SidebarChildren, SidebarIcon } from './Sidebar.styles';

const renderIcon = ({ isMobile, hasLinks, isOpen }) =>
  isMobile && hasLinks && <SidebarIcon>{isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</SidebarIcon>;

const renderTitle = ({ title, onToggle, isOpen, isMobile }) =>
  title && (
    <SidebarTitle onClick={onToggle}>
      {title}
      {renderIcon(isOpen, isMobile)}
    </SidebarTitle>
  );

const renderLink = ({ onClick }, link, i) => (
  <SidebarLink key={i} onClick={onClick}>
    {link}
  </SidebarLink>
);

const renderLinks = ({ hasLinks, isOpen, links, onClick }) =>
  hasLinks && <SidebarLinks isOpen={isOpen}>{mapWithIndex(partial(renderLink, [{ onClick }]), links)}</SidebarLinks>;

const renderChildren = ({ children, onClick, isOpen }) =>
  children && (
    <SidebarChildren onClick={onClick} isOpen={isOpen}>
      {children}
    </SidebarChildren>
  );

export const Sidebar = ({ title, links, isOpen: isOpenProp, children, ...props }) => {
  const { isMobile } = useCurrentWidth();
  const [isOpen, setIsOpen] = useState(isOpenProp);

  const onToggle = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const onClick = useCallback(() => setIsOpen(false), []);

  const hasLinks = !isEmpty(links) || children;

  return (
    <StyledSidebar {...props}>
      {renderTitle({ title, onToggle, isOpen, isMobile })}
      {renderLinks({ hasLinks, isOpen, links, onClick })}
      {renderChildren({ children, onClick, isOpen })}
    </StyledSidebar>
  );
};

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
