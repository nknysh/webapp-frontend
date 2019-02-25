import React from 'react';

import { Container, Text } from './RadioButton.styles';

const RadioButton = ({ name, placeholder, value, onChange, onBlur, style }) => (
  <Container>
    <input type="radio" name={name} checked={value} onChange={onChange} />
    <Text style={style}>{placeholder}</Text>
  </Container>
);

export default RadioButton;
