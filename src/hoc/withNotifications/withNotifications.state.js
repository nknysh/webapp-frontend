import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { getUiNotifications } from 'store/modules/ui/selectors';
import { removeNotification, enqueueNotification } from 'store/modules/ui/actions';

export const mapStateToProps = state => ({
  notifications: getUiNotifications(state),
});

export const mapDispatchToProps = dispatch => ({
  enqueueNotification: pipe(
    enqueueNotification,
    dispatch
  ),
  removeNotification: pipe(
    removeNotification,
    dispatch
  ),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
);
