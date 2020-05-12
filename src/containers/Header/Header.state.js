import { connect } from 'react-redux';

import { getUiHeaderMenu } from 'store/modules/ui';
import { getLoggedIn, isSR } from 'store/modules/auth';
import { pendingProposalsCountSelector } from 'store/modules/proposalsList/subdomains/pendingProposals/selectors';

export const mapStateToProps = state => ({
  isSR: isSR(state),
  menu: getUiHeaderMenu(state),
  loggedIn: getLoggedIn(state),
  pendingProposalsCount: pendingProposalsCountSelector(state),
});

export default connect(mapStateToProps);
