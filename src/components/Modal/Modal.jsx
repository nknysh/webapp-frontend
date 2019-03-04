import React from 'react';

import { propTypes, defaultProps } from './Modal.props';
import { StyledModal, ModalOverlay, ModalContent, ModalClose } from './Modal.styles';

export const Modal = ({ children, onClose, ...props }) => {
  const renderCloseCross = () => <ModalClose onClick={onClose}>close</ModalClose>;

  return (
    <StyledModal onClose={onClose} disablePortal={true} BackdropComponent={ModalOverlay} {...props}>
      <ModalContent>
        {children}
        {renderCloseCross()}
      </ModalContent>
    </StyledModal>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

export default Modal;
