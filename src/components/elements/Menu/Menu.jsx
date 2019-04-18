import React from 'react';
import { map } from 'ramda';
import hash from 'object-hash';

import { propTypes, defaultProps } from './Menu.props';
import { Links, MenuLink } from './Menu.styles';

export const Menu = ({ children, links, onLinkClick, currentPath, ...props }) => {
  const renderLink = ({ title, href, ...props }) => {
    return (
      title && (
        <MenuLink
          data-active={href === currentPath}
          key={hash({ title, href })}
          spaced
          to={href}
          onClick={onLinkClick}
          {...props}
        >
          {title}
        </MenuLink>
      )
    );
  };

  const renderLinks = map(renderLink);

  return (
    <Links {...props}>
      {renderLinks(links)}
      {children}
    </Links>
  );
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
