import React from 'react';
import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '../Buttons/index';
import * as theme from 'pureUi/pureUiTheme';

interface IDismissableNotificationProps extends React.HTMLAttributes<HTMLDivElement> {
  type: string;
  onDismiss: Function;
  className?: string; // from styled components
}

const _DismissableNotification = (props: IDismissableNotificationProps) => {
  const { type, children, onDismiss, className } = props;
  return (
    <div className={`${className} ${type} dismissable-notification`}>
      <div className="children">{children}</div>

      <IconButton
        onClick={e => {
          onDismiss(e);
        }}
      >
        <CloseIcon />
      </IconButton>
    </div>
  );
};

export const DismissableNotification = styled(_DismissableNotification)`
  display: flex;
  padding: 8px;
  margin-bottom: 8px;

  .children {
    flex: 1;
  }

  &.error {
    border-bottom: 2px solid red;
    background: ${theme.colors.redLight};
    color: ${theme.colors.redFade};
  }
`;

export default DismissableNotification;
