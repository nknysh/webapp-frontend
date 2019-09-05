import { css } from 'styled-components';

import theme from './theme';

export const buttonStyles = css`
  width: 100%;
  font-size: ${theme.fonts.sizes.big}px;
  text-transform: uppercase;
  font-weight: ${theme.fonts.bold};
  font-family: ${theme.fonts.defaultFont};
  color: ${theme.colors.white};
  background: ${theme.palette.primary};
  outline: none;
  border: 0;
  padding: ${theme.spacing.gutter}px ${theme.spacing.gutter}px;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:hover {
    background: ${theme.palette.secondary};
  }
`;

export const inputStyles = css`
  font-family: ${theme.fonts.defaultFont};
  background: ${theme.backgrounds.default};
  margin-top: ${theme.spacing.gutter / 2}px;
  display: block;
  border: 1px solid ${theme.borders.default};
  color: ${theme.colors.black};
  width: 100%;
  box-sizing: border-box;
  padding: ${theme.spacing.gutter}px;

  ${({ disabled }) =>
    disabled &&
    css`
      background: ${theme.backgrounds.light};
    `}

  ::placeholder {
    color: ${theme.colors.gray};
  }
`;

export const withDiscountStyles = css`
  ${({ ['data-discounted']: discounted }) =>
    discounted &&
    css`
      color: ${theme.palette.light};
      text-decoration: line-through;
    `}

  ${({ ['data-discount']: discount }) =>
    discount &&
    css`
      color: ${theme.colors['red-fade']};
    `}
`;
