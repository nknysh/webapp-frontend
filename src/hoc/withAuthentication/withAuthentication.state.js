import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { isActive, isSuccess } from 'store/common';
import {
  logOut,
  getAuthStatus,
  getAuthToken,
  isAuthenticated,
  authCheck,
  getCurrentUserType,
} from 'store/modules/auth';

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  isAuthActive: isActive(getAuthStatus(state)),
  isAuthSuccess: isSuccess(getAuthStatus(state)),
  authStatus: getAuthStatus(state),
  role: getCurrentUserType(state),
  token: getAuthToken(state),
});

const mapDispatchToProps = dispatch => ({
  logOut: pipe(logOut, dispatch),
  authCheck: pipe(authCheck, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
