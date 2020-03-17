import React from 'react';
import styled from 'styled-components';
import { StandardModal, ModalHeader, ModalContent, ModalFooter } from 'pureUi/Modal';
import { PrimaryButton, SecondaryButton, ButtonBar } from 'pureUi/Buttons';
import { Heading1 } from 'styles';
import { Text } from 'pureUi/typography';

interface ConfirmationModalProps {
  className?: string;
  onOk: () => void;
  onCancel: () => void;
}

const StyledText = styled(Text)`
  max-width: 500px;
`;

const ConfirmationModal = (props: ConfirmationModalProps) => {
  const { className, onOk, onCancel } = props;
  
  return (
    <StandardModal className={className} onClose={onCancel}>
      <ModalHeader>
        <Heading1>Are you sure you want to import rates? </Heading1>
      </ModalHeader>
      <ModalContent>
        <StyledText>
          This operation takes usually around 3-4 minutes.
          It cannot be canceld before completion and it is irreversible.
          If successful, it will overwrite current rates.
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
