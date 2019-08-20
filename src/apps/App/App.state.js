import { connect } from 'react-redux';
import { pipe } from 'ramda';
import { resetStatuses, pageChange } from 'store/common';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  resetStatuses: pipe(
    resetStatuses,
    dispatch
  ),
  pageChange: pipe(
    pageChange,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
