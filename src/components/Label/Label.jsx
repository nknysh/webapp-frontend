import React from 'react';
import PropTypes from 'prop-types';

import { Text } from './Label.styles';

const Label = ({ children, ...props }) => (
  <label {...props}>
    <Text>{children}</Text>
  </label>
);

Label.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export default Label;
