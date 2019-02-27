import { connect } from 'react-redux';

import { getUiFooterMenu } from 'store/modules/ui/selectors';

export const mapStateToProps = state => ({
  menu: getUiFooterMenu(state),
});

export default connect(mapStateToProps);
