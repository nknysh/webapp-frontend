import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { isLoading } from 'store/common';
import { logOut, getAuthStatus, getAuthToken, isAuthenticated } from 'store/modules/auth';

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  isAuthLoading: isLoading(getAuthStatus(state)),
  token: getAuthToken(state),
});

const mapDispatchToProps = dispatch => ({
  logOut: pipe(
    logOut,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
