import styled from 'styled-components';
import { Button, ServerError, Checkbox, Markdown } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const StyledPasswordResetForm = styled.div`
  padding: ${theme.spacing.gutter}px;

  ${props => props.theme.breakpoints.tablet`
    padding: ${theme.spacing.gutter * 5}px;
  `}
`;

export const Actions = styled.div`
  margin-top: 50px;
`;

export const SubmitButton = styled(Button)``;

export const SubmitText = styled.span`
  color: ${theme.colors.white};
`;

export const StyledCheckbox = styled(Checkbox)`
  label span {
    text-transform: uppercase !important;
  }
`;

export const ServerErrorContent = styled(ServerError)`
  margin-top: ${theme.spacing.gutter * 2}px;
`;

export const StyledMarkdown = styled(Markdown)`
  text-align: center;
  margin-bottom: ${theme.spacing.gutter * 4}px;

  p {
    margin: ${theme.spacing.gutter / 2}px 0;
  }

  ${props => props.theme.breakpoints.tablet`
    width: 400px;
  `}
`;
