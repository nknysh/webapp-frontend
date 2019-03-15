import React from 'react';
import { Tooltip } from '@material-ui/core';

import { propTypes, defaultProps } from './ToolTip.props';
import { StyledToolTip, ToolTipIcon, ToolTipContent } from './ToolTip.styles';

const ToolTip = ({ children, ...props }) => (
  <StyledToolTip>
    <Tooltip
      placement="top"
      PopperProps={{ disablePortal: true }}
      classes={{ tooltip: 'tooltip', popper: 'popper' }}
      {...props}
      title={<ToolTipContent>{children}</ToolTipContent>}
    >
      <ToolTipIcon>info</ToolTipIcon>
    </Tooltip>
  </StyledToolTip>
);

ToolTip.propTypes = propTypes;
ToolTip.defaultProps = defaultProps;

export default ToolTip;
