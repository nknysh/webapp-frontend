import styled from 'styled-components';

import { Markdown } from 'components/elements';

import theme from 'styles/theme';

export const StyledMarkdown = styled(Markdown)`
  font-size: ${theme.fonts.sizes.mid}px;
  color: ${theme.secondary};
  margin-bottom: ${theme.gutter * 6}px;
`;

export const TransferForm = styled.div`
  > div {
    margin-bottom: ${theme.gutter * 4}px;
  }
  label {
    color: ${theme.secondary};
    text-transform: uppercase;
    line-height: 14px;
  }
`;
