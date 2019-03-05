import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { logIn } from 'store/modules/auth/actions';
import { getAuthStatus, getAuthError } from 'store/modules/auth/selectors';

export const mapStateToProps = state => ({
  requestStatus: getAuthStatus(state),
  error: getAuthError(state),
});

export const mapDispatchToProps = dispatch => ({
  onLogin: pipe(
    logIn,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
