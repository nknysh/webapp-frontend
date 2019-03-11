import React, { useState, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { compose, path, prop } from 'ramda';

import { Form, Loader, Title, FormField } from 'components';
import { sanitizeValues, getFormPath, extractFieldDefaults, getServerError } from 'utils/form';

import { isSending, isSuccess } from 'store/common';

import uiConfig from 'config/ui';
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

export const SetPasswordForm = ({ requestStatus, onSetPassword, token, error }) => {
  // No token, no form
  if (!token) return <Redirect to="/" />;

  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(extractFieldDefaults(fields));

  const isSetting = isSending(requestStatus);
  const success = isSuccess(requestStatus);

  const onSubmit = values => {
    setSubmitted(true);
    setFormValues(values);
    onSetPassword({ ...token, ...sanitizeValues(values) });
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
          {renderField('password', prop('password', values), prop('password', fields), formProps)}
          {renderField('passwordConfirm', prop('passwordConfirm', values), prop('passwordConfirm', fields), formProps)}
          <Actions>
            <SubmitButton type="submit">
              <SubmitText>{path(['buttons', 'submit'], uiConfig)}</SubmitText>
            </SubmitButton>
          </Actions>
        </Fragment>
      )}
    </Form>
  );

  const isComplete = !isSetting && success;

  const title = !isComplete ? path(['titles', 'default'], data) : path(['titles', 'complete'], data);

  return (
    <StyledSetPasswordForm>
      <Loader isLoading={submitted && isSetting && !success} text={path(['messages', 'setPassword'], uiConfig)}>
        <Title>{title}</Title>
        {renderServerError(getServerError(prop('errors', data), error))}
        {!isComplete && renderForm()}
      </Loader>
    </StyledSetPasswordForm>
  );
};

SetPasswordForm.propTypes = propTypes;
SetPasswordForm.defaultProps = defaultProps;

export default compose(connect)(SetPasswordForm);
