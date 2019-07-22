import styled, { css } from 'styled-components';

import { theme } from 'styles';

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
  color: ${theme.neutral};
  text-transform: uppercase;
  font-size: ${theme.fonts.sizes.normal}px;
  letter-spacing: 0.46px;
  line-height: ${theme.fonts.sizes.normal}px;
  font-size: ${theme.fonts.sizes.default}px;
`;
