// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';
import PreferencesForm from './PreferencesForm';

const Container = Styled.View.extend`
  padding: 30px;
  background-color: ${colors.gray16};
`;

const PreferencesSection = ({ user }) => (
  <Container>
    <PreferencesForm user={user} />
  </Container>
);

export default PreferencesSection;
