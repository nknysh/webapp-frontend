import styled from 'styled-components';
import { Checkbox, Markdown, ServerError } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const StyledSetPasswordForm = styled.div`
  padding: ${theme.spacing.gutter}px;

  ${props => props.theme.breakpoints.tablet`
    padding: ${theme.spacing.gutter * 5}px;
    min-width: 500px;
  `}
`;

export const Fields = styled.div`
  margin-top: 50px;
  text-align: left;

  ${props => props.theme.breakpoints.tablet`
    min-width: 400px;
  `}
`;

export const Field = styled.div`
  margin-bottom: ${theme.spacing.gutter * 2}px;
`;

export const Actions = styled.div`
  margin-top: 50px;
`;

export const SubmitText = styled.span`
  color: ${theme.colors.white};
`;

export const StyledCheckbox = styled(Checkbox)`
  label span {
    text-transform: uppercase !important;
  }
`;

export const ServerErrorContent = styled(ServerError)``;

export const StyledMarkdown = styled(Markdown)`
  text-align: center;

  p {
    margin: ${theme.spacing.gutter / 2}px 0;
  }

  ${props => props.theme.breakpoints.tablet`
    width: 400px;
  `}
`;
