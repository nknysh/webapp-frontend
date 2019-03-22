import { connect } from 'react-redux';
import { pipe } from 'ramda';
import { setToken } from 'store/modules/auth/actions';
import { resetStatuses } from 'store/common/actions';

export const mapStateToProps = () => ({});

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
