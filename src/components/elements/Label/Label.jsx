import React from 'react';
import PropTypes from 'prop-types';

import { Text, StyledLabel } from './Label.styles';

const Label = ({ children, ...props }) => (
  <StyledLabel {...props}>
    <Text>{children}</Text>
  </StyledLabel>
);

Label.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
};

export default Label;
