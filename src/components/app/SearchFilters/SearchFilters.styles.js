import styled, { css } from 'styled-components';

import { RadioButton, Checkbox, Range } from 'components/elements';

import theme from 'styles/theme';
import { Button, withCurrency } from 'styles/elements';

const headerSpacing = theme.gutter * 2 - theme.gutter / 2;

export const Title = styled.h4`
  color: ${theme.colors['gold-neutral']};
  font-size: 12px;
  font-weight: bold;
  padding: 0 0 ${headerSpacing}px;
  margin: 0 0 ${headerSpacing}px;
  text-transform: uppercase;
  border-bottom: 1px solid ${theme.colors['gray-medium']};
`;

export const SectionField = styled.div`
  position: relative;
  margin-bottom: ${theme.gutter * 3}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const RegionRadioButton = styled(RadioButton)`
  label {
    display: block;
    width: 100%;
    flex: none;
    display: flex;
  }
`;

export const MealPlanRadioButton = styled(RadioButton)`
  label {
    max-width: 25%;
    margin: 0 !important;

    > span {
      width: ${theme.gutter * 2}px;
      margin-right: ${theme.gutter}px;
    }
  }
`;

export const MealTypeTip = styled.div`
  display: block;
  margin-bottom: ${theme.gutter}px;
  display: flex;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const MealTypeKey = styled.span`
  font-weight: bold;
  color: ${theme.primary};
  margin-right: ${theme.gutter}px;
  flex: 0 1;
`;

export const RegionCheckbox = styled(Checkbox)`
  margin-left: ${theme.gutter * 3}px;
`;

export const SideBarButton = styled(Button)`
  font-size: 12px;
`;

export const PriceRange = styled(Range)``;

export const PriceRangeLabels = styled.div`
  display: flex;
  margin: ${theme.gutter * 2}px 0 ${theme.gutter}px;
`;

export const PriceRangeLabel = styled.div`
  flex: 1;
  font-size: 10px;
  text-transform: uppercase;

  ${({ ['data-align']: align }) => css`
    text-align: ${align};
  `}
`;

export const PriceRangeLabelPrice = styled.span`
  ${withCurrency};
  font-weight: ${theme.bold};
`;
