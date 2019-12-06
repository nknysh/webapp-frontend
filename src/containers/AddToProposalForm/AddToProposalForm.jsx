import React, { useState, useCallback, useEffect } from 'react';
import { prop, propEq, compose, over, lensPath, append } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import { useTranslation } from 'react-i18next';
import { Loader, Form, Title } from '@pure-escapes/webapp-ui-components';

import { useFetchData, useEffectBoundary } from 'effects';
import { extractFieldDefaults } from 'utils/form';
import { isSuccess } from 'store/common';

import { propTypes, defaultProps } from './AddToProposalForm.props';
import { StyledAddToProposalForm, Actions, SubmitButton, SubmitText } from './AddToProposalForm.styles';
import connect from './AddToProposalForm.state';

import { fields, validation, data } from 'config/forms/addToProposal';

const isNewProposal = propEq('proposalId', 'new');

export const AddToProposalForm = ({
  addToProposal,
  availableToHold,
  bookingId,
  className,
  createNewProposal,
  disabled,
  fetchProposals,
  onSubmit,
  proposals,
  result,
  status,
}) => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState({ availableToHold, ...extractFieldDefaults(fields) });
  const [submitted, setSubmitted] = useState(false);
  const [complete, setComplete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // always load the available proposals
  useEffect(() => {
    async function load() {
      await fetchProposals();
      setIsLoading(false);
    }
    load();
  }, [fetchProposals]);

  useEffectBoundary(() => {
    // When complete this is the final trigger
    complete && onSubmit(result);
  }, [complete]);

  useEffectBoundary(() => {
    // Wait for data to come back from API submit redux action
    submitted && (isSuccess(status) ? setComplete(true) : setSubmitted(false));
  }, [status]);

  const onFormSubmit = useCallback(
    values => {
      setFormValues(values);

      const placeHolds = prop('placeHolds', values);

      isNewProposal(values)
        ? createNewProposal(prop('proposalName', values), bookingId, placeHolds)
        : addToProposal(prop('proposalId', values), bookingId, placeHolds);

      setSubmitted(true);
    },
    [addToProposal, bookingId, createNewProposal]
  );

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
          <React.Fragment>
            <Loader isLoading={isLoading}>
              {Form.renderField('proposalId', prop('proposalId', values), prop('proposalId', proposalId), formProps)}
            </Loader>
            {isNewProposal(values) &&
              Form.renderField('proposalName', prop('proposalName', values), prop('proposalName', fields), formProps)}
            {availableToHold &&
              Form.renderField('placeHolds', prop('placeHolds', values), prop('placeHolds', fields), formProps)}
            <Actions>
              <SubmitButton type="submit" disabled={disabled}>
                <SubmitText>{t('buttons.addToProposal')}</SubmitText>
              </SubmitButton>
            </Actions>
          </React.Fragment>
        )}
      </Form>
    </StyledAddToProposalForm>
  );
};

AddToProposalForm.propTypes = propTypes;
AddToProposalForm.defaultProps = defaultProps;

export default compose(connect)(AddToProposalForm);
