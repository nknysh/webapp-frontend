import styled from 'styled-components';

import { theme } from 'styles';

export const PasswordReset = styled.div`
  padding: ${theme.spacing.gutter * 8}px ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
    padding: ${theme.spacing.gutter * 8}px;
    min-width: 600px;
  `}
`;
