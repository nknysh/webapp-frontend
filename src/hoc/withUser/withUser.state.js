import { connect } from 'react-redux';

import { isSR, isRL, getCurrentUser } from 'store/modules/auth';

const mapStateToProps = state => ({
  isSr: isSR(state),
  isRl: isRL(state),
  user: getCurrentUser(state),
});

export default connect(mapStateToProps);
