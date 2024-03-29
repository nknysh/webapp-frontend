import React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Loader } from '@pure-escapes/webapp-ui-components';

import { withAuthentication } from 'hoc';

import { propTypes, defaultProps } from './Logout.props';

export const Logout = ({ token, isAuthenticated, logOut }) => {
  const { t } = useTranslation();
  logOut(token);

  if (!isAuthenticated) return <Redirect to="/login" />;

  return <Loader text={t('messages.loggingOut')} />;
};

Logout.propTypes = propTypes;
Logout.defaultProps = defaultProps;

export default compose(withAuthentication)(Logout);
