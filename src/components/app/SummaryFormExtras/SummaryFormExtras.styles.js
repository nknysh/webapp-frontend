import styled from 'styled-components';

export { Title } from 'components/app/SummaryForm/SummaryForm.styles';

import { Checkbox } from 'components/elements';

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

  label {
    margin-bottom: ${theme.gutter}px;
  }
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
  width: 23%;
  font-weight: ${theme.fonts.bold};
  flex: 1 0 23%;
`;

export const ExtraSummaryProduct = styled.div`
  flex: 1 1 100%;
  margin: 0 ${theme.gutter}px;
`;

export const ExtraSummaryTotal = styled.div`
  ${withCurrency};
  flex: 1;
  text-align: right;
`;

export const AddonCheckbox = styled(Checkbox)`
  label {
    margin-bottom: ${theme.gutter}px;
  }
`;

export const AddonSummaries = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AddonSummary = styled.div`
  display: flex;
  margin-bottom: ${theme.gutter * 2}px;
`;
