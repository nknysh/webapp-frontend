import { connect } from 'react-redux';
import { pipe } from 'ramda';
import { resetStatuses, pageChange } from 'store/common';
import { bootstrapAppRequestAction } from 'store/modules/bootstrap/actions';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  resetStatuses: pipe(resetStatuses, dispatch),
  pageChange: pipe(pageChange, dispatch),
  bootstrapAppRequestAction: pipe(bootstrapAppRequestAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps);
