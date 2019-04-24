import styled, { css } from 'styled-components';

import theme from 'styles/theme';

export const StyledInput = styled.input`
  font-family: ${theme.defaultFont};
  background: ${theme.backgroundColor};
  margin-top: ${theme.gutter / 2}px;
  display: block;
  border: 1px solid ${theme.borderColor};
  color: ${theme.colors.black};
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.gutter}px;

  ${({ disabled }) =>
    disabled &&
    css`
      background: ${theme.colors['gray-light']};
    `}

  ::placeholder {
    color: ${theme.colors.gray};
  }
`;
