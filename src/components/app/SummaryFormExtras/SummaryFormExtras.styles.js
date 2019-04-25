import styled from 'styled-components';

export { Title } from 'components/app/SummaryForm/SummaryForm.styles';

import theme from 'styles/theme';
import { withCurrency } from 'styles/elements';

export const OptionLabel = styled.span``;

export const OptionRate = styled.span`
  display: block;
`;

export const OptionPrice = styled.span`
  ${withCurrency};
`;

export const Extra = styled.div`
  margin-bottom: ${theme.gutter * 4}px;
`;
