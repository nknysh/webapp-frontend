import React, { useEffect } from 'react';
import styled from 'styled-components';
import FocusTrap from 'focus-trap-react';
import { Icon } from '@material-ui/core';
import { IPureUiModalView } from '../../interfaces';

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

const ModalContentWrapper = styled.div`
  background-color: #fefefe;
  margin: auto;
  margin-top: 8vh;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  cursor: default;
  overflow-y: auto;
  max-height: calc(92vh - 8vh);
`;

const ModalCloseButton = styled.button`
  float: right;
  background: none;
  border: none;
  cursor: pointer;
`;

const Modal = (props: IPureUiModalView) => {
  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp, true);

    return () => {
      document.removeEventListener('keyup', handleKeyUp, true);
    };
  }, []);

  const handleKeyUp = e => {
    if (e.key === 'Escape') {
      props.onClose();
    }
  };

  const handleCloseButtonPress = () => props.onClose();
  return (
    <FocusTrap>
      <ModalContainer className={props.className || ''} onClick={e => e.stopPropagation()}>
        <ModalContentWrapper>
          <ModalCloseButton type="button" className="modal-close-button" onClick={handleCloseButtonPress}>
            <Icon>close</Icon>
          </ModalCloseButton>

          {props.children}
        </ModalContentWrapper>
      </ModalContainer>
    </FocusTrap>
  );
};

export default Modal;
