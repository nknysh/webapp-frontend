import React, { useState, Fragment, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, prop, path } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Form, Loader, Title, Button } from '@pure-escapes/webapp-ui-components';

import PasswordResetForm from 'containers/PasswordResetForm';
import { withAuthentication } from 'hoc';

import { extractFieldDefaults, sanitizeValues, getServerError } from 'utils';

import { isSending, isSuccess } from 'store/common';

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
  SubmitText,
} from './LoginForm.styles';

const renderServerError = content => <ServerErrorContent>{content}</ServerErrorContent>;

const renderForm = (t, { formValues, onSubmit, onForgottenClick }) => (
  <Form
    initialValues={formValues}
    onSubmit={onSubmit}
    validationSchema={validation}
    validateOnBlur={false}
    validateOnChange={false}
  >
    {({ values, ...formProps }) => (
      <Fragment>
        {Form.renderField('email', prop('email', values), prop('email', fields), formProps)}
        {Form.renderField('password', prop('password', values), prop('password', fields), formProps)}
        <StyledCheckbox
          name="rememberMe"
          label={path(['rememberMe', 'label'], fields)}
          defaultChecked={prop('rememberMe', values)}
          onChange={prop('handleChange', formProps)}
          onBlur={prop('handleBlur', formProps)}
        >
          {Form.renderFieldError(path(['errors', 'rememberMe'], formProps))}
        </StyledCheckbox>
        <Actions>
          <Button type="submit">
            <SubmitText>{t('buttons.login')}</SubmitText>
          </Button>

          <ForgotPassword onClick={onForgottenClick}>
            <ForgotLink>{t('buttons.forgotten')}</ForgotLink>
          </ForgotPassword>
        </Actions>
      </Fragment>
    )}
  </Form>
);

export const LoginForm = ({ requestStatus, onLogin, error, onComplete }) => {
  const { t } = useTranslation();

  const [submitted, setSubmitted] = useState(false);
  const [forgotten, setForgotten] = useState(false);
  const [formValues, setFormValues] = useState(extractFieldDefaults(fields));

  const isLoggingIn = isSending(requestStatus);
  const success = isSuccess(requestStatus);

  const onSubmit = useCallback(
    values => {
      setSubmitted(true);
      setFormValues(values);
      onLogin(sanitizeValues(values));
      onComplete();
    },
    [onComplete, onLogin]
  );

  const onForgottenClick = useCallback(() => setForgotten(true), []);

  if (forgotten) return <PasswordResetForm />;

  return (
    <StyledLoginForm>
      <Loader isLoading={submitted && isLoggingIn && !success} text={t('messages.loggingIn')}>
        <Title>{path(['titles', 'default'], data)}</Title>
        {renderServerError(getServerError(prop('errors', data), error))}
        {renderForm(t, { formValues, onSubmit, onForgottenClick })}
      </Loader>
    </StyledLoginForm>
  );
};

LoginForm.propTypes = propTypes;
LoginForm.defaultProps = defaultProps;

export default compose(
  withAuthentication,
  withRouter,
  connect
)(LoginForm);
