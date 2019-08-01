import { connect } from 'react-redux';
import { pipe } from 'ramda';
import { resetStatuses } from 'store/common';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  resetStatuses: pipe(
    resetStatuses,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
