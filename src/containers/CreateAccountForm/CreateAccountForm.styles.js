import styled from 'styled-components';
import { Markdown, Checkbox, Button, ServerError } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const StyledCreateAccount = styled.div`
  padding: ${theme.spacing.gutter * 7}px ${theme.spacing.gutter * 2}px;

  ${props => props.theme.breakpoints.tablet`
    padding: ${theme.spacing.gutter * 6}px ${theme.spacing.gutter * 10.2}px ${theme.spacing.gutter * 4.4}px;
  `}

  .existing-partners {
    display: flex;

    label {
      flex: 0 1;
    }
  }

  .material-select {
    min-width: 230px;
  }
`;

export const Actions = styled.div`
  align-items: center;
  text-align: center;
  margin-top: 50px;
`;

export const SubmitButton = styled(Button)`
  ${props => props.theme.breakpoints.tablet`
    width: 400px;
  `}
`;

export const SubmitText = styled.span`
  color: ${theme.colors.white};
`;

export const Columns = styled.div`
  display: block;

  ${props => props.theme.breakpoints.desktop`
    display: flex;
  `}
`;

export const Column = styled.div`
  ${props => props.theme.breakpoints.desktop`
    box-sizing: content-box;
    flex: 1 1 50%;
    padding: 0 ${theme.spacing.gutter * 5.2}px;
    min-width: ${theme.spacing.gutter * 5 + 395}px;

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
  color: ${theme.palette.neutral};
`;

export const StyledCheckbox = styled(Checkbox)`
  margin-top: ${theme.spacing.gutter * 1.5}px;

  label span {
    font-weight: ${theme.fonts.bold} !important;
    color: ${theme.palette.primary} !important;
    text-transform: uppercase !important;
    font-size: ${theme.fonts.sizes.normal - 1}px !important;

    a {
      cursor: pointer;
      color: ${theme.palette.secondary} !important;
      text-decoration: underline;
    }
  }
`;

export const InfoMarkdown = styled(Markdown)`
  text-align: center;
  font-size: ${theme.fonts.sizes.default}px;
  color: ${theme.palette.neutral};
  margin: ${theme.spacing.gutter * 4}px auto 0;

  p {
    line-height: 14px;
    margin: 0;
  }

  ${props => props.theme.breakpoints.tablet`
    max-width: 475px;
  `}
`;

export const ServerErrorContent = styled(ServerError)`
  ${props => props.theme.breakpoints.tablet`
    margin: 0 auto ${theme.spacing.gutter * 4}px;
  `}
`;

export const InnerRows = styled.div`
  box-sizing: content-box;
  ${props => props.theme.breakpoints.desktop`
  display: flex;
  flex-direction: column;
  `}
`;

export const InnerRow = styled.div`
  ${props => props.theme.breakpoints.desktop`
  display: flex;

  > div {

    min-width: 230px;
    margin-right: ${theme.spacing.gutter * 1.3}px;
    margin-left: ${theme.spacing.gutter * 1.3}px;

    :first-child {
      margin-left: 0;
    }
  
    :last-child {
      margin-right: 0;
    }
  }
`}
`;
