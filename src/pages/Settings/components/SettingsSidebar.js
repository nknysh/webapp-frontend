// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';
import SettingsLink from './SettingsLink';

const Container = Styled.View.extend`
  width: 350px;
`;

const Content = Styled.View.extend`
  margin-top: 20px;
`;

const Title = Styled.H4.extend`
  color: ${colors.gold10};
`;

const SettingsSidebar = ({ user }) => (
  <Container>
    <Title>Account Settings</Title>
    <Content>
      <SettingsLink
        to="/settings/profile"
        text="PROFILE DETAILS"
      />
      <SettingsLink
        to="/settings/notifications"
        text="NOTIFICATION PREFERENCES"
      />
      <SettingsLink
        to="/settings/company"
        text="COMPANY DETAILS"
      />
      <SettingsLink
        to="/settings/travel-agents"
        text="COMPANY TRAVEL AGENTS"
      />
      <SettingsLink
        to="/settings/preferences"
        text="PREFERENCES"
      />
    </Content>
  </Container>
);

export default SettingsSidebar;
