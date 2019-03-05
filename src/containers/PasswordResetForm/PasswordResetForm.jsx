import React, { useState } from 'react';
import { __, compose, prop, path, view, set, curry, keys, has, isEmpty } from 'ramda';

import { Form, Label, Loader, Title, Fields } from 'components';

import { Status } from 'store/common';
import { InputError } from 'styles/elements';
import uiConfig from 'config/ui';
import formConfig from 'config/forms';
import { lensesFromObject } from 'utils';
import { schema, fields } from 'config/forms/passwordReset';
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
} from './PasswordResetForm.styles';

const renderFormError = (key, errors) => prop(key, errors) && <InputError>{prop(key, errors)}</InputError>;

export const PasswordResetForm = ({ requestStatus, onReset }) => {
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

  const isComplete = !isSending && success;

  const title = !isComplete
    ? path(['forms', 'passwordReset'], formConfig)
    : path(['forms', 'passwordResetComplete'], formConfig);
  const description = !isComplete ? descriptionData : completeData;

  return (
    <StyledPasswordResetForm>
      <Loader isLoading={submitted && isSending && !success} text={path(['messages', 'loggingIn'], uiConfig)}>
        <Title>{title}</Title>
        <StyledMarkdown>{description}</StyledMarkdown>
        {!isComplete && renderForm()}
      </Loader>
    </StyledPasswordResetForm>
  );
};

PasswordResetForm.propTypes = propTypes;
PasswordResetForm.defaultProps = defaultProps;

export default compose(connect)(PasswordResetForm);
