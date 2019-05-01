import styled, { css } from 'styled-components';

import theme from 'styles/theme';

export const StyledLabel = styled.label`
  span {
    ${({ ['data-bold']: bold }) =>
      bold &&
      css`
        font-weight: ${theme.fonts.bold};
        color: ${theme.colors['gold-light']};
      `}
  }
`;

export const Text = styled.span`
  color: ${theme.primary};
  text-transform: uppercase;
  font-size: ${theme.fonts.sizes.normal}px;
`;
