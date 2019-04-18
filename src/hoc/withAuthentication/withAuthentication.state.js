import { connect } from 'react-redux';
import { getAuthStatus, getAuthToken, isAuthenticated } from 'store/modules/auth/selectors';
import { isLoading } from 'store/common';

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticated(state),
  isAuthLoading: isLoading(getAuthStatus(state)),
  token: getAuthToken(state),
});

export default connect(mapStateToProps);
