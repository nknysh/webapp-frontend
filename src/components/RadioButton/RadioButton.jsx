import React from 'react';
import PropTypes from 'prop-types';

import { Container, Text } from './RadioButton.styles';

const RadioButton = ({ name, placeholder, value, onChange, style }) => (
  <Container>
    <input type="radio" name={name} checked={value} onChange={onChange} />
    <Text style={style}>{placeholder}</Text>
  </Container>
);

RadioButton.propTypes = {
  name: PropTypes.any,
  placeholder: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
  onBlur: PropTypes.any,
  style: PropTypes.any,
};

export default RadioButton;
