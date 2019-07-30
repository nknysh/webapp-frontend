import { connect } from 'react-redux';

import { isSR, getCurrentUser } from 'store/modules/auth';

const mapStateToProps = state => ({
  isSr: isSR(state),
  user: getCurrentUser(state),
});

export default connect(mapStateToProps);
