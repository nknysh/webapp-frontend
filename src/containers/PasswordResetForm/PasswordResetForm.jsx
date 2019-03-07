import React, { useState } from 'react';
import { __, compose, prop, path, view, set, curry, keys, isEmpty } from 'ramda';

import { Form, Label, Loader, Title, Fields } from 'components';
import { lensesFromObject } from 'utils';

import { isSending, isSuccess } from 'store/common';
import { InputError } from 'styles/elements';
import uiConfig from 'config/ui';
import formConfig from 'config/forms';
import { schema, fields, errors } from 'config/forms/passwordReset';
import descriptionData from 'config/forms/passwordReset/description.md';
import completeData from 'config/forms/passwordReset/complete.md';

import connect from './PasswordResetForm.state';
import { propTypes, defaultProps } from './PasswordResetForm.props';
import {
  StyledPasswordResetForm,
  Field,
  Input,
  Actions,
  SubmitButton,
  SubmitText,
  StyledMarkdown,
  ServerErrorContent,
} from './PasswordResetForm.styles';

const getServerError = error => error && !isEmpty(error) && prop('unknown', errors);

const renderServerError = content => <ServerErrorContent>{content}</ServerErrorContent>;

const renderFormError = (key, errors) => prop(key, errors) && <InputError>{prop(key, errors)}</InputError>;

export const PasswordResetForm = ({ requestStatus, onReset, error }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(prop('defaults', fields));

  const isResetting = isSending(requestStatus);
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
    onReset(values);
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
          </Fields>
          <Actions>
            <SubmitButton type="button" onClick={handleSubmit}>
              <SubmitText>{path(['buttons', 'passwordReset'], uiConfig)}</SubmitText>
            </SubmitButton>
          </Actions>
        </form>
      )}
    </Form>
  );

  const isComplete = !isResetting && success;

  const title = !isComplete
    ? path(['forms', 'passwordReset'], formConfig)
    : path(['forms', 'passwordResetComplete'], formConfig);
  const description = !isComplete ? descriptionData : completeData;

  return (
    <StyledPasswordResetForm>
      <Loader isLoading={submitted && isResetting && !success} text={path(['messages', 'loggingIn'], uiConfig)}>
        <Title>{title}</Title>
        <StyledMarkdown>{description}</StyledMarkdown>
        {renderServerError(getServerError(error))}
        {!isComplete && renderForm()}
      </Loader>
    </StyledPasswordResetForm>
  );
};

PasswordResetForm.propTypes = propTypes;
PasswordResetForm.defaultProps = defaultProps;

export default compose(connect)(PasswordResetForm);
