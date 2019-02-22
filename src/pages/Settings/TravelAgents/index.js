// Libraries
import React from 'react';

// Components
import { SettingsPage } from '../components';
import { TravelAgentsSection } from './components';

const TravelAgents = () => <SettingsPage>{({ user }) => <TravelAgentsSection user={user} />}</SettingsPage>;

export default TravelAgents;
