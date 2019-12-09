import React, { useState, useEffect } from 'react';

import { PrimaryButton } from 'pureUi/Buttons';
import Label from 'pureUi/Label';
import Select from 'pureUi/Select';
import Input from 'pureUi/Input';

import { useTranslation } from 'react-i18next';
import { ValueLabelPair, ReduxDomainStatus } from '../../interfaces';

export const AddToProposalModalContent = props => {
  const { t } = useTranslation();

  const { createNewProposal, addToProposal }: { createNewProposal: Function; addToProposal: Function } = props;
  const { proposalStatus }: { proposalStatus: ReduxDomainStatus } = props;
  const { proposalResult, hotelUuid, history }: { proposalResult: string; hotelUuid: string; history: any } = props;
  const { proposals }: { proposals: any } = props;

  const [selectedProposalUuid, setSelectedProposalUuid] = useState('new');
  const [newProposalName, setNewProposalName] = useState('');
  const [isNewProposal, setIsNewProposal] = useState(selectedProposalUuid === 'new');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // when the modal is submitted and the proposal status is SUCCESS, we're complete
  useEffect(() => {
    if (isSubmitted && proposalStatus === 'SUCCESS') {
      history.push(`/proposals/${proposalResult}/edit`);
    }
  }, [isSubmitted, proposalStatus]);

  const handleProposalNameChange = e => {
    if (e.target.value === 'new') {
      setIsNewProposal(true);
    } else {
      setIsNewProposal(false);
    }
    setSelectedProposalUuid(e.target.value);
  };

  const handleAddToProposalSubmit = () => {
    // if the proposal status is loading, return out - we dont want to send multiple requests
    // @see https://pureescapes.atlassian.net/browse/OWA-1067
    if (proposalStatus === 'LOADING') {
      return;
    }

    // we should NEVER place holds as we are making proposals which is why a hard `false` is passed here
    if (isNewProposal) {
      createNewProposal(newProposalName, hotelUuid, false);
    } else {
      addToProposal(selectedProposalUuid, hotelUuid, false);
    }
    setIsSubmitted(true);
  };

  const selectOptions: ValueLabelPair[] = [];

  selectOptions.push({
    value: 'new',
    label: t('labels.newProposal'),
  });

  Object.keys(proposals).map(pKey =>
    selectOptions.push({
      value: pKey,
      label: proposals[pKey],
    })
  );

  return (
    <div className="add-to-proposal">
      <Label className="mb-4">{t('labels.proposalId')}</Label>
      <Select
        className="mb-4"
        value={selectedProposalUuid}
        options={selectOptions}
        onChange={handleProposalNameChange}
      />

      {isNewProposal && (
        <div className="mb-4">
          <Label className="mb-4">{t('labels.proposalName')}</Label>
          <Input value={newProposalName} onChange={e => setNewProposalName(e.target.value)} />
        </div>
      )}

      <PrimaryButton type="button" onClick={handleAddToProposalSubmit}>
        {t('buttons.addToProposal')}
      </PrimaryButton>
    </div>
  );
};
