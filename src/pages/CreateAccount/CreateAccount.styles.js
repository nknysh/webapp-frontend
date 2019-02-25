import styled from 'styled-components';

import theme from 'styles/theme';
import { Input as BaseInput, Button as BaseButton } from 'styles/elements';

export const Container = styled.div`
  background-color: ${theme.primary};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Fill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const Content = styled.div`
  align-items: center;
  align-self: center;
  margin-top: 40px;
  margin-bottom: 100px;
`;

export const Modal = styled.div`
  padding: 80px;
  background-color: ${theme.colors.white};
  min-width: 1024px;
`;

export const Title = styled.h1`
  text-align: center;
`;

export const Fields = styled.div`
  margin-top: 80px;
`;

export const Row = styled.div`
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
`;

export const Group = styled.div`
  flex-direction: row;
  align-items: center;
`;

export const Field = styled.div`
  text-align: left;
`;

export const Input = styled(BaseInput)`
  margin-bottom: ${theme.gutter * 2}px;
`;

export const Actions = styled.div`
  align-items: center;
  margin-top: 50px;
`;

export const SubmitButton = styled(BaseButton)``;

export const SubmitText = styled.span`
  color: ${theme.colors.white};
`;

export const Columns = styled.div`
  display: flex;
`;

export const Column = styled.div`
  flex: 1 1 50%;
  padding: ${theme.gutter}px;
`;
