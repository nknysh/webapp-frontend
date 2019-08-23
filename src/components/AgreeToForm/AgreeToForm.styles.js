import styled from 'styled-components';

import { theme } from 'styles';

export const TransferForm = styled.div`
  > div {
    margin-bottom: ${theme.spacing.gutter * 4}px;
  }
  label {
    color: ${theme.palette.secondary};
    text-transform: uppercase;
    line-height: 14px;
  }
`;
