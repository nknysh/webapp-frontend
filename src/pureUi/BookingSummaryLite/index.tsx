import React from 'react';
import styled from 'styled-components';
import { Heading2 } from 'styles';
import DisplayTotalsBreakdown from '../../components/DisplayTotalsBreakdown/DisplayTotalsBreakdown';
import { useTranslation } from 'react-i18next';
import { pureUiTheme } from 'pureUi/pureUiTheme';
export interface IBookingSummaryLiteProps {
  className: string;
  booking: any;
  t: (key: string) => string;
}

export const BookingSummaryLite = (props: IBookingSummaryLiteProps) => {
  const { t } = useTranslation();
  const breakdown = props.booking.breakdown;
  return (
    <div className={props.className}>
      <Heading2>{props.booking.hotelName}</Heading2>
      <DisplayTotalsBreakdown
        t={t}
        currencyCode={breakdown.currency}
        displayTotals={props.booking.breakdown.displayTotals}
      />
    </div>
  );
};

export default styled(BookingSummaryLite)`
  background: ${pureUiTheme.colorRoles.areaBackground};
  padding: 20px;
  margin-bottom: 35px;
`;
