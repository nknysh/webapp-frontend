// Libraries
import React from 'react';

// Components
import { SettingsPage } from '../components';
import { CompanySection } from './components';

const Company = () => (
  <SettingsPage>
    {({ user }) => (
      <CompanySection user={user} />
    )}
  </SettingsPage>
);

export default Company;
