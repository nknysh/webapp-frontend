import React from 'react';
import { map } from 'ramda';

import { propTypes, defaultProps } from './Menu.props';
import { Links, MenuLink } from './Menu.styles';

export const Menu = ({ links, onLinkClick, currentPath, ...props }) => {
  const renderLink = ({ title, href, ...props }) => {
    return (
      title &&
      href && (
        <MenuLink data-active={href === currentPath} key={href} spaced to={href} onClick={onLinkClick} {...props}>
          {title}
        </MenuLink>
      )
    );
  };

  const renderLinks = map(renderLink);

  return <Links {...props}>{renderLinks(links)}</Links>;
};

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
