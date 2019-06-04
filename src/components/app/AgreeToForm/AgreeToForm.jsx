import React, { Fragment } from 'react';
import { path, prop } from 'ramda';

import { Form, FormField } from 'components/elements';

import { getFormPath } from 'utils';

import { fields, validation } from 'config/forms/agreeTo';

import { propTypes, defaultProps } from './AgreeToForm.props';
import { TransferForm } from './AgreeToForm.styles';

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

export const AgreeToForm = ({ children, renderSubmitButton, className, buttonLabel, ...props }) => (
  <TransferForm className={className}>
    {children}
    <Form validationSchema={validation} {...props}>
      {({ values, ...formProps }) => (
        <Fragment>
          {renderField(
            'agreeToTerms',
            undefined,
            prop('agreeToTerms', fields),
            formProps,
            prop('agreeToTerms', values)
          )}
          {renderSubmitButton(buttonLabel)}
        </Fragment>
      )}
    </Form>
  </TransferForm>
);

AgreeToForm.propTypes = propTypes;
AgreeToForm.defaultProps = defaultProps;

export default AgreeToForm;
