import React from 'react';
import { map } from 'ramda';

import { propTypes, defaultProps } from './Menu.props';
import { Links, MenuLink } from './Menu.styles';

const renderLink = ({ title, href, inverse, bold }) => {
  return (
    title &&
    href && (
      <MenuLink bold={bold} inverse={inverse} key={href} spaced to={href}>
        {title}
      </MenuLink>
    )
  );
};

const renderLinks = map(renderLink);

export const Menu = ({ align, className, links }) => (
  <Links align={align} className={className}>
    {renderLinks(links)}
  </Links>
);

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

export default Menu;
