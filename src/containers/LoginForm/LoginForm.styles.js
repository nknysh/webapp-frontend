import styled from 'styled-components';
import { Icon } from '@material-ui/core';

import { Checkbox } from 'components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { ServerError } from 'styles/errors';
import { Button as BaseButton } from 'styles/elements';

export const StyledLoginForm = styled.div`
  padding: ${theme.gutter * 7}px ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 5}px ${theme.gutter * 10}px ${theme.gutter * 7.4}px;
    min-width: 600px;
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
  color: ${theme.neutral};
  text-transform: uppercase;
  text-align: center;
  line-height: ${theme.fonts.sizes.normal}px;
  cursor: pointer;
  font-size: ${theme.fonts.sizes.default}px;
  letter-spacing: 0.46px;
`;

export const CompleteIcon = styled(Icon)`
  font-size: 85px !important;
  margin: 0 auto !important;
  text-align: center !important;
  width: 100% !important;
  color: ${theme.ok} !important;
`;
