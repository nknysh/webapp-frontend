import React from 'react';
import { map, equals } from 'ramda';
import hash from 'object-hash';

import { propTypes, defaultProps } from './Menu.props';
import { Links, MenuLink } from './Menu.styles';

export const Menu = ({ children, links, onLinkClick, currentPath, ...props }) => {
  const renderLink = ({ title, href, hard, ...props }) => {
    const link = hard ? { href } : { to: href };
    return (
      title && (
        <MenuLink
          data-active={equals(href, currentPath)}
          key={hash({ title, href })}
          spaced
          onClick={onLinkClick}
          {...link}
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
