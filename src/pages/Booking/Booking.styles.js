import styled from 'styled-components';
import { Markdown } from '@pure-escapes/webapp-ui-components';

import { theme } from 'styles';

export const StyledMarkdown = styled(Markdown)`
  h1 {
    font-family: ${theme.fonts.headingFont};
    font-weight: ${theme.fonts.normal};
    font-size: ${theme.fonts.sizes.bigger}px;
    color: ${theme.palette.neutral};
    margin: 0 0 ${theme.spacing.gutter * 2.5}px;
    padding: 0;
    letter-spacing: 0.85px;
    line-height: 20px;
  }

  h2 {
    text-transform: uppercase;
    color: ${theme.palette.primary};
    font-size: ${theme.fonts.sizes.default}px;
    letter-spacing: ${theme.fonts.letterSpacing.medium}px;
    line-height: 14px;
    margin: 0 0 ${theme.spacing.gutter * 3.5}px;
    padding: 0 0 ${theme.spacing.gutter * 1.5}px;
    border-bottom: 1px solid ${theme.borders.normal};
  }

  p {
    font-size: ${theme.fonts.sizes.mid}px;
    line-height: 28px;
    padding: 0;
    margin: 0 0 ${theme.spacing.gutter * 2}px;
  }
`;
