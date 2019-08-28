import styled from 'styled-components';
import { Button } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const StyledAddToProposalForm = styled.div`
  label,
  input,
  .material-select {
    width: 100%;
    text-transform: uppercase;
    font-family: ${theme.fonts.defaultFont} !important;
  }
`;

export const Actions = styled.div`
  align-items: center;
  text-align: center;
  margin-top: 50px;
`;

export const SubmitButton = styled(Button)`
  ${props => props.theme.breakpoints.tablet`
    width: 400px;
  `}
`;

export const SubmitText = styled.span`
  color: ${theme.colors.white};
`;
