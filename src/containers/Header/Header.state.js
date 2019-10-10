import { connect } from 'react-redux';

import { getUiHeaderMenu } from 'store/modules/ui';
import { getLoggedIn, isSR } from 'store/modules/auth';

export const mapStateToProps = state => ({
  isSR: isSR(state),
  menu: getUiHeaderMenu(state),
  loggedIn: getLoggedIn(state),
});

export default connect(mapStateToProps);
