import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import { withAuthentication } from 'hoc/withAuthentication';

import logo from './assets/header-logo.png';

import { propTypes, defaultProps } from './Header.props';
import connect from './Header.state';
import {
  HeaderContainer,
  StyledHeader,
  HeaderLogo,
  HeaderMenuArea,
  HeaderMenu,
  HeaderMobileMenuButton,
} from './Header.styles';

export const Header = ({ menu, className, location: { pathname } }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onClickToggle = () => setMenuOpen(!menuOpen);
  const onLinkClick = () => setMenuOpen(false);

  return (
    <StyledHeader className={className}>
      <HeaderContainer>
        <HeaderLogo to="/">{logo && <img src={logo} />}</HeaderLogo>
        <HeaderMenuArea>
          <HeaderMobileMenuButton onClick={onClickToggle}>menu</HeaderMobileMenuButton>
          <HeaderMenu isOpen={menuOpen} align="end" links={menu} currentLocation={pathname} onLinkClick={onLinkClick} />
        </HeaderMenuArea>
      </HeaderContainer>
    </StyledHeader>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  connect,
  withRouter
)(Header);
