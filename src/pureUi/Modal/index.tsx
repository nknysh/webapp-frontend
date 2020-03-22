import React from 'react';
import styled from 'styled-components';
import FocusTrap from 'focus-trap-react';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { IconButton } from '../Buttons/index';
import { renderPortal, PortalType } from '../../utils/portals';
import CloseIcon from '@material-ui/icons/Close';
import logo from 'public/assets/img/PE_logo.png';

export const ModalWrapper = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${pureUiTheme.colors.grayOpacity1};
`;

export const ModalFrameComponet = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { children, ...otherProps } = props;
  return (
    <FocusTrap>
      <div {...otherProps}>{children}</div>
    </FocusTrap>
  );
};

export const ModalFrame = styled(ModalFrameComponet)`
  display: flex;
  flex-direction: column;
  background-color: ${pureUiTheme.colors.white};
  position: fixed;
  padding: 80px 0 70px;
  max-height: 80vh;
  max-width: 90vw;
`;

export interface IModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  noLogo?: boolean;
}
export const ModalHeader = styled.div<IModalHeaderProps>`
  padding: 0 100px;
  padding-top: ${props => (props.noLogo ? 0 : '50px')};
  background-image: ${props => (props.noLogo ? 'none' : `url(${logo})`)};
  background-position: top center;
  background-repeat: no-repeat;
  text-align: center;
`;

export const ModalContent = styled.div`
  overflow: scroll;
  padding: 0 100px;
`;

export const ModalFooter = styled.div`
  margin-top: 30px;
  padding: 0 100px;
`;

const ModalCloseButtonComponent = (props: React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <IconButton {...props}>
      <CloseIcon />
    </IconButton>
  );
};
export const ModalCloseButton = styled(ModalCloseButtonComponent)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  color: ${pureUiTheme.colors.grayDark};
  border-radius: 40px;
`;

export interface IStandardModalProps {
  className?: string;
  children?: React.ReactNode;
  onClose: () => void;
}
export const StandardModal = (props: IStandardModalProps) => {
  const closeProxy = () => {
    props.onClose();
  };
  return renderPortal(
    <ModalWrapper>
      <ModalFrame>
        {props.children}
        <ModalCloseButton onClick={closeProxy} />
      </ModalFrame>
    </ModalWrapper>,
    PortalType.Modal
  );
};
