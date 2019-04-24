import styled from 'styled-components';

import Label from 'components/elements/Label';
import { default as BaseNumberSelect } from 'components/elements/NumberSelect';

import theme from 'styles/theme';

export const Section = styled.div`
  padding: ${theme.gutter}px;
  border-bottom: 1px solid ${theme.borderColor};
`;

export const Entry = styled.div`
  display: flex;
  align-items: center;
`;

export const EntryLabel = styled(Label)`
  flex: 1;

  > span {
    font-size: 13px !important;
  }
`;

export const NumberSelect = styled(BaseNumberSelect)`
  flex: 1;
`;
