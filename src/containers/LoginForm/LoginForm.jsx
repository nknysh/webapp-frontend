import React, { useState, Fragment } from 'react';
import { compose, prop, path } from 'ramda';

import { Form, Loader, Title, FormField, FormFieldError } from 'components';
import { PasswordResetForm } from 'containers';
import { withAuthentication } from 'hoc';

import { getFormPath, extractFieldDefaults, sanitizeValues, getServerError } from 'utils/form';

import { isSending, isSuccess } from 'store/common';

import uiConfig from 'config/ui';
import { fields, validation, data } from 'config/forms/login';

import { propTypes, defaultProps } from './LoginForm.props';
import connect from './LoginForm.state';
import {
  Actions,
  ForgotLink,
  ForgotPassword,
  ServerErrorContent,
  StyledCheckbox,
  StyledLoginForm,
  SubmitButton,
  SubmitText,
} from './LoginForm.styles';

const renderServerError = content => <ServerErrorContent>{content}</ServerErrorContent>;

const renderFormError = error => error && <FormFieldError>{error}</FormFieldError>;

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

export const LoginForm = ({ requestStatus, onLogin, error }) => {
  const [submitted, setSubmitted] = useState(false);
  const [forgotten, setForgotten] = useState(false);
  const [formValues, setFormValues] = useState(extractFieldDefaults(fields));

  const isLoggingIn = isSending(requestStatus);
  const success = isSuccess(requestStatus);

  const onSubmit = values => {
    setSubmitted(true);
    setFormValues(values);
    onLogin(sanitizeValues(values));
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
          {renderField('password', prop('password', values), prop('password', fields), formProps)}
          <StyledCheckbox
            name="rememberMe"
            label={path(['rememberMe', 'label'], fields)}
            defaultChecked={prop('rememberMe', values)}
            onChange={prop('handleChange', formProps)}
            onBlur={prop('handleBlur', formProps)}
          >
            {renderFormError(path(['errors', 'rememberMe'], formProps))}
          </StyledCheckbox>
          <Actions>
            <SubmitButton type="submit">
              <SubmitText>{path(['buttons', 'login'], uiConfig)}</SubmitText>
            </SubmitButton>

            <ForgotPassword onClick={() => setForgotten(true)}>
              <ForgotLink>{path(['buttons', 'forgotten'], uiConfig)}</ForgotLink>
            </ForgotPassword>
          </Actions>
        </Fragment>
      )}
    </Form>
  );

  if (forgotten) return <PasswordResetForm />;

  return (
    <StyledLoginForm>
      <Loader isLoading={submitted && isLoggingIn && !success} text={path(['messages', 'loggingIn'], uiConfig)}>
        <Title>{path(['titles', 'default'], data)}</Title>
        {renderServerError(getServerError(prop('errors', data), error))}
        {renderForm()}
      </Loader>
    </StyledLoginForm>
  );
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  connect
)(LoginForm);
