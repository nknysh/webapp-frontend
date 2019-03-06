import React, { useState } from 'react';
import { __, compose, prop, path, view, set, curry, keys, has, isEmpty } from 'ramda';

import { isSending, isSuccess } from 'store/common';
import { InputError } from 'styles/elements';
import { withAuthentication } from 'hoc';
import { lensesFromObject } from 'utils';

import { Form, Label, Loader, Fields, Title } from 'components';
import { PasswordResetForm } from 'containers';

import uiConfig from 'config/ui';
import formConfig from 'config/forms';
import { schema, fields, errors } from 'config/forms/login';

import { propTypes, defaultProps } from './LoginForm.props';
import connect from './LoginForm.state';
import {
  Actions,
  Field,
  ForgotLink,
  ForgotPassword,
  Input,
  ServerErrorContent,
  StyledCheckbox,
  StyledLoginForm,
  SubmitButton,
  SubmitText,
} from './LoginForm.styles';

const getServerError = error => {
  if (!error || isEmpty(error)) return '';
  if (has('unverified', error)) return prop('unverified', errors);
  return '';
};

const renderServerError = content => <ServerErrorContent>{content}</ServerErrorContent>;

const renderFormError = (key, errors) => prop(key, errors) && <InputError>{prop(key, errors)}</InputError>;

export const LoginForm = ({ requestStatus, onLogin, error }) => {
  const [submitted, setSubmitted] = useState(false);
  const [forgotten, setForgotten] = useState(false);
  const [formValues, setFormValues] = useState(prop('defaults', fields));

  const isLoading = isSending(requestStatus);
  const success = isSuccess(requestStatus);

  const lenses = lensesFromObject(keys(formValues));
  const getLens = prop(__, lenses);

  const changeHandler = curry((lens, callback, e) => {
    setFormValues(set(lens, e.target.value, formValues));
    callback(e);
  });

  const onSubmit = values => {
    setSubmitted(true);
    setFormValues(values);
    onLogin(values);
  };

  const renderForm = () => (
    <Form
      initialValues={formValues}
      onSubmit={onSubmit}
      validationSchema={schema}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, handleChange, handleBlur, handleSubmit }) => (
        <form>
          <Fields>
            <Field>
              <Label htmlFor="email">{path(['labels', 'email'], fields)}</Label>
              <Input
                autocomplete
                name="email"
                placeholder={path(['labels', 'email'], fields)}
                value={view(getLens('email'), formValues)}
                onChange={changeHandler(getLens('email'), handleChange)}
                onBlur={handleBlur}
              />
              {renderFormError('email', errors)}
            </Field>
            <Field>
              <Label htmlFor="password">{path(['labels', 'password'], fields)}</Label>
              <Input
                autocomplete
                type="password"
                name="password"
                placeholder={path(['labels', 'password'], fields)}
                value={view(getLens('password'), formValues)}
                onChange={changeHandler(getLens('password'), handleChange)}
                onBlur={handleBlur}
              />
              {renderFormError('password', errors)}
            </Field>
            <Field>
              <StyledCheckbox
                name="remember"
                label={path(['labels', 'remember'], fields)}
                value={view(getLens('remember'), formValues)}
                onChange={changeHandler(getLens('remember'), handleChange)}
                onBlur={handleBlur}
              />
              {renderFormError('remember', errors)}
            </Field>
          </Fields>
          <Actions>
            <SubmitButton type="button" onClick={handleSubmit}>
              <SubmitText>{path(['buttons', 'login'], uiConfig)}</SubmitText>
            </SubmitButton>

            <ForgotPassword onClick={() => setForgotten(true)}>
              <ForgotLink>{path(['buttons', 'forgotten'], uiConfig)}</ForgotLink>
            </ForgotPassword>
          </Actions>
        </form>
      )}
    </Form>
  );

  if (forgotten) return <PasswordResetForm />;

  return (
    <StyledLoginForm>
      <Loader isLoading={submitted && isLoading && !success} text={path(['messages', 'loggingIn'], uiConfig)}>
        <Title>{path(['forms', 'login'], formConfig)}</Title>
        {renderServerError(getServerError(error))}
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
