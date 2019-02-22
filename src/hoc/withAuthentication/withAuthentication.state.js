import { connect } from 'react-redux';
import { isAuthLoading, isAuthenticated, getCurrentUser } from 'store/modules/auth/selectors';

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  isAuthLoading: isAuthLoading(state),
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps);
