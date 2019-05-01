import styled from 'styled-components';

import { Markdown, Checkbox } from 'components';
import theme from 'styles/theme';
import { Button as BaseButton } from 'styles/elements';
import { ServerError } from 'styles/errors';
import breakpoints from 'styles/breakpoints';

export const StyledCreateAccount = styled.div`
  padding: ${theme.gutter}px;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 5}px;
  `}
`;

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
    min-width: ${theme.gutter * 5 + 395}px;

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
  font-size: ${theme.fonts.sizes.mid}px;
  color: ${theme.neutral};
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
  color: ${theme.neutral};
  margin: ${theme.gutter * 4}px auto 0;

  p {
    margin: ${theme.gutter / 2}px 0;
  }

  ${breakpoints.tablet`
    max-width: 475px;
  `}
`;

export const ServerErrorContent = styled(ServerError)`
  ${breakpoints.tablet`
    margin: 0 auto;
  `}
`;
