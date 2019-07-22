import styled from 'styled-components';

import { Button, ServerError, Checkbox, Markdown } from 'components/elements';
import { theme, breakpoints } from 'styles';

export const StyledPasswordResetForm = styled.div`
  padding: ${theme.gutter}px;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 5}px;
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
  margin-top: ${theme.gutter * 2}px;
`;

export const StyledMarkdown = styled(Markdown)`
  text-align: center;
  margin-bottom: ${theme.gutter * 4}px;

  p {
    margin: ${theme.gutter / 2}px 0;
  }

  ${breakpoints.tablet`
    width: 400px;
  `}
`;
