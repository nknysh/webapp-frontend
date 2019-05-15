import React, { useState, Fragment } from 'react';
import { compose, path, prop } from 'ramda';

import { Form, Loader, Title, FormField } from 'components';
import { getFormPath, extractFieldDefaults, sanitizeValues, getServerError } from 'utils/form';

import { isSending, isSuccess } from 'store/common';

import uiConfig from 'config/ui';
import { validation, fields, data } from 'config/forms/passwordReset';

import connect from './PasswordResetForm.state';
import { propTypes, defaultProps } from './PasswordResetForm.props';
import {
  StyledPasswordResetForm,
  Actions,
  SubmitButton,
  SubmitText,
  StyledMarkdown,
  ServerErrorContent,
} from './PasswordResetForm.styles';

const renderServerError = content => <ServerErrorContent>{content}</ServerErrorContent>;

const renderField = (name, value, field, { handleChange, handleBlur, errors }) => (
  <FormField
    name={name}
    value={value}
    onChange={handleChange}
    onBlur={handleBlur}
    error={path(getFormPath(name), errors)}
    {...field}
  />
);

export const PasswordResetForm = ({ requestStatus, onReset, error }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(extractFieldDefaults(fields));

  const isResetting = isSending(requestStatus);
  const success = isSuccess(requestStatus);

  const onSubmit = values => {
    setSubmitted(true);
    setFormValues(values);
    onReset(sanitizeValues(values));
  };

  const renderForm = () => (
    <Form
      initialValues={formValues}
      onSubmit={onSubmit}
      validationSchema={validation}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, ...formProps }) => (
        <Fragment>
          {renderField('email', prop('email', values), prop('email', fields), formProps)}
          <Actions>
            <SubmitButton type="submit">
              <SubmitText>{path(['buttons', 'passwordReset'], uiConfig)}</SubmitText>
            </SubmitButton>
          </Actions>
        </Fragment>
      )}
    </Form>
  );

  const isComplete = !isResetting && success;

  const title = !isComplete ? path(['titles', 'default'], data) : path(['titles', 'complete'], data);
  const description = !isComplete ? path(['content', 'description'], data) : path(['content', 'complete'], data);

  return (
    <StyledPasswordResetForm>
      <Loader isLoading={submitted && isResetting && !success} text={path(['messages', 'passwordReset'], uiConfig)}>
        <Title>{title}</Title>
        <StyledMarkdown>{description}</StyledMarkdown>
        {renderServerError(getServerError(prop('errors', data), error))}
        {!isComplete && renderForm()}
      </Loader>
    </StyledPasswordResetForm>
  );
};

PasswordResetForm.propTypes = propTypes;
PasswordResetForm.defaultProps = defaultProps;

export default compose(connect)(PasswordResetForm);
