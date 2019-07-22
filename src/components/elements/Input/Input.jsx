import React, { forwardRef } from 'react';

import { propTypes, defaultProps } from './Input.props';
import { StyledInput } from './Input.styles';

export const Input = forwardRef((props, ref) => <StyledInput ref={ref} {...props} />);

Input.displayName = 'Input';
Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
