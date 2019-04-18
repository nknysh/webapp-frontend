import styled, { css } from 'styled-components';
import { Icon } from '@material-ui/core';

import theme from 'styles/theme';

export const StyledNumberSelect = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

const buttonStyles = css`
  border: 0;
  outline: 0;
  width: 28px !important;
  height: 28px !important;
  background: ${theme.primary};
  border-radius: 50%;
  transition: ${theme.defaultTransition};
  cursor: pointer;
  color: ${theme.colors.white};
  font-size: 22px !important;
  padding: ${theme.gutter / 2 - 2}px !important;

  :hover {
    background: ${theme.secondary};
  }

  ${({ ['data-disabled']: isDisabled = false }) =>
    isDisabled &&
    css`
      opacity: ${theme.opacity};
      pointer-events: none;
    `}
`;

export const NumberSelectButtonContainer = styled.div`
  flex: 0;
  justify-content: center;
`;

export const NumberSelectDecrease = styled(Icon)`
  ${buttonStyles}
`;

export const NumberSelectIncrease = styled(Icon)`
  ${buttonStyles}
  text-align: right;
`;

export const NumberSelectNumber = styled.div`
  color: ${theme.colors.black};
  font-weight: ${theme.bold};
  padding: ${theme.gutter}px;
  width: 32px;
  text-align: center;
`;
