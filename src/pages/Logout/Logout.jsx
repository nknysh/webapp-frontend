import React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'ramda';
import { useTranslation } from 'react-i18next';

import { withAuthentication } from 'hoc';
import { Loader } from 'components/elements';

import { propTypes, defaultProps } from './Logout.props';

export const Logout = ({ token, logOut }) => {
  const { t } = useTranslation();
  if (!token) return <Redirect to="/login" />;

  logOut(token);
  return <Loader text={t('messages.loggingOut')} />;
};

Logout.propTypes = propTypes;
Logout.defaultProps = defaultProps;

export default compose(withAuthentication)(Logout);
