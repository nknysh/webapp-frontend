import styled from 'styled-components';

import { Checkbox } from 'components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { ServerError } from 'styles/errors';
import { Button as BaseButton } from 'styles/elements';

export const StyledLoginForm = styled.div`
  padding: ${theme.gutter}px;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 5}px;
    min-width: 500px;
  `}
`;

export const Actions = styled.div`
  margin-top: 50px;
`;

export const SubmitButton = styled(BaseButton)``;

export const SubmitText = styled.span`
  color: ${theme.colors.white};
`;

export const StyledCheckbox = styled(Checkbox)`
  label span {
    text-transform: uppercase !important;
  }
`;

export const ServerErrorContent = styled(ServerError)`
  margin-bottom: ${theme.gutter * 2}px;
`;

export const ForgotPassword = styled.div`
  margin-top: ${theme.gutter * 3}px;
  text-align: center;
`;

export const ForgotLink = styled.span`
  color: ${theme.primary};
  text-transform: uppercase;
  text-align: center;
  font-size: 12px;
  cursor: pointer;
`;
