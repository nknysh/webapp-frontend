// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';
import ProfileForm from './ProfileForm';

const Container = Styled.View.extend`
  padding: 30px;
  background-color: ${colors.gray16};
`;

const Line = Styled.View.extend`
  height: 1px;
  background-color: ${colors.gray14};
`;

const Section = Styled.View.extend`
  flex-direction: row;
  margin-vertical: 50px;
`;

const Column = Styled.View.extend`
  width: 400px;
`;

const Title = Styled.H5.extend`
  color: ${colors.gold10};
`;

const Value = Styled.H8.extend`
  margin-top: 15px;
`;

// TODO(mark): Render actual sales representative.
const ProfileSection = ({ user }) => (
  <Container>
    <ProfileForm user={user} />
    <Line />
    <Section>
      <Column>
        <Title>Your Pure Escapes sales representative</Title>
        <Value>Sally Smith</Value>
      </Column>
      <Column>
        <Title>Your account status</Title>
        <Value>{user.status}</Value>
      </Column>
    </Section>
  </Container>
);

export default ProfileSection;
