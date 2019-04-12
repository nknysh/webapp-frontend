import styled from 'styled-components';

import Label from 'components/Label';
import NumberSelect from 'components/NumberSelect';

import theme from 'styles/theme';

export const StyledLodgingSelect = styled.div``;

export const LodgingSelectLabel = styled(Label)``;

export const LodgingSelectSection = styled.div`
  padding: ${theme.gutter}px;
  border-bottom: 1px solid ${theme.borderColor};
`;

export const LodgingSelectEntry = styled.div`
  display: flex;
  align-items: center;
`;

export const LodgingSelectEntryLabel = styled(Label)`
  flex: 1;

  > span {
    font-size: 13px !important;
  }
`;

export const LodgingSelectNumberSelect = styled(NumberSelect)`
  flex: 1;
`;
