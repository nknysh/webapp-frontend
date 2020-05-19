import React from 'react';
import styled from 'styled-components';
import { StandardModal, ModalHeader, ModalContent, ModalFooter } from 'pureUi/Modal';
import { PrimaryButton, SecondaryButton, ButtonBar } from 'pureUi/Buttons';
import { Heading, Text } from 'pureUi/typography';
import { colors } from 'pureUi/pureUiTheme';

export interface ConfirmationModalProps {
  className?: string;
  entityName: string;
  onOk: () => void;
  onCancel: () => void;
}

const StyledText = styled(Text)`
  max-width: 500px;
`;

const StyledHeading = styled(Heading)`
  color: ${colors.gold};
`;

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { className, entityName, onOk, onCancel } = props;
  
  return (
    <StandardModal className={className} onClose={onCancel}>
      <ModalHeader>
  <StyledHeading level="h2">Are you sure you want to import {entityName}? </StyledHeading>
      </ModalHeader>
      <ModalContent>
        <StyledText>
          This operation takes usually around 3-4 minutes.
          It cannot be canceld before completion and it is irreversible.
          If successful, it will overwrite current {entityName}.
        </StyledText>
      </ModalContent>
      <ModalFooter>
        <ButtonBar>
          <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
          <PrimaryButton autoFocus onClick={onOk}>
            Confirm
          </PrimaryButton>
        </ButtonBar>
      </ModalFooter>
    </StandardModal>
  );
};

export default ConfirmationModal;
