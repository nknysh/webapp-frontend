import styled from 'styled-components';
import { Icon } from '@material-ui/core';

import theme from 'styles/theme';
import { h2Styling } from 'styles/typography';

export const StyledToolTip = styled.div`
  padding: 0 ${theme.gutter / 2}px;
  display: inline-block;

  .tooltip,
  .popper {
    background: none !important;
    opacity: 1 !important;
    color: ${theme.black} !important;

    > .tooltip {
      background: none !important;
    }

    h2 {
      ${h2Styling}
      text-transform: uppercase;
      font-size: 12px;
    }
  }
`;

export const ToolTipIcon = styled(Icon)`
  font-size: 14px !important;
  cursor: pointer;
`;

export const ToolTipContent = styled.div`
  font-family: ${theme.defaultFont};
  background: ${theme.backgroundColor};
  border: 1px solid ${theme.borderColor};
  padding: ${theme.gutter * 2}px;
  font-size: 11px;
  color: ${theme.colors.black};
  font-weight: ${theme.normal};
  border-radius: ${theme.borderRadius};
  box-shadow: ${theme.boxShadow};
  position: relative;
`;
