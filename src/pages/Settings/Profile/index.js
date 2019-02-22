// Libraries
import React from 'react';

// Components
import { SettingsPage } from '../components';
import { ProfileSection } from './components';

const Profile = () => <SettingsPage>{({ user }) => <ProfileSection user={user} />}</SettingsPage>;

export default Profile;
