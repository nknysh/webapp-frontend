import styled from 'styled-components';

import { DatePicker } from 'components/elements';

import theme from 'styles/theme';
import breakpoints from 'styles/breakpoints';
import { withCurrency } from 'styles/elements';
import { Heading3 } from 'styles/typography';

export const DatePrice = styled.div`
  ${withCurrency};
  color: ${theme.colors.black};
  font-weight: ${theme.normal};
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
  font-family: ${theme.headingFont};
  color: ${theme.colors['gold-dark']};
  text-transform: capitalize;
  letter-spacing: 0.5px;
  line-height: 29px;
  padding: 0;
  margin: 0 0 ${theme.gutter * 5}px;
  font-size: 22px;
`;

export const EditFormSection = styled.div`
  margin: 0 0 ${theme.gutter * 5}px;

  :last-child {
    margin: 0;
  }
`;

export const EditFormSectionTitle = styled.label`
  margin: 0 0 ${theme.gutter}px;
  padding: 0 0 ${theme.gutter}px;
  border-bottom: 1px solid ${theme.borderColor};
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
`;

export const MealPlanRateWrapper = styled.div`
  display: block;
`;
