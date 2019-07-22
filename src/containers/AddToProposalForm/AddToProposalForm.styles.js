import styled from 'styled-components';

import { Button } from 'components/elements';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';

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
  ${breakpoints.tablet`
    width: 400px;
  `}
`;

export const SubmitText = styled.span`
  color: ${theme.colors.white};
`;
