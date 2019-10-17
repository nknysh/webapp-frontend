import React, { useState, useCallback } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { compose, lensProp, set, view, pipe, values, path, prop, propOr, defaultTo } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Modal } from '@pure-escapes/webapp-ui-components';

import headerLinks from 'config/links/header';
import { parseQueryString } from 'utils';

import { useModalState, useEffectBoundary } from 'effects';
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

const originRedirect = pipe(
  parseQueryString,
  propOr('', 'origin'),
  decodeURIComponent
);

export const Header = ({
  menu,
  className,
  currentPath,
  isAuthenticated,
  loggedIn,
  history,
  location: { search },
  isSR,
}) => {
  const { t } = useTranslation();

  useEffectBoundary(() => {
    if (loggedIn) {
      const redirect = isSR ? '/' : defaultTo('/', originRedirect(search));
      history.replace(redirect);
    }
  }, [loggedIn, isSR]);

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalContext, setModalContext] = useState('');
  const { modalOpen, onModalOpen, onModalClose } = useModalState(false);

  const loggedOutMenuLinks = prop('loggedOut', headerLinks);

  const onClickToggle = useCallback(() => setMenuOpen(!menuOpen), [menuOpen]);

  const onClose = useCallback(() => {
    setModalContext('');
    onModalClose();
  }, [onModalClose]);

  const onCreateClick = useCallback(() => {
    setMenuOpen(false);
    setModalContext(contextTypes.SIGN_UP);
    onModalOpen();
  }, [onModalOpen]);

  const onLoginClick = useCallback(() => {
    setMenuOpen(false);
    setModalContext(contextTypes.LOGIN);
    onModalOpen();
  }, [onModalOpen]);

  const onHeaderLinkClick = useCallback(() => {
    onModalClose();
    setMenuOpen(false);
  }, [onModalClose]);

  const onCreateFormComplete = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const onLoginFormComplete = useCallback(() => {
    onModalClose();
    setMenuOpen(false);
  }, [onModalClose]);

  // Derives logged out menu links so they have no path
  // and trigger a modal instead
  const loggedOutMenu = pipe(
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
  )(loggedOutMenuLinks);

  const headerMenuProps = {
    isOpen: menuOpen,
    onLinkClick: onHeaderLinkClick,
    currentPath: currentPath,
    align: 'end',
    links: isAuthenticated ? menu : loggedOutMenu,
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
          {modalContext === contextTypes.SIGN_UP && <CreateAccountForm onComplete={onCreateFormComplete} />}
          {modalContext === contextTypes.LOGIN && <LoginForm onComplete={onLoginFormComplete} />}
        </Modal>
      )}
    </StyledHeader>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  withRouter,
  connect
)(Header);
