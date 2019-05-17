import { connect } from 'react-redux';
import { pipe } from 'ramda';
import { setToken } from 'store/modules/auth/actions';
import { resetStatuses } from 'store/common/actions';
import { getCurrentUser } from 'store/modules/auth/selectors';

export const mapStateToProps = state => ({
  currentUser: getCurrentUser(state),
});

export const mapDispatchToProps = dispatch => ({
  setToken: pipe(
    setToken,
    dispatch
  ),
  resetStatuses: pipe(
    resetStatuses,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
