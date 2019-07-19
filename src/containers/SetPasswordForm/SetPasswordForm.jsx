import React, { useState, Fragment, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { compose, path, prop } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Form, Loader, Title, FormField } from 'components';
import { sanitizeValues, getFormPath, extractFieldDefaults, getServerError } from 'utils/form';

import { isSending, isSuccess } from 'store/common';

import { validation, fields, data } from 'config/forms/setPassword';

import connect from './SetPasswordForm.state';
import { propTypes, defaultProps } from './SetPasswordForm.props';
import { StyledSetPasswordForm, Actions, SubmitButton, SubmitText, ServerErrorContent } from './SetPasswordForm.styles';

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

const renderForm = (t, { formValues, onSubmit }) => (
  <Form
    initialValues={formValues}
    onSubmit={onSubmit}
    validationSchema={validation}
    validateOnBlur={false}
    validateOnChange={false}
  >
    {({ values, ...formProps }) => (
      <Fragment>
        {renderField('password', prop('password', values), prop('password', fields), formProps)}
        {renderField('passwordConfirm', prop('passwordConfirm', values), prop('passwordConfirm', fields), formProps)}
        <Actions>
          <SubmitButton type="submit">
            <SubmitText>{t('buttons.submit')}</SubmitText>
          </SubmitButton>
        </Actions>
      </Fragment>
    )}
  </Form>
);

export const SetPasswordForm = ({ requestStatus, onSetPassword, token, error }) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(extractFieldDefaults(fields));

  const onSubmit = useCallback(
    values => {
      setSubmitted(true);
      setFormValues(values);
      onSetPassword({ ...token, ...sanitizeValues(values) });
    },
    [onSetPassword, token]
  );

  // No token, no form
  if (!token) return <Redirect to="/" />;

  const isSetting = isSending(requestStatus);
  const success = isSuccess(requestStatus);

  const isComplete = !isSetting && success;

  const title = !isComplete ? path(['titles', 'default'], data) : path(['titles', 'complete'], data);

  return (
    <StyledSetPasswordForm>
      <Loader isLoading={submitted && isSetting && !success} text={t('messages.setPassword')}>
        <Title>{title}</Title>
        {renderServerError(getServerError(prop('errors', data), error))}
        {!isComplete && renderForm(t, { formValues, onSubmit })}
      </Loader>
    </StyledSetPasswordForm>
  );
};

SetPasswordForm.propTypes = propTypes;
SetPasswordForm.defaultProps = defaultProps;

export default compose(connect)(SetPasswordForm);
