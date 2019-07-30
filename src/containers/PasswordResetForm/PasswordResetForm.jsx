import React, { useState, Fragment, useCallback } from 'react';
import { compose, path, prop } from 'ramda';
import { useTranslation } from 'react-i18next';

import { Form, Loader, Title } from 'components';
import { extractFieldDefaults, sanitizeValues, getServerError } from 'utils/form';

import { isSending, isSuccess } from 'store/common';

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
        {Form.renderField('email', prop('email', values), prop('email', fields), formProps)}
        <Actions>
          <SubmitButton type="submit">
            <SubmitText>{t('buttons.passwordReset')}</SubmitText>
          </SubmitButton>
        </Actions>
      </Fragment>
    )}
  </Form>
);

export const PasswordResetForm = ({ requestStatus, onReset, error }) => {
  const { t } = useTranslation();

  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(extractFieldDefaults(fields));

  const isResetting = isSending(requestStatus);
  const success = isSuccess(requestStatus);

  const onSubmit = useCallback(
    values => {
      setSubmitted(true);
      setFormValues(values);
      onReset(sanitizeValues(values));
    },
    [onReset]
  );

  const isComplete = !isResetting && success;

  const title = !isComplete ? path(['titles', 'default'], data) : path(['titles', 'complete'], data);
  const description = !isComplete ? path(['content', 'description'], data) : path(['content', 'complete'], data);

  return (
    <StyledPasswordResetForm>
      <Loader isLoading={submitted && isResetting && !success} text={t('messages.passwordReset')}>
        <Title>{title}</Title>
        <StyledMarkdown>{description}</StyledMarkdown>
        {renderServerError(getServerError(prop('errors', data), error))}
        {!isComplete && renderForm(t, { formValues, onSubmit })}
      </Loader>
    </StyledPasswordResetForm>
  );
};

PasswordResetForm.propTypes = propTypes;
PasswordResetForm.defaultProps = defaultProps;

export default compose(connect)(PasswordResetForm);
