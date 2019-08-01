import React, { forwardRef } from 'react';
import { Formik } from 'formik';
import { mapObjIndexed, values, partialRight, path } from 'ramda';

import { getFormPath } from 'utils';

import FormField from 'components/elements/FormField';
import FormFieldError from 'components/elements/FormFieldError';

import { propTypes, defaultProps } from './Form.props';
import { ServerErrorContent } from './Form.styles';

const renderFormError = content => <ServerErrorContent>{content}</ServerErrorContent>;

const renderError = error => error && <FormFieldError>{error}</FormFieldError>;

const renderField = (name, value, field, { handleChange, handleBlur, errors }, checked) => (
  <FormField
    name={name}
    value={value}
    checked={checked}
    onChange={handleChange}
    onBlur={handleBlur}
    error={path(getFormPath(name), errors)}
    {...field}
  />
);

const renderFields = (field, name, formProps) => renderField(name, undefined, field, formProps);

export const Form = forwardRef(({ children, fields, ...props }, ref) => (
  <Formik ref={ref} {...props}>
    {({ handleSubmit, ...formProps }) => (
      <form onSubmit={handleSubmit}>
        {children(formProps)}
        {values(mapObjIndexed(partialRight(renderFields, [formProps]), fields))}
      </form>
    )}
  </Formik>
));

Form.displayName = 'Form';
Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

Form.renderField = renderField;
Form.renderFieldError = renderError;
Form.renderFormError = renderFormError;

export default Form;
