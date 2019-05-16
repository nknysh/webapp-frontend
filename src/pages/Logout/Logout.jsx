import React from 'react';
import { compose } from 'ramda';

import { withAuthentication } from 'hoc';

import { Loader } from 'components/elements';

import { propTypes, defaultProps } from './Logout.props';

export const Logout = ({ token, logOut }) => {
  logOut(token);
  return <Loader text="Logging out..." />;
};

Logout.propTypes = propTypes;
Logout.defaultProps = defaultProps;

export default compose(withAuthentication)(Logout);
