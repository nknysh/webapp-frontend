import React from 'react';

import { propTypes, defaultProps } from './FormFieldError.props';
import { StyledFormFieldError } from './FormFieldError.styles';

export const FormFieldError = props => <StyledFormFieldError {...props} />;

FormFieldError.propTypes = propTypes;
FormFieldError.defaultProps = defaultProps;

export default FormFieldError;
