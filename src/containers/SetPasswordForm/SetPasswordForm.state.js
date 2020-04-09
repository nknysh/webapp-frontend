import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { setPassword, getAuthStatus, getAuthError } from 'store/modules/auth';

export const mapStateToProps = state => ({
  requestStatus: getAuthStatus(state),
  error: getAuthError(state),
});

export const mapDispatchToProps = dispatch => ({
  onSetPassword: pipe(setPassword, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
