import React, { forwardRef, Fragment } from 'react';
import { path, prop } from 'ramda';

import { Form, FormField } from 'components/elements';

import { getFormPath } from 'utils';

import { fields, validation, data } from 'config/forms/bankTransfer';

import { propTypes, defaultProps } from './BankTransferForm.props';
import { TransferForm, StyledMarkdown } from './BankTransferForm.styles';

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

export const BankTransferForm = forwardRef(({ showSubmit, renderSubmitButton, className, ...props }, ref) => (
  <TransferForm className={className}>
    <StyledMarkdown>{path(['content', 'info'], data)}</StyledMarkdown>
    <Form ref={ref} validationSchema={validation} {...props}>
      {({ values, ...formProps }) => (
        <Fragment>
          {renderField(
            'agreeToTerms',
            undefined,
            prop('agreeToTerms', fields),
            formProps,
            prop('agreeToTerms', values)
          )}
          {showSubmit && renderSubmitButton()}
        </Fragment>
      )}
    </Form>
  </TransferForm>
));

BankTransferForm.displayName = 'BankTransferForm';
BankTransferForm.propTypes = propTypes;
BankTransferForm.defaultProps = defaultProps;

export default BankTransferForm;
