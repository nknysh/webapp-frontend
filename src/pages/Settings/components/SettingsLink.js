// Libraries
import React from 'react';
import { Link } from 'react-router-dom';

// App
import { colors } from 'styles';

// Components
import { Styled } from 'components';

const Container = Styled.View.extend`
`;

const Line = Styled.View.extend`
  height: 1px;
  background-color: ${colors.gray14};
`;

const Text = Styled.H7.extend`
  color: ${colors.gold10};
`;

const SettingsLink = ({ to, text }) => (
  <Container>
    <Line />
    <Link
      to={to}
      style={{
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Text>{text}</Text>
    </Link>
  </Container>
);

export default SettingsLink;
