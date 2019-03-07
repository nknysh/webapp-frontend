import styled from 'styled-components';

import { Select as BaseSelect, Markdown, Checkbox } from 'components';
import theme from 'styles/theme';
import { Input as BaseInput, Button as BaseButton } from 'styles/elements';
import { ServerError } from 'styles/errors';
import breakpoints from 'styles/breakpoints';

export const StyledCreateAccount = styled.div`
  padding: ${theme.gutter}px;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 5}px;
  `}
`;

export const Container = styled.div`
  background-color: ${theme.primary};
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const Row = styled.div`
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
`;

export const Field = styled.div`
  text-align: left;
`;

export const Input = styled(BaseInput)`
  margin-bottom: ${theme.gutter * 2}px;

  ${breakpoints.desktop`
    min-width: 395px;
  `}
`;

export const Select = styled(BaseSelect)``;

export const Actions = styled.div`
  align-items: center;
  text-align: center;
  margin-top: 50px;
`;

export const SubmitButton = styled(BaseButton)`
  ${breakpoints.tablet`
    width: 400px;
  `}
`;

export const SubmitText = styled.span`
  color: ${theme.colors.white};
`;

export const Columns = styled.div`
  display: block;

  ${breakpoints.desktop`
    display: flex;
  `}
`;

export const Column = styled.div`
  ${breakpoints.desktop`
    flex: 1 1 50%;
    padding: ${theme.gutter * 5}px;

    &:first-child {
      padding-left: 0;
    }

    &:last-child {
      padding-right: 0;
    }
  `}
`;

export const StyledMarkdown = styled(Markdown)`
  text-align: center;
  font-size: 16px;
  color: ${theme.colors['gold-neutral']};
`;

export const StyledCheckbox = styled(Checkbox)`
  text-align: center;

  label span {
    font-weight: bold !important;
    color: ${theme.primary} !important;
    text-transform: uppercase !important;

    a {
      cursor: pointer;
      color: ${theme.secondary} !important;
      text-decoration: underline;
    }
  }
`;

export const InfoMarkdown = styled(Markdown)`
  text-align: center;
  font-size: 12;
  color: ${theme.colors['gold-neutral']};
  margin: ${theme.gutter * 4}px auto 0;

  p {
    margin: ${theme.gutter / 2}px 0;
  }

  ${breakpoints.tablet`
    max-width: 475px;
  `}
`;

export const Center = styled.div`
  text-align: center;
`;

export const ServerErrorContent = styled(ServerError)`
  ${breakpoints.tablet`
    margin: 0 auto;
  `}
`;
