import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';

import { Input, inputStyles } from 'styles/elements';
import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

export const StyledDropDownContent = styled.div``;

export const DropDownContentOverlay = styled.div`
  background: ${theme.colors['gold-dark']};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3005;
  opacity: 0.4;

  ${breakpoints.tablet`
    display: none;
  `}
`;

export const DropDownContentInputWrapper = styled.div`
  position: relative;
`;

const dropDownInputStyles = css`
  font-family: ${theme.defaultFont};
  text-transform: uppercase;
  font-size: 14px;

  ::placeholder {
    color: ${theme.colors.gray};
  }
`;

export const DropDownContentInput = styled(Input)`
  ${({ showRawInput }) =>
    !showRawInput &&
    css`
      position: absolute;
      top: 0;
      opacity: 0;
      z-index: 3003;
    `}
  ${dropDownInputStyles}
`;

export const DropDownContentMask = styled.div`
  ${inputStyles}
  pointer-events: none;
  z-index: 3002;
  position: relative;
  ${dropDownInputStyles}
  min-height: 37px;
  padding-right: ${theme.gutter * 3}px;

  ${({ ['data-empty']: isEmpty }) =>
    isEmpty &&
    css`
      color: ${theme.colors.gray};
    `}
`;

export const DropDownContentIcon = styled(Icon)`
  position: absolute;
  right: ${theme.gutter / 2}px;
  top: ${theme.gutter / 2}px;
  font-size: 16px;
  opacity: 1;
`;

export const dropDownContentAreaStyles = css`
  position: absolute;
  background: ${theme.backgroundColor};
  box-shadow: ${theme.boxShadow};
  z-index: 3010;
  right: 0;
  left: 0;
  min-width: 280px;
`;

export const DropDownContentArea = styled.div`
  ${dropDownContentAreaStyles}
`;
