import { connect } from 'react-redux';
import { pipe } from 'ramda';

import { getAuthStatus, getAuthError, authCheck } from 'store/modules/auth';
import { updateUser, getUsersStatus } from 'store/modules/users';

export const mapStateToProps = state => ({
  authStatus: getAuthStatus(state),
  usersStatus: getUsersStatus(state),
  error: getAuthError(state),
});

export const mapDispatchToProps = dispatch => ({
  fetchMe: pipe(authCheck, dispatch),
  updateMe: pipe(updateUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
