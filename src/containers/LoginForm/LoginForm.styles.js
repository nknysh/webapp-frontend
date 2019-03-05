import styled from 'styled-components';

import { Checkbox } from 'components';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { Title as BaseTitle, Input as BaseInput, Button as BaseButton } from 'styles/elements';

export const StyledLoginForm = styled.div`
  padding: ${theme.gutter}px;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 5}px;
  `}
`;

export const Title = styled(BaseTitle)``;

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
