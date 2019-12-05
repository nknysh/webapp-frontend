import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import FocusTrap from 'focus-trap-react';

const ModalContainer = styled.div`
  position: fixed;
  z-index: 9999; /* needs to be this so high to cover the gallery buttons */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
  cursor: default;
  &.modal-open {
    display: block;
  }
  &.modal-closed {
    display: none;
  }
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  cursor: default;
`;

const ModalCloseButton = styled.button`
  float: right;
  background: none;
  border: none;
  cursor: pointer;
`;

const Modal = ({
  isOpen = false,
  modalContent,
  modalHeader,
  onClose,
}: {
  isOpen: boolean;
  modalContent: string;
  modalHeader: string;
  onClose: Function;
}) => {
  if (!isOpen) {
    return null;
  }

  const handleKeyPress = e => {
    if (e.key === 'Escape') {
      // if the user has pressed Esc, we close the modal and remove the event listener
      onClose();
      document.removeEventListener('keyup', handleKeyPress, true);
    }
  };

  // when the modal is open and rendered, attach and event listener for esc key functionality
  document.addEventListener('keyup', handleKeyPress, true);

  const handleCloseButtonPress = () => {
    // if the user presses the close button, we close the modal and remove the event listener
    onClose();
    document.removeEventListener('keyup', handleKeyPress, true);
  };

  return (
    <FocusTrap>
      <ModalContainer onClick={e => e.preventDefault()} className={`modal ${isOpen ? 'modal-open' : 'modal-closed'}`}>
        <ModalContent>
          <ModalCloseButton type="button" className="modal-close-button" onClick={handleCloseButtonPress}>
            <CloseIcon />
          </ModalCloseButton>
          {modalHeader && modalHeader}
          {modalContent && modalContent}
        </ModalContent>
      </ModalContainer>
    </FocusTrap>
  );
};

export default Modal;
