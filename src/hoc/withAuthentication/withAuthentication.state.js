import { connect } from 'react-redux';
import { getAuthStatus, getAuthToken, isAuthenticated, getCurrentUser } from 'store/modules/auth/selectors';

import { Status } from 'store/common';

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  isAuthLoading: getAuthStatus(state) === Status.LOADING,
  currentUser: getCurrentUser(state),
  token: getAuthToken(state),
});

export default connect(mapStateToProps);
