import styled from 'styled-components';

import { Markdown, Checkbox } from 'components';
import theme from 'styles/theme';
import { Button as BaseButton } from 'styles/elements';
import { ServerError } from 'styles/errors';
import breakpoints from 'styles/breakpoints';

export const StyledCreateAccount = styled.div`
  padding: ${theme.gutter * 7}px ${theme.gutter * 2}px;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 6}px ${theme.gutter * 10.2}px ${theme.gutter * 4.4}px;
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
    box-sizing: content-box;
    flex: 1 1 50%;
    padding: 0 ${theme.gutter * 5.2}px;
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
  margin-top: ${theme.gutter * 1.5}px;

  label span {
    font-weight: ${theme.fonts.bold} !important;
    color: ${theme.primary} !important;
    text-transform: uppercase !important;
    font-size: ${theme.fonts.sizes.normal - 1}px !important;

    a {
      cursor: pointer;
      color: ${theme.secondary} !important;
      text-decoration: underline;
    }
  }
`;

export const InfoMarkdown = styled(Markdown)`
  text-align: center;
  font-size: ${theme.fonts.sizes.default}px;
  color: ${theme.neutral};
  margin: ${theme.gutter * 4}px auto 0;

  p {
    line-height: 14px;
    margin: 0;
  }

  ${breakpoints.tablet`
    max-width: 475px;
  `}
`;

export const ServerErrorContent = styled(ServerError)`
  ${breakpoints.tablet`
    margin: 0 auto ${theme.gutter * 4}px;
  `}
`;

export const InnerRows = styled.div`
  box-sizing: content-box;
  ${breakpoints.desktop`
  display: flex;
  flex-direction: column;
  `}
`;

export const InnerRow = styled.div`
  ${breakpoints.desktop`
  display: flex;

  > div {

    min-width: 230px;
    margin-right: ${theme.gutter * 1.3}px;
    margin-left: ${theme.gutter * 1.3}px;

    :first-child {
      margin-left: 0;
    }
  
    :last-child {
      margin-right: 0;
    }
  }
`}
`;
