import styled, { css } from 'styled-components';

import theme from './theme';

export const buttonStyles = css`
  width: 100%;
  font-size: ${theme.fonts.sizes.big}px;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  font-family: ${theme.fonts.defaultFont};
  color: ${theme.colors.white};
  background: ${theme.primary};
  outline: none;
  border: 0;
  padding: ${theme.gutter}px ${theme.gutter}px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    background: ${theme.secondary};
  }
`;
export const Button = styled.button`
  ${buttonStyles}

  ${({ ['data-secondary']: secondary }) =>
    secondary &&
    css`
      background: ${theme.light};
    `}
`;

export default Button;
