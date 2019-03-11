import React from 'react';

import { propTypes, defaultProps } from './Input.props';
import { StyledInput } from './Input.styles';

export const Input = props => <StyledInput {...props} />;

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
