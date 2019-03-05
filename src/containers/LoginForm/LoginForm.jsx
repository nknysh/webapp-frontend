import React, { useState } from 'react';
import { __, compose, prop, path, view, set, curry, keys } from 'ramda';

import { Status } from 'store/common';
import { InputError } from 'styles/elements';
import { Form, Label, Loader } from 'components';
import { withAuthentication } from 'hoc';
import { lensesFromObject } from 'utils';

import uiConfig from 'config/ui';
import formConfig from 'config/forms';
import { schema, fields } from 'config/forms/login';

import peLogo from 'public/img/PE_logo.png';

import { propTypes, defaultProps } from './LoginForm.props';
import connect from './LoginForm.state';
import {
  StyledLoginForm,
  Title,
  Fields,
  Field,
  Input,
  Actions,
  SubmitButton,
  SubmitText,
  StyledCheckbox,
} from './LoginForm.styles';

const renderFormError = (key, errors) => prop(key, errors) && <InputError>{prop(key, errors)}</InputError>;

export const LoginForm = ({ requestStatus, onLogin }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(prop('defaults', fields));

  const isLoading = requestStatus === Status.SAVING;
  const success = requestStatus === Status.SUCCESS;

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
            <SubmitButton onClick={handleSubmit}>
              <SubmitText>{path(['buttons', 'login'], uiConfig)}</SubmitText>
            </SubmitButton>
          </Actions>
        </form>
      )}
    </Form>
  );

  return (
    <StyledLoginForm>
      <Loader isLoading={submitted && isLoading && !success} text={path(['messages', 'loggingIn'], uiConfig)}>
        <Title>
          <img src={peLogo} />
          {path(['forms', 'login'], formConfig)}
        </Title>
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
