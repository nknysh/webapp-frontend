import styled from 'styled-components';

import theme from 'styles/theme';

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
