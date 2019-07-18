import React from 'react';

import { propTypes, defaultProps } from './Modal.props';
import { StyledModal, ModalOverlay, ModalContent, ModalClose } from './Modal.styles';

const renderCloseCross = ({ onClose }) => <ModalClose onClick={onClose}>close</ModalClose>;

export const Modal = ({ children, onClose, modalContentProps, ...props }) => (
  <StyledModal
    onClose={onClose}
    onBackdropClick={onClose}
    onEscapeKeyDown={onClose}
    disablePortal={true}
    BackdropComponent={ModalOverlay}
    {...props}
  >
    <ModalContent {...modalContentProps}>
      {children}
      {renderCloseCross({ onClose })}
    </ModalContent>
  </StyledModal>
);

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
