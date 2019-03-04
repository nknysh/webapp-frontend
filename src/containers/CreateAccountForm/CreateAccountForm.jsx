import React, { useState } from 'react';
import { __, compose, prop, path, lensProp, set, curry, view, reduce, keys, merge } from 'ramda';

import uiConfig from 'config/ui';
import formConfig from 'config/forms';
import countriesData from 'config/data/countries';
import { schema, fields } from 'config/forms/createAccount';
import signUpCompleteData from 'config/forms/createAccount/complete.md';
import infoData from 'config/forms/createAccount/info.md';
import { arrayToKeyValueObject } from 'utils';

import { InputError } from 'styles/elements';
import { Status } from 'store/common';

import { Form, Label, Loader } from 'components';

import peLogo from 'public/img/PE_logo.png';

import { propTypes, defaultProps } from './CreateAccountForm.props';
import connect from './CreateAccountForm.state';
import {
  Title,
  Fields,
  Field,
  Input,
  Actions,
  SubmitButton,
  SubmitText,
  Select,
  StyledCreateAccount,
  StyledMarkdown,
  StyledCheckbox,
  Column,
  Columns,
  InfoMarkdown,
} from './CreateAccountForm.styles';

const keyValueCountries = arrayToKeyValueObject('code', 'name')(countriesData);

const newLensProp = (accum, key) => merge(accum, { [`${key}`]: lensProp(key) });

const renderFormError = (key, errors) => prop(key, errors) && <InputError>{prop(key, errors)}</InputError>;

export const CreateAccountForm = ({ requestStatus, onSignUp }) => {
  const [formValues, setFormValues] = useState(prop('defaults', fields));

  const isSaving = requestStatus === Status.SAVING;
  const saved = requestStatus === Status.SUCCESS;

  const lenses = reduce(newLensProp, {}, keys(formValues));
  const getLens = prop(__, lenses);

  const changeHandler = curry((lens, callback, e) => {
    setFormValues(set(lens, e.target.value, formValues));
    callback(e);
  });

  const onSubmit = values => {
    setFormValues(values);
    onSignUp(values);
  };

  const formTitle = saved
    ? path(['forms', 'createAccountComplete'], formConfig)
    : path(['forms', 'createAccount'], formConfig);

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
            <Columns>
              <Column>
                <Field>
                  <Label htmlFor="title">
                    {path(['labels', 'title'], fields)} ({path(['labels', 'optional'], formConfig)})
                  </Label>
                  <Select
                    name="title"
                    placeholder={path(['labels', 'title'], fields)}
                    value={view(getLens('title'), formValues)}
                    onChange={changeHandler(getLens('title'), handleChange)}
                    onBlur={handleBlur}
                    options={prop('titles', formConfig)}
                  />
                </Field>
                <Field>
                  <Label htmlFor="firstName">{path(['labels', 'firstName'], fields)}</Label>
                  <Input
                    name="firstName"
                    placeholder={path(['labels', 'firstName'], fields)}
                    value={view(getLens('firstName'), formValues)}
                    onChange={changeHandler(getLens('firstName'), handleChange)}
                    onBlur={handleBlur}
                  />
                  {renderFormError('firstName', errors)}
                </Field>
                <Field>
                  <Label htmlFor="lastName">{path(['labels', 'lastName'], fields)}</Label>
                  <Input
                    name="lastName"
                    placeholder={path(['labels', 'lastName'], fields)}
                    value={view(getLens('lastName'), formValues)}
                    onChange={changeHandler(getLens('lastName'), handleChange)}
                    onBlur={handleBlur}
                  />
                  {renderFormError('lastName', errors)}
                </Field>
                <Field>
                  <Label htmlFor="email">{path(['labels', 'email'], fields)}</Label>
                  <Input
                    name="email"
                    placeholder={path(['labels', 'email'], fields)}
                    value={view(getLens('email'), formValues)}
                    onChange={changeHandler(getLens('email'), handleChange)}
                    onBlur={handleBlur}
                  />
                  {renderFormError('email', errors)}
                </Field>
              </Column>
              <Column>
                <Field>
                  <Label htmlFor="companyName">{path(['labels', 'companyName'], fields)}</Label>
                  <Input
                    name="companyName"
                    value={view(getLens('companyName'), formValues)}
                    onChange={changeHandler(getLens('companyName'), handleChange)}
                    onBlur={handleBlur}
                  />
                  {renderFormError('companyName', errors)}
                </Field>
                <Field>
                  <Label htmlFor="companyCountry">{path(['labels', 'companyCountry'], fields)}</Label>
                  <Select
                    name="companyCountry"
                    value={view(getLens('companyCountry'), formValues)}
                    onChange={changeHandler(getLens('companyCountry'), handleChange)}
                    onBlur={handleBlur}
                    options={keyValueCountries}
                  />
                  {renderFormError('companyCountry', errors)}
                </Field>
                <Field>
                  <Label htmlFor="landline">{path(['labels', 'landline'], fields)}</Label>
                  <Input
                    name="landline"
                    value={view(getLens('landline'), formValues)}
                    onChange={changeHandler(getLens('landline'), handleChange)}
                    onBlur={handleBlur}
                  />
                  {renderFormError('landline', errors)}
                </Field>
                <Field>
                  <Label htmlFor="mobile">{path(['labels', 'mobile'], fields)}</Label>
                  <Input
                    name="mobile"
                    value={view(getLens('mobile'), formValues)}
                    onChange={changeHandler(getLens('mobile'), handleChange)}
                    onBlur={handleBlur}
                  />
                  {renderFormError('mobile', errors)}
                </Field>
              </Column>
            </Columns>
            <Field>
              <StyledCheckbox
                name="agreeToTerms"
                label={path(['labels', 'agreeToTerms'], fields)}
                value={view(getLens('agreeToTerms'), formValues)}
                onChange={changeHandler(getLens('agreeToTerms'), handleChange)}
                onBlur={handleBlur}
              />
              {renderFormError('agreeToTerms', errors)}
            </Field>
          </Fields>
          <Actions>
            <SubmitButton type="button" onClick={handleSubmit}>
              <SubmitText>{path(['buttons', 'request'], uiConfig)}</SubmitText>
            </SubmitButton>
            <InfoMarkdown>{infoData}</InfoMarkdown>
          </Actions>
        </form>
      )}
    </Form>
  );

  const renderComplete = () => <StyledMarkdown>{signUpCompleteData}</StyledMarkdown>;

  return (
    <StyledCreateAccount>
      <Loader isLoading={isSaving && !saved} text={path(['messages', 'creatingAccount'], uiConfig)}>
        <Title>
          <img src={peLogo} />
          {formTitle}
        </Title>
        {saved ? renderComplete() : renderForm()}
      </Loader>
    </StyledCreateAccount>
  );
};

CreateAccountForm.propTypes = propTypes;
CreateAccountForm.defaultProps = defaultProps;

export default compose(connect)(CreateAccountForm);
