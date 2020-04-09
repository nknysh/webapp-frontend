import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { signUp, getAuthStatus, getAuthError } from 'store/modules/auth';

export const mapStateToProps = state => ({
  requestStatus: getAuthStatus(state),
  error: getAuthError(state),
});

export const mapDispatchToProps = dispatch => ({
  onSignUp: pipe(signUp, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
