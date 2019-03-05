import styled from 'styled-components';

import { Checkbox, Markdown } from 'components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Input as BaseInput, Button as BaseButton } from 'styles/elements';

export const StyledPasswordResetForm = styled.div`
  padding: ${theme.gutter}px;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 5}px;
  `}
`;

export const Fields = styled.div`
  margin-top: 50px;
  text-align: left;

  ${breakpoints.tablet`
    min-width: 400px;
  `}
`;

export const Field = styled.div`
  margin-bottom: ${theme.gutter * 2}px;
`;

export const Input = styled(BaseInput)``;

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

export const ServerErrorContent = styled(Markdown)`
  border: 1px solid ${theme.primary};
  background: ${theme.colors.whiteish};
  text-align: center;
  padding: ${theme.gutter}px;

  ${breakpoints.tablet`
    width: 400px;
  `}

  h3 {
    font-family: ${theme.headingFont};
    color: ${theme.primary};
    font-size: 14px;
  }

  p {
    font-size: 12px;
  }
`;

export const StyledMarkdown = styled(Markdown)`
  text-align: center;

  p {
    margin: ${theme.gutter / 2}px 0;
  }

  ${breakpoints.tablet`
    width: 400px;
  `}
`;
