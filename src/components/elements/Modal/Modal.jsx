import React from 'react';

import { propTypes, defaultProps } from './Modal.props';
import { StyledModal, ModalOverlay, ModalContent, ModalClose } from './Modal.styles';

export const Modal = ({ children, onClose, modalContentProps, ...props }) => {
  const renderCloseCross = () => <ModalClose onClick={onClose}>close</ModalClose>;

  return (
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
        {renderCloseCross()}
      </ModalContent>
    </StyledModal>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
