// Libraries
import React from 'react';

// App
import { colors } from 'styles';

// Components
import Styled from '../Styled';

const Container = Styled.View.extend`
  flex-direction: row;
  align-items: center;
`;

const Text = Styled.H8.extend`
  margin-left: 5px;
  color: ${colors.gold10};
`;

const RadioButton = ({ name, placeholder, value, onChange, onBlur, style }) => (
  <Container>
    <input
      type="radio"
      name={name}
      checked={value}
      onChange={onChange}
    />
    <Text
      style={style}
    >
      {placeholder}
    </Text>
  </Container>
);

export default RadioButton;
