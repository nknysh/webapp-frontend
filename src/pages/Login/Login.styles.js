import styled from 'styled-components';

import theme from 'styles/theme';
import { Input as BaseInput, Button as BaseButton } from 'styles/elements';

export const Container = styled.div`
  background: ${theme.primary};
  text-align: center;
  width: 100%;
`;

export const Fill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Content = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Modal = styled.div`
  width: 600${theme.unit};
  padding: 80${theme.unit};
  background-color: ${theme.colors.white};
  margin: 50${theme.unit};
`;

export const Title = styled.h1`
  text-align: center;
  display: block;

  color: ${theme.secondary};
`;

export const Fields = styled.div`
  margin-top: 50${theme.unit};
  text-align: left;
`;

export const Field = styled.div``;

export const Input = styled(BaseInput)``;

export const Actions = styled.div`
  margin-top: 50${theme.unit};
`;

export const ForgotPassword = styled.div`
  margin-top: 50${theme.unit};
`;

export const ForgotLink = styled.span`
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
  font-size: 12${theme.unit};
  text-decoration: none;
`;

export const SubmitButton = styled(BaseButton)``;

export const SubmitText = styled.span`
  color: ${theme.colors.white};
`;
