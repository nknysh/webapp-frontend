import { memo, useState } from 'react';
import { forEach, append, compose, includes } from 'ramda';
import { withSnackbar } from 'notistack';

import { withNotifications } from 'hoc';
import { useEffectBoundary } from 'effects';

import { defaultProps, propTypes } from './Notifications.props';

const shouldUpdate = ({ notifications: oldNotifications = [] }, { notifications: newNotifications = [] }) => {
  let notExists = false;
  for (let i = 0; i < newNotifications.length; i += 1) {
    if (notExists) continue;
    notExists = notExists || !oldNotifications.filter(({ key }) => newNotifications[i].key === key).length;
  }

  return notExists;
};

export const Notifications = ({ notifications, enqueueSnackbar, removeNotification }) => {
  const [displayed, setDisplayed] = useState([]);

  useEffectBoundary(() => {
    forEach(({ key, message, options }) => {
      if (!key || includes(key, displayed)) return;

      enqueueSnackbar(message, options);
      setDisplayed(append(key, displayed));
      removeNotification(key);
    }, notifications);
  }, [notifications]);

  return null;
};

Notifications.defaultProps = defaultProps;
Notifications.propTypes = propTypes;

export default memo(
  compose(
    withSnackbar,
    withNotifications
  )(Notifications),
  shouldUpdate
);
