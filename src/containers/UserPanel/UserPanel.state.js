import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { logOut } from 'store/modules/auth/actions';
import { getAuthStatus, getAuthError } from 'store/modules/auth/selectors';

export const mapStateToProps = state => ({
  requestStatus: getAuthStatus(state),
  error: getAuthError(state),
});

export const mapDispatchToProps = dispatch => ({
  onLogout: pipe(
    logOut,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
