import styled, { css } from 'styled-components';

import theme from 'styles/theme';

export const StyledInput = styled.input`
  font-family: ${theme.fonts.defaultFont};
  background: ${theme.backgrounds.default};
  margin-top: ${theme.gutter / 2}px;
  display: block;
  border: 1px solid ${theme.borders.default};
  color: ${theme.colors.black};
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.gutter}px;

  ${({ disabled }) =>
    disabled &&
    css`
      background: ${theme.backgrounds.light};
    `}

  ::placeholder {
    color: ${theme.colors.gray};
  }
`;
