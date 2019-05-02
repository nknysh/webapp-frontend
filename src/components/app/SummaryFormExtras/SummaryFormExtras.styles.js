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

export const ExtraSummary = styled.div`
  display: flex;
  font-size: ${theme.fonts.sizes.default}px;
  text-transform: uppercase;
  letter-spacing: 0.46px;
  line-height: 20px;
  border-bottom: 1px solid ${theme.borders.default};
  padding: ${theme.gutter * 2}px 0;
`;

export const ExtraSummaryTitle = styled.div`
  width: 40%;
  font-weight: ${theme.fonts.bold};
`;

export const ExtraSummaryProduct = styled.div`
  flex: 1 1 100%;
`;

export const ExtraSummaryTotal = styled.div`
  ${withCurrency};
  flex: 1;
  text-align: right;
`;
