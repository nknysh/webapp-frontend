import styled from 'styled-components';
import { DatePicker, Button } from '@pure-escapes/webapp-ui-components';

import { theme, withDiscountStyles, Heading3 } from 'styles';

export const DatePrice = styled.div`
  color: ${theme.colors.black};
  font-weight: ${theme.fonts.normal};
  margin-top: ${theme.spacing.gutter / 2}px;
  word-break: break-all;
`;

export const EditForm = styled.section`
  padding: ${theme.spacing.gutter * 8}px ${theme.spacing.gutter * 2}px;
  position: relative;

  ${props => props.theme.breakpoints.tablet`
    padding: ${theme.spacing.gutter * 8}px ${theme.spacing.gutter * 10}px;
    min-width: 600px;
  `}
`;

export const EditFormTitle = styled(Heading3)`
  font-family: ${theme.fonts.headingFont};
  color: ${theme.palette.secondary};
  text-transform: capitalize;
  letter-spacing: ${theme.fonts.letterSpacing.medium}px;
  line-height: 29px;
  padding: 0;
  margin: 0 0 ${theme.spacing.gutter * 5}px;
  font-size: ${theme.fonts.sizes.bigger}px;
`;

export const EditFormSection = styled.div`
  margin: ${theme.spacing.gutter * 5}px 0 0;

  > div > label {
    margin-bottom: ${theme.spacing.gutter}px;
  }

  :first-child {
    margin: 0;
  }
`;

export const EditFormSectionTitle = styled.label`
  margin: 0 0 ${theme.spacing.gutter}px;
  padding: 0 0 ${theme.spacing.gutter}px;
  border-bottom: 1px solid ${theme.borders.default};
  display: block;
  width: 100%;
`;

export const StyledDatePicker = styled(DatePicker)`
  position: relative;

  .date-picker {
    margin: ${theme.spacing.gutter}px 0;

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

export const AccommodationEditErrorsHeader = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  color: ${theme.colors['red-fade']};
`;

export const AccommodationEditErrorsError = styled.p`
  font-size: 13px;
  text-transform: uppercase;
  color: ${theme.colors['red-fade']};
`;
