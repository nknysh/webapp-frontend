import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getAuthStatus, getAuthError, authCheck, updatePassword } from 'store/modules/auth';
import { getUsersStatus } from 'store/modules/users';

export const mapStateToProps = state => ({
  authStatus: getAuthStatus(state),
  usersStatus: getUsersStatus(state),
  error: getAuthError(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchMe: pipe(authCheck, dispatch),
  updatePassword: pipe(updatePassword, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
