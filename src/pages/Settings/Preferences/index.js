// Libraries
import React from 'react';

// Components
import { SettingsPage } from '../components';
import { PreferencesSection } from './components';

const Preferences = () => (
  <SettingsPage>
    {({ user }) => (
      <PreferencesSection user={user} />
    )}
  </SettingsPage>
);

export default Preferences;
