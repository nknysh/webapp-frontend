import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import FocusTrap from 'focus-trap-react';

const ModalContainer = styled.div`
  position: fixed;
  z-index: 9999; /* needs to be this high to cover the gallery buttons */
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
  return (
    <FocusTrap>
      <ModalContainer onClick={e => e.preventDefault()} className={`modal ${isOpen ? 'modal-open' : 'modal-closed'}`}>
        <ModalContent>
          <ModalCloseButton type="button" className="modal-close-button" onClick={() => onClose()}>
            <CloseIcon />
          </ModalCloseButton>
          {modalHeader && <h2>{modalHeader}</h2>}
          {modalContent && <p>{modalContent}</p>}
        </ModalContent>
      </ModalContainer>
    </FocusTrap>
  );
};

export default Modal;
