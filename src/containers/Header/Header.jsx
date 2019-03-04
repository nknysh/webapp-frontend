import React, { useState } from 'react';
import { compose, lensProp, set, view, pipe, values } from 'ramda';

import loggedOutMenuLinks from 'config/links/header--logged-out';

import { Modal } from 'components';
import { CreateAccountForm } from 'containers';
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

  return (
    <StyledHeader className={className}>
      <HeaderContainer>
        <HeaderLogo to="/">{logo && <img src={logo} />}</HeaderLogo>
        <HeaderMenuArea>
          <HeaderMobileMenuButton onClick={onClickToggle}>menu</HeaderMobileMenuButton>
          {isAuthenticated ? (
            <HeaderMenu
              isOpen={menuOpen}
              align="end"
              links={menu}
              currentPath={currentPath}
              onLinkClick={onLinkClick}
            />
          ) : (
            <HeaderMenu isOpen={menuOpen} align="end" links={getLoggedOutLinks(loggedOutMenuLinks)} />
          )}
        </HeaderMenuArea>
      </HeaderContainer>

      {!isAuthenticated && (
        <Modal open={modalOpen} onClose={onClose} onBackdropClick={onClose} onEscapeKeyDown={onClose}>
          {modalContext === 'signup' && <CreateAccountForm />}
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
