import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { __, compose, prop, path, view, set, curry, keys } from 'ramda';

import { Form, Label, Loader, Title, Fields } from 'components';

import { Status } from 'store/common';
import { InputError } from 'styles/elements';
import uiConfig from 'config/ui';
import formConfig from 'config/forms';
import { schema, fields } from 'config/forms/setPassword';
import { lensesFromObject } from 'utils';

import connect from './SetPasswordForm.state';
import { propTypes, defaultProps } from './SetPasswordForm.props';
import { StyledSetPasswordForm, Field, Input, Actions, SubmitButton, SubmitText } from './SetPasswordForm.styles';

const renderFormError = (key, errors) => prop(key, errors) && <InputError>{prop(key, errors)}</InputError>;

export const SetPasswordForm = ({ requestStatus, onSetPassword, token }) => {
  // No token, no form
  if (!token) return <Redirect to="/" />;

  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(prop('defaults', fields));

  const isSending = requestStatus === Status.SENDING;
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
    onSetPassword({ values, token });
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
              <Label htmlFor="confirm">{path(['labels', 'confirm'], fields)}</Label>
              <Input
                autocomplete
                type="password"
                name="confirm"
                placeholder={path(['labels', 'confirm'], fields)}
                value={view(getLens('confirm'), formValues)}
                onChange={changeHandler(getLens('confirm'), handleChange)}
                onBlur={handleBlur}
              />
              {renderFormError('confirm', errors)}
            </Field>
          </Fields>
          <Actions>
            <SubmitButton type="button" onClick={handleSubmit}>
              <SubmitText>{path(['buttons', 'submit'], uiConfig)}</SubmitText>
            </SubmitButton>
          </Actions>
        </form>
      )}
    </Form>
  );

  const isComplete = !isSending && success;

  const title = !isComplete
    ? path(['forms', 'setPassword'], formConfig)
    : path(['forms', 'setPasswordComplete'], formConfig);

  return (
    <StyledSetPasswordForm>
      <Loader isLoading={submitted && isSending && !success} text={path(['messages', 'loggingIn'], uiConfig)}>
        <Title>{title}</Title>
        {!isComplete && renderForm()}
      </Loader>
    </StyledSetPasswordForm>
  );
};

SetPasswordForm.propTypes = propTypes;
SetPasswordForm.defaultProps = defaultProps;

export default compose(connect)(SetPasswordForm);
