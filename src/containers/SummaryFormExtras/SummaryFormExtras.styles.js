import styled from 'styled-components';
import { Icon } from '@material-ui/core';

export { Title } from 'containers/SummaryForm/SummaryForm.styles';

import { Checkbox } from 'components/elements';

import theme from 'styles/theme';
import { withCurrency, withDiscountStyles } from 'styles/elements';

import { ContextMenu as BaseContextMenu } from 'components/elements';

export { Button } from 'styles/elements';

export const OptionLabel = styled.span``;

export const OptionRate = styled.span`
  display: block;
`;

export const OptionPrice = styled.span`
  ${withCurrency};
  ${withDiscountStyles};
`;

export const OptionOffer = styled.span`
  display: block;
  ${withDiscountStyles};
`;

export const Extra = styled.div`
  margin-bottom: ${theme.gutter * 4}px;

  label {
    margin-bottom: ${theme.gutter}px;
  }
`;

export const ExtraSummary = styled.div`
  position: relative;
  display: flex;
  font-size: ${theme.fonts.sizes.default}px;
  text-transform: uppercase;
  letter-spacing: 0.46px;
  line-height: 20px;
  border-bottom: 1px solid ${theme.borders.default};
  padding: ${theme.gutter * 2}px 0;
`;

export const ExtraSummaryTitle = styled.div`
  font-weight: ${theme.fonts.bold};
  flex: 0 0 140px;
  width: 140px;
`;

export const ExtraSummaryProduct = styled.div`
  flex: 1 1 100%;
  margin: 0 ${theme.gutter}px;
`;

export const ExtraSummaryTotal = styled.div`
  ${withCurrency};
  ${withDiscountStyles};
  display: block;
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
  flex: 1;
`;

export const AddonSummary = styled.div`
  display: flex;
  margin-bottom: ${theme.gutter * 2}px;
`;

export const ContextMenu = styled(BaseContextMenu)`
  flex: 0 1;
  padding: 0 0 0 ${theme.gutter / 2}px;
`;

export const ModalContent = styled.div`
  max-width: 600px;
  padding: ${theme.gutter * 6}px;
`;

export const TravelAgent = styled.p`
  text-transform: uppercase;
  font-weight: bold;
  padding: ${theme.gutter}px 0;
  font-size: ${theme.fonts.sizes.default}px;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-top: 1px dotted ${theme.borders.default};
  border-bottom: 1px dotted ${theme.borders.default};
  width: 100%;
`;

export const TravelAgentName = styled.span`
  flex: 1 0 auto;
`;

export const Clear = styled(Icon)`
  color: ${theme.error};
  flex: 0 0 auto;
`;

export const Description = styled.p`
  font-size: ${theme.fonts.sizes.default}px;
  text-transform: uppercase;
  color: ${theme.secondary};
  line-height: 1.5;
`;

export const ExtraSummaryTotals = styled.div`
  flex: 1;
`;

export const ExtraOffer = styled.span`
  display: block;
  ${withDiscountStyles};
`;
