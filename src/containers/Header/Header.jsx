import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { compose, lensProp, set, view, pipe, values, path } from 'ramda';

import loggedOutMenuLinks from 'config/links/header--logged-out';

import { Modal } from 'components';
import { CreateAccountForm, LoginForm } from 'containers';
import { withAuthentication } from 'hoc/withAuthentication';

import logo from 'public/img/main-logo.png';

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

const createLinkLens = lensProp('createAccount');
const loginLinkLens = lensProp('login');

export const Header = ({ menu, className, currentPath, isAuthenticated }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContext, setModalContext] = useState('');

  const onClickToggle = () => setMenuOpen(!menuOpen);
  const onLinkClick = () => setMenuOpen(false);

  const onClose = () => {
    setModalContext('');
    setModalOpen(false);
  };

  const onCreateClick = () => {
    setModalContext('signup');
    setModalOpen(true);
  };

  const onLoginClick = () => {
    setModalContext('login');
    setModalOpen(true);
  };

  // Derives logged out menu links so they have no path
  // and trigger a modal instead
  const getLoggedOutLinks = pipe(
    set(createLinkLens, {
      ...view(createLinkLens, loggedOutMenuLinks),
      onClick: onCreateClick,
      href: '',
      ['data-active']: modalContext === 'signup',
    }),
    set(loginLinkLens, {
      ...view(loginLinkLens, loggedOutMenuLinks),
      onClick: onLoginClick,
      href: '',
      ['data-active']: modalContext === 'login',
    }),
    values
  );

  const loggedOutMenu = getLoggedOutLinks(loggedOutMenuLinks);

  const headerMenuProps = {
    isOpen: menuOpen,
    currentPath: currentPath,
    onLinkClick,
    align: 'end',
    links: isAuthenticated ? menu : loggedOutMenu,
  };

  const shouldRedirectHome =
    isAuthenticated &&
    (currentPath === path(['createAccount', 'href'], loggedOutMenuLinks) ||
      currentPath === path(['login', 'href'], loggedOutMenuLinks));

  if (shouldRedirectHome) return <Redirect to="/" />;

  return (
    <StyledHeader className={className}>
      <HeaderContainer>
        <HeaderLogo to="/">{logo && <img src={logo} />}</HeaderLogo>
        <HeaderMenuArea>
          <HeaderMobileMenuButton onClick={onClickToggle}>menu</HeaderMobileMenuButton>
          <HeaderMenu {...headerMenuProps} />
        </HeaderMenuArea>
      </HeaderContainer>

      {!isAuthenticated && (
        <Modal open={modalOpen} onClose={onClose} onBackdropClick={onClose} onEscapeKeyDown={onClose}>
          {modalContext === 'signup' && <CreateAccountForm />}
          {modalContext === 'login' && <LoginForm />}
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
