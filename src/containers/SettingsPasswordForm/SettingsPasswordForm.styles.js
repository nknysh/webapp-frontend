import styled from 'styled-components';

import { theme, breakpoints } from 'styles';

export const PasswordReset = styled.div`
  padding: ${theme.gutter * 8}px ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 8}px;
    min-width: 600px;
  `}
`;
