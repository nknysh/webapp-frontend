import React from 'react';
import { Redirect } from 'react-router-dom';
import { compose } from 'ramda';

import { withAuthentication } from 'hoc';

import { Loader } from 'components/elements';

import { propTypes, defaultProps } from './Logout.props';

export const Logout = ({ token, logOut }) => {
  if (!token) return <Redirect to="/login" />;

  logOut(token);
  return <Loader text="Logging out..." />;
};

Logout.propTypes = propTypes;
Logout.defaultProps = defaultProps;

export default compose(withAuthentication)(Logout);
