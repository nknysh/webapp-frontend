import React from 'react';
import { map, equals, partial, omit } from 'ramda';
import hash from 'object-hash';

import { propTypes, defaultProps } from './Menu.props';
import { Links, MenuLink } from './Menu.styles';

const renderLink = ({ currentPath, onLinkClick }, { title, href, hard, ...props }) => {
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

const renderLinks = ({ links, ...props }) => map(partial(renderLink, [props]), links);

export const Menu = ({ children, ...props }) => (
  <Links {...omit(['onLinkClick'], props)}>
    {renderLinks(props)}
    {children}
  </Links>
);

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
