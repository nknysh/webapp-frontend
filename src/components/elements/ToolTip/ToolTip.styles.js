import styled from 'styled-components';
import { Icon } from '@material-ui/core';

import { theme, h2Styling } from 'styles';

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
      font-size: ${theme.fonts.sizes.normal}px;
    }
  }
`;

export const ToolTipIcon = styled(Icon)`
  font-size: ${theme.fonts.sizes.normal}px !important;
  cursor: pointer;
`;

export const ToolTipContent = styled.div`
  font-family: ${theme.fonts.defaultFont};
  background: ${theme.backgrounds.default};
  border: 1px solid ${theme.borders.default};
  padding: ${theme.gutter * 2}px;
  font-size: 11px;
  color: ${theme.colors.black};
  font-weight: ${theme.fonts.normal};
  border-radius: ${theme.borderRadius}px;
  box-shadow: ${theme.boxShadows.default};
  position: relative;
`;
