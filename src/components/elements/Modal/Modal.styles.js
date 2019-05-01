import styled from 'styled-components';
import { Modal, Backdrop, Icon } from '@material-ui/core';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const StyledModal = styled(Modal)`
  display: flex;
  max-height: 100%;
  max-width: 100%;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
`;

export const ModalOverlay = styled(Backdrop)`
  background: ${theme.secondary} !important;
  opacity: ${theme.opacity} !important;
`;

export const ModalContent = styled.div`
  background: ${theme.backgrounds.default};
  overflow: auto;
  width: 100%;
  margin-top: 0;
  margin-bottom: auto;
  position: relative;

  ${breakpoints.tablet`
        width: auto;
        margin-top: auto;
        margin-bottom: auto;
        height: auto;
    `}
`;

export const ModalClose = styled(Icon)`
  color: ${theme.colors['gold-light']};
  position: absolute;
  top: ${theme.gutter * 2}px;
  right: ${theme.gutter * 2}px;
  cursor: pointer;
  z-index: 10000;
`;
