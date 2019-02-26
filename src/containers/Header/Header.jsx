import React from 'react';
import { compose } from 'ramda';

import { Menu } from 'components/Menu';
import { Link } from 'components/Link';
import { withAuthentication } from 'hoc/withAuthentication';

import logo from './assets/header-logo.png';

import { propTypes } from './Header.props';
import connect from './Header.state';
import { HeaderContainer, StyledHeader } from './Header.styles';

export const Header = ({ menu, className }) => (
  <StyledHeader className={className}>
    <HeaderContainer>
      <Link to="/">{logo && <img src={logo} />}</Link>
      <Menu align="end" links={menu} />
    </HeaderContainer>
  </StyledHeader>
);

Header.propTypes = propTypes;

export default compose(
  withAuthentication,
  connect
)(Header);
