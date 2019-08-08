import React from 'react';
import { Tooltip } from '@material-ui/core';

import { propTypes, defaultProps } from './ToolTip.props';
import { StyledToolTip, ToolTipIcon, ToolTipContent, Label } from './ToolTip.styles';

const ToolTip = ({ className, children, label, helpText, ...props }) => (
  <StyledToolTip className={className}>
    <Tooltip
      disableFocusListener
      placement="top"
      PopperProps={{ disablePortal: true }}
      classes={{ tooltip: 'tooltip', popper: 'popper' }}
      {...props}
      title={<ToolTipContent>{children}</ToolTipContent>}
    >
      {label ? <Label data-highlight={helpText}>{label}</Label> : <ToolTipIcon>info</ToolTipIcon>}
    </Tooltip>
  </StyledToolTip>
);

ToolTip.propTypes = propTypes;
ToolTip.defaultProps = defaultProps;

export default ToolTip;
