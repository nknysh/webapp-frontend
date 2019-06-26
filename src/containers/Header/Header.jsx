import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { compose, lensProp, set, view, pipe, values, path, prop } from 'ramda';
import { useTranslation } from 'react-i18next';

import headerLinks from 'config/links/header';

import { Modal } from 'components';
import { useModalState } from 'effects';
import { withAuthentication } from 'hoc';

import CreateAccountForm from 'containers/CreateAccountForm';
import LoginForm from 'containers/LoginForm';
import UserPanel from 'containers/UserPanel';

import logo from 'public/assets/img/main-logo.png';

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
  const { t } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalContext, setModalContext] = useState('');
  const { modalOpen, onModalOpen, onModalClose } = useModalState(false);

  const loggedOutMenuLinks = prop('loggedOut', headerLinks);

  const onClickToggle = () => setMenuOpen(!menuOpen);

  const onClose = () => {
    setModalContext('');
    onModalClose();
  };

  const onCreateClick = () => {
    setMenuOpen(false);
    setModalContext(contextTypes.SIGN_UP);
    onModalOpen();
  };

  const onLoginClick = () => {
    setMenuOpen(false);
    setModalContext(contextTypes.LOGIN);
    onModalOpen();
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
    onLinkClick: () => {
      onModalClose();
      setMenuOpen(false);
    },
    currentPath: currentPath,
    align: 'end',
    links: isAuthenticated ? menu : loggedOutMenu,
  };

  const onFormComplete = () => {
    onModalClose();
    setMenuOpen(false);
  };

  const shouldRedirectHome = isAuthenticated && currentPath === path(['createAccount', 'href'], loggedOutMenuLinks);

  if (shouldRedirectHome) return <Redirect to="/" />;

  return (
    <StyledHeader className={className}>
      <HeaderContainer>
        <HeaderLogo to="/">{logo && <img src={logo} alt={t('title')} />}</HeaderLogo>
        <HeaderMenuArea>
          <HeaderMobileMenuButton onClick={onClickToggle}>menu</HeaderMobileMenuButton>
          <HeaderMenu {...headerMenuProps}>
            <UserPanel />
          </HeaderMenu>
        </HeaderMenuArea>
      </HeaderContainer>

      {!isAuthenticated && (
        <Modal open={modalOpen} onClose={onClose}>
          {modalContext === contextTypes.SIGN_UP && <CreateAccountForm onComplete={onFormComplete} />}
          {modalContext === contextTypes.LOGIN && <LoginForm onComplete={onFormComplete} />}
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
