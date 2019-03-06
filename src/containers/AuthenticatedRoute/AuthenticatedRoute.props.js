import PropTypes from 'prop-types';

import { propTypes as withAuthPropTypes } from 'hoc/withAuthentication';

export const propTypes = {
  ...withAuthPropTypes,
  auth: PropTypes.bool,
  isAuthLoading: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  authRedirect: PropTypes.string,
  authComponent: PropTypes.any,
};

export const defaultProps = {};
