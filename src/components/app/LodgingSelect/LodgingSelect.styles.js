import styled from 'styled-components';

import { Label, NumberSelect } from 'components/elements';

import theme from 'styles/theme';

export const StyledLodgingSelect = styled.div``;

export const LodgingSelectLabel = styled(Label)``;

export const LodgingSelectSection = styled.div`
  padding: ${theme.gutter}px;
  border-bottom: 1px solid ${theme.borders.default};
`;

export const LodgingSelectEntry = styled.div`
  display: flex;
  align-items: center;
`;

export const LodgingSelectEntryLabel = styled(Label)`
  flex: 1;

  > span {
    font-size: ${theme.fonts.sizes.less}px !important;
  }
`;

export const LodgingSelectNumberSelect = styled(NumberSelect)`
  flex: 1;
`;