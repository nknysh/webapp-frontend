import styled from 'styled-components';

import { DatePicker, Button } from 'components';
import { theme, breakpoints, withCurrency, withDiscountStyles, Heading3 } from 'styles';

export const DatePrice = styled.div`
  ${withCurrency};
  color: ${theme.colors.black};
  font-weight: ${theme.fonts.normal};
  margin-top: ${theme.gutter / 2}px;
`;

export const EditForm = styled.section`
  padding: ${theme.gutter * 8}px ${theme.gutter * 2}px;
  position: relative;

  ${breakpoints.tablet`
    padding: ${theme.gutter * 8}px ${theme.gutter * 10}px;
    min-width: 600px;
  `}
`;

export const EditFormTitle = styled(Heading3)`
  font-family: ${theme.fonts.headingFont};
  color: ${theme.secondary};
  text-transform: capitalize;
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 29px;
  padding: 0;
  margin: 0 0 ${theme.gutter * 5}px;
  font-size: ${theme.fonts.sizes.bigger}px;
`;

export const EditFormSection = styled.div`
  margin: ${theme.gutter * 5}px 0 0;

  > div > label {
    margin-bottom: ${theme.gutter}px;
  }

  :first-child {
    margin: 0;
  }
`;

export const EditFormSectionTitle = styled.label`
  margin: 0 0 ${theme.gutter}px;
  padding: 0 0 ${theme.gutter}px;
  border-bottom: 1px solid ${theme.borders.default};
  display: block;
  width: 100%;
`;

export const StyledDatePicker = styled(DatePicker)`
  position: relative;

  .date-picker {
    margin: ${theme.gutter}px 0;

    .date-picker__day {
      min-height: 55px !important;
    }
  }
`;
export const MealPlanRate = styled.span`
  display: block;
  width: 100%;
`;

export const MealPlanRatePrice = styled.span`
  ${withCurrency};
  ${withDiscountStyles};
`;

export const MealPlanRatePriceOffer = styled.span`
  display: block;
  ${withDiscountStyles};
`;

export const MealPlanRateWrapper = styled.div`
  display: block;
`;

export const EditFormActions = styled.div``;

export const EditFormButton = styled(Button)``;
