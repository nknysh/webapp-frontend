import React, { useState, Fragment, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { compose, prop, propOr, defaultTo, path, pipe } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Form, Loader, Title, FormField, FormFieldError } from 'components';
import PasswordResetForm from 'containers/PasswordResetForm';
import { withAuthentication } from 'hoc';

import { getFormPath, extractFieldDefaults, sanitizeValues, getServerError, parseQueryString } from 'utils';

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
  SubmitButton,
  SubmitText,
  CompleteIcon,
} from './LoginForm.styles';

const originRedirect = pipe(
  parseQueryString,
  propOr('', 'origin'),
  decodeURIComponent
);

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
            <SubmitText>{t('buttons.login')}</SubmitText>
          </SubmitButton>

          <ForgotPassword onClick={onForgottenClick}>
            <ForgotLink>{t('buttons.forgotten')}</ForgotLink>
          </ForgotPassword>
        </Actions>
      </Fragment>
    )}
  </Form>
);

const renderComplete = ({ search, history }) => {
  const redirect = defaultTo('/', originRedirect(search));
  history.push(redirect);

  return <CompleteIcon>done_all</CompleteIcon>;
};

export const LoginForm = ({
  requestStatus,
  isAuthenticated,
  location: { search },
  history,
  onLogin,
  error,
  onComplete,
}) => {
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
        {(submitted && success) || isAuthenticated
          ? renderComplete({ search, history })
          : renderForm(t, { formValues, onSubmit, onForgottenClick })}
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
