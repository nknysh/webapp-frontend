import { connect } from 'react-redux';
import { getAuthStatus, isAuthenticated, getCurrentUser } from 'store/modules/auth/selectors';

import { Status } from 'store/common';

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  isAuthLoading: getAuthStatus(state) === Status.LOADING,
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps);
