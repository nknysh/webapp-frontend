import { connect } from 'react-redux';
import { isAuthLoading, isAuthenticated, getCurrentUser } from 'selectors/auth';

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  isAuthLoading: isAuthLoading(state),
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps);
