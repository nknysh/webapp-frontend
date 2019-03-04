import styled from 'styled-components';
import { Icon } from '@material-ui/core';

import theme from 'styles/theme';

export const StyledToolTip = styled.div`
  padding: 0 ${theme.gutter / 2}px;
  display: inline-block;
`;

export const ToolTipIcon = styled(Icon)`
  font-size: 14px !important;
`;

export const ToolTipContent = styled.div`
  font-family: ${theme.defaultFont};
  background: ${theme.backgroundColor};
  border: 1px solid ${theme.borderColor};
  padding: ${theme.gutter}px;
  font-size: 11px;
  color: ${theme.colors.black} !important;
`;
