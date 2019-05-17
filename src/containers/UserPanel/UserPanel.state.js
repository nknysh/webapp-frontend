import { connect } from 'react-redux';
import { getAuthStatus, getAuthError, getCurrentUser } from 'store/modules/auth/selectors';

export const mapStateToProps = state => ({
  requestStatus: getAuthStatus(state),
  error: getAuthError(state),
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps);
