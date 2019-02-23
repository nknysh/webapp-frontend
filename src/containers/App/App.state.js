import { connect } from 'react-redux';
import { pipe } from 'ramda';
import { getUserFromToken } from 'store/modules/auth/actions';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  getUserFromToken: pipe(
    getUserFromToken,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
