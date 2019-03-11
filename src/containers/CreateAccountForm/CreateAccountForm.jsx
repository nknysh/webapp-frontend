import React, { useState, Fragment } from 'react';
import { compose, prop, path } from 'ramda';

import { Form, Loader, Title, FormFieldError, FormField } from 'components';
import { getServerError, extractFieldDefaults, sanitizeValues, getFormPath } from 'utils/form';

import uiConfig from 'config/ui';
import { fields, validation, data } from 'config/forms/createAccount';

import { isSending, isSuccess } from 'store/common';

import { propTypes, defaultProps } from './CreateAccountForm.props';
import connect from './CreateAccountForm.state';
import {
  Actions,
  Column,
  Columns,
  InfoMarkdown,
  StyledCreateAccount,
  StyledMarkdown,
  SubmitButton,
  SubmitText,
  ServerErrorContent,
  StyledCheckbox,
} from './CreateAccountForm.styles';

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

export const CreateAccountForm = ({ requestStatus, onSignUp, error }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(extractFieldDefaults(fields));

  const isSaving = isSending(requestStatus);
  const saved = isSuccess(requestStatus);

  const onSubmit = values => {
    setSubmitted(true);
    setFormValues(values);
    onSignUp(sanitizeValues(values));
  };

  const formTitle = saved && submitted ? path(['titles', 'complete'], data) : path(['titles', 'default'], data);

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
          <Columns>
            <Column>
              {renderField('title', prop('title', values), prop('title', fields), formProps)}
              {renderField('firstName', prop('firstName', values), prop('firstName', fields), formProps)}
              {renderField('lastName', prop('lastName', values), prop('lastName', fields), formProps)}
              {renderField('email', prop('email', values), prop('email', fields), formProps)}
            </Column>
            <Column>
              {renderField(
                'isExistingPartner',
                prop('isExistingPartner', values),
                prop('isExistingPartner', fields),
                formProps
              )}
              {renderField(
                'companySignupInfo[name]',
                path(['companySignupInfo', 'name'], values),
                path(['companySignupInfo', 'name'], fields),
                formProps
              )}
              {renderField(
                'companySignupInfo[country]',
                path(['companySignupInfo', 'country'], values),
                path(['companySignupInfo', 'country'], fields),
                formProps
              )}
              {renderField('phoneNumber', prop('phoneNumber', values), prop('phoneNumber', fields), formProps)}
              {renderField('mobileNumber', prop('mobileNumber', values), prop('mobileNumber', fields), formProps)}
            </Column>
          </Columns>
          <StyledCheckbox
            name="agreeToTerms"
            label={path(['agreeToTerms', 'label'], fields)}
            defaultChecked={prop('agreeToTerms', values)}
            onChange={prop('handleChange', formProps)}
            onBlur={prop('handleBlur', formProps)}
          >
            {renderFormError(path(['errors', 'agreeToTerms'], formProps))}
          </StyledCheckbox>
          <Actions>
            <SubmitButton type="submit">
              <SubmitText>{path(['buttons', 'request'], uiConfig)}</SubmitText>
            </SubmitButton>
            <InfoMarkdown>{path(['content', 'info'], data)}</InfoMarkdown>
          </Actions>
        </Fragment>
      )}
    </Form>
  );

  const renderComplete = () => <StyledMarkdown>{path(['content', 'complete'], data)}</StyledMarkdown>;

  return (
    <StyledCreateAccount>
      <Loader isLoading={submitted && isSaving && !saved} text={path(['messages', 'creatingAccount'], uiConfig)}>
        <Title>{formTitle}</Title>
        {renderServerError(getServerError(prop('errors', data), error))}
        {submitted && saved ? renderComplete() : renderForm()}
      </Loader>
    </StyledCreateAccount>
  );
};

CreateAccountForm.propTypes = propTypes;
CreateAccountForm.defaultProps = defaultProps;

export default compose(connect)(CreateAccountForm);
