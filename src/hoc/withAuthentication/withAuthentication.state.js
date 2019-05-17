import { pipe } from 'ramda';
import { connect } from 'react-redux';
import { getAuthStatus, getAuthToken, isAuthenticated } from 'store/modules/auth/selectors';
import { logOut } from 'store/modules/auth/actions';
import { isLoading } from 'store/common';

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
