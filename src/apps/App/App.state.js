import { connect } from 'react-redux';
import { pipe } from 'ramda';
import { setToken } from 'store/modules/auth/actions';

export const mapStateToProps = () => ({});

export const mapDispatchToProps = dispatch => ({
  setToken: pipe(
    setToken,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
