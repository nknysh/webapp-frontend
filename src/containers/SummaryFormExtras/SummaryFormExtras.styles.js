import styled from 'styled-components';
import { Icon } from '@material-ui/core';

import { Checkbox, ContextMenu as BaseContextMenu } from 'components';
import { theme, withCurrency, withDiscountStyles } from 'styles';

export { Title } from 'containers/SummaryForm/SummaryForm.styles';

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

export const AddonCheckbox = styled(Checkbox)`
  label {
    margin-bottom: ${theme.gutter}px;
  }
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
