import { pipe } from 'ramda';
import { connect } from 'react-redux';

import { getUiNotifications, removeNotification, enqueueNotification } from 'store/modules/ui';

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
