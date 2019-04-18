import styled from 'styled-components';

import { Markdown } from 'components/elements';

import theme from 'styles/theme';

export const StyledMarkdown = styled(Markdown)`
  font-size: 16px;
  color: ${theme.colors['gold-dark']};
  margin-bottom: ${theme.gutter * 6}px;
`;

export const TransferForm = styled.div`
  > div {
    margin-bottom: ${theme.gutter * 4}px;
  }
  label {
    color: ${theme.colors['gold-dark']};
    text-transform: uppercase;
    line-height: 14px;
  }
`;
