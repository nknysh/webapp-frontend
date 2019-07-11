import { connect } from 'react-redux';

import { getUiHeaderMenu } from 'store/modules/ui';

export const mapStateToProps = state => ({
  menu: getUiHeaderMenu(state),
});

export default connect(mapStateToProps);
