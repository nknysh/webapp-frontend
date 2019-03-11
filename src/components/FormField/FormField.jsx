import React from 'react';
import { omit } from 'ramda';

import { Label, FormFieldError } from 'components';

import { propTypes, defaultProps } from './FormField.props';
import { Field } from './FormField.styles';

export const FormField = ({ Component, name, label, props: componentProps, children, error, ...props }) => (
  <Field>
    <Label htmlFor={name}>{label}</Label>
    <Component name={name} {...omit(['default'], props)} {...componentProps}>
      {children}
    </Component>
    {error && <FormFieldError>{error}</FormFieldError>}
  </Field>
);

FormField.propTypes = propTypes;
FormField.defaultProps = defaultProps;

export default FormField;
