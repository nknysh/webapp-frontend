import styled, { css } from 'styled-components';

import { theme, buttonStyles } from 'styles';

export const Button = styled.button`
  ${buttonStyles}

  ${({ ['data-secondary']: secondary }) =>
    secondary &&
    css`
      background: ${theme.light};
    `}
`;

export default Button;
