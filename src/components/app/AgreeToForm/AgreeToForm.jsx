import React, { Fragment } from 'react';
import { prop } from 'ramda';

import { Form } from 'components/elements';

import { fields, validation } from 'config/forms/agreeTo';

import { propTypes, defaultProps } from './AgreeToForm.props';
import { TransferForm } from './AgreeToForm.styles';

export const AgreeToForm = ({ children, renderSubmitButton, className, buttonLabel, ...props }) => (
  <TransferForm className={className}>
    {children}
    <Form validationSchema={validation} {...props}>
      {({ values, ...formProps }) => (
        <Fragment>
          {Form.renderField(
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
