import { connect } from 'react-redux';
import { pipe } from 'ramda';
import { setToken, getCurrentUser } from 'store/modules/auth';
import { resetStatuses } from 'store/common';

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
