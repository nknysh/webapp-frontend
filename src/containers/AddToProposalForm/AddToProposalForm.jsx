import React, { useState, Fragment } from 'react';
import { path, prop, propEq, compose, over, lensPath, append } from 'ramda';
import { useTranslation } from 'react-i18next';

import { useFetchData, useEffectBoundary } from 'effects';
import { FormField, Form, Title, Loader } from 'components';
import { extractFieldDefaults, getFormPath } from 'utils/form';

import { propTypes, defaultProps } from './AddToProposalForm.props';
import { StyledAddToProposalForm, Actions, SubmitButton, SubmitText } from './AddToProposalForm.styles';
import connect from './AddToProposalForm.state';

import { fields, validation, data } from 'config/forms/addToProposal';

const isNewProposal = propEq('proposalId', 'new');

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

export const AddToProposalForm = ({
  className,
  createNewProposal,
  addToProposal,
  bookingId,
  onSubmit,
  fetchProposals,
  status,
  proposals,
  disabled,
  result,
  availableToHold,
}) => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({ availableToHold, ...extractFieldDefaults(fields) });
  const [submitted, setSubmitted] = useState(false);

  const loaded = useFetchData(status, fetchProposals, []);

  useEffectBoundary(() => {
    submitted && onSubmit(result);
  }, [result]);

  const onFormSubmit = values => {
    setFormValues(values);

    const placeHolds = prop('placeHolds', values);

    if (isNewProposal(values)) {
      createNewProposal(prop('proposalName', values), bookingId, placeHolds);
    } else {
      addToProposal(prop('proposalId', values), bookingId, placeHolds);
    }

    setSubmitted(true);
  };

  const proposalId = over(lensPath(['proposalId', 'props', 'options']), append(proposals), fields);

  return (
    <StyledAddToProposalForm className={className}>
      <Title>{prop('title', data)}</Title>
      <Form
        initialValues={formValues}
        onSubmit={onFormSubmit}
        validationSchema={validation}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ values, ...formProps }) => (
          <Fragment>
            <Loader isLoading={!loaded}>
              {renderField('proposalId', prop('proposalId', values), prop('proposalId', proposalId), formProps)}
            </Loader>
            {isNewProposal(values) &&
              renderField('proposalName', prop('proposalName', values), prop('proposalName', fields), formProps)}
            {availableToHold &&
              renderField('placeHolds', prop('placeHolds', values), prop('placeHolds', fields), formProps)}
            <Actions>
              <SubmitButton type="submit" disabled={disabled}>
                <SubmitText>{t('buttons.addToProposal')}</SubmitText>
              </SubmitButton>
            </Actions>
          </Fragment>
        )}
      </Form>
    </StyledAddToProposalForm>
  );
};

AddToProposalForm.propTypes = propTypes;
AddToProposalForm.defaultProps = defaultProps;

export default compose(connect)(AddToProposalForm);
