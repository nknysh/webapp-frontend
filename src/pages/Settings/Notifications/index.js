// Libraries
import React from 'react';

// Components
import { SettingsPage } from '../components';
import { NotificationSection } from './components';

const Notifications = () => (
  <SettingsPage>
    {({ user }) => (
      <NotificationSection />
    )}
  </SettingsPage>
);

export default Notifications;
