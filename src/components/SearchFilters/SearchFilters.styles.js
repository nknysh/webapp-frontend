import styled, { css } from 'styled-components';
import { RadioButton, Checkbox, Range, Button } from '@pure-escapes/webapp-ui-components';

import { theme, withCurrency } from 'styles';

export const Title = styled.h4`
  color: ${theme.palette.neutral};
  font-size: ${theme.fonts.sizes.default}px;
  font-weight: bold;
  padding: 0 0 ${theme.spacing.gutter * 1.5}px;
  margin: 0 0 ${theme.spacing.gutter * 2.6}px;
  text-transform: uppercase;
  border-bottom: 1px solid ${theme.borders.medium};
`;

export const FilterCheckbox = styled(Checkbox)`
  label > span {
    padding-top: 0;
    padding-bottom: ${theme.spacing.gutter / 2}px;
  }
`;

export const RatingsCheckbox = styled(FilterCheckbox)`
  flex: 1;
`;

export const SectionField = styled.div`
  position: relative;
  margin-bottom: ${theme.spacing.gutter * 3}px;
  font-size: ${theme.fonts.sizes.default}px !important;

  ${({ ['data-flex']: flex }) =>
    flex &&
    css`
      display: flex;
    `}

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
  display: flex;

  label {
    flex: 1 1 20%;
    margin-right: ${theme.spacing.gutter / 2}px;

    > span {
      padding-right: ${theme.spacing.gutter / 2}px;

      &:last-child {
        padding-right: 0;
      }
    }
  }
`;

export const MealTypeTip = styled.div`
  display: block;
  margin-bottom: ${theme.spacing.gutter}px;
  display: flex;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const MealTypeKey = styled.span`
  font-weight: bold;
  color: ${theme.palette.primary};
  margin-right: ${theme.spacing.gutter}px;
  flex: 0 1;
`;

export const RegionCheckbox = styled(FilterCheckbox)`
  margin-left: ${theme.spacing.gutter * 3}px;
`;

export const SideBarButton = styled(Button)`
  font-size: ${theme.fonts.sizes.normal}px;
`;

export const PriceRange = styled(Range)``;

export const PriceRangeLabels = styled.div`
  display: flex;
  margin: ${theme.spacing.gutter * 2}px 0 ${theme.spacing.gutter}px;
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
  font-weight: ${theme.fonts.bold};
`;
