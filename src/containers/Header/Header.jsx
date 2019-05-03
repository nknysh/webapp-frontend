import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { compose, lensProp, set, view, pipe, values, path } from 'ramda';

import loggedOutMenuLinks from 'config/links/header--logged-out';

import { Modal } from 'components';
import { CreateAccountForm, LoginForm, UserPanel } from 'containers';
import { withAuthentication } from 'hoc/withAuthentication';

import logo from 'public/img/main-logo.png';

import { propTypes, defaultProps, contextTypes } from './Header.props';
import connect from './Header.state';
import {
  HeaderContainer,
  StyledHeader,
  HeaderLogo,
  HeaderMenuArea,
  HeaderMenu,
  HeaderMobileMenuButton,
} from './Header.styles';

const createLinkLens = lensProp('createAccount');
const loginLinkLens = lensProp(contextTypes.LOGIN);

export const Header = ({ menu, className, currentPath, isAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('');

  const onClickToggle = () => setMenuOpen(!menuOpen);
  const onClickAway = () => setMenuOpen(false);

  const onClose = () => {
    setModalContext('');
    setModalOpen(false);
  };

  const onCreateClick = () => {
    setModalContext(contextTypes.SIGN_UP);
    setModalOpen(true);
  };

  const onLoginClick = () => {
    setModalContext(contextTypes.LOGIN);
    setModalOpen(true);
  };

  // Derives logged out menu links so they have no path
  // and trigger a modal instead
  const getLoggedOutLinks = pipe(
    set(createLinkLens, {
      ...view(createLinkLens, loggedOutMenuLinks),
      onClick: onCreateClick,
      href: '',
      ['data-active']: modalContext === contextTypes.SIGN_UP,
    }),
    set(loginLinkLens, {
      ...view(loginLinkLens, loggedOutMenuLinks),
      onClick: onLoginClick,
      href: '',
      ['data-active']: modalContext === contextTypes.LOGIN,
    }),
    values
  );

  const loggedOutMenu = getLoggedOutLinks(loggedOutMenuLinks);

  const headerMenuProps = {
    isOpen: menuOpen,
    onLinkClick: onClickAway,
    currentPath: currentPath,
    align: 'end',
    links: isAuthenticated ? menu : loggedOutMenu,
  };

  const shouldRedirectHome = isAuthenticated && currentPath === path(['createAccount', 'href'], loggedOutMenuLinks);

  if (shouldRedirectHome) return <Redirect to="/" />;

  return (
    <StyledHeader className={className}>
      <HeaderContainer>
        <HeaderLogo to="/">{logo && <img src={logo} />}</HeaderLogo>
        <HeaderMenuArea>
          <HeaderMobileMenuButton onClick={onClickToggle}>menu</HeaderMobileMenuButton>
          <HeaderMenu {...headerMenuProps}>
            <UserPanel />
          </HeaderMenu>
        </HeaderMenuArea>
      </HeaderContainer>

      {!isAuthenticated && (
        <Modal open={modalOpen} onClose={onClose}>
          {modalContext === contextTypes.SIGN_UP && <CreateAccountForm />}
          {modalContext === contextTypes.LOGIN && <LoginForm />}
        </Modal>
      )}
    </StyledHeader>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  connect
)(Header);
