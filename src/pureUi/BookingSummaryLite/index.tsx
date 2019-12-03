import React from 'react';
import styled from 'styled-components';
import { Heading2 } from 'styles';
import DisplayTotalsBreakdown from '../../components/DisplayTotalsBreakdown/DisplayTotalsBreakdown';
import { useTranslation } from 'react-i18next';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { formatPrice, calculatePercentage, getCurrencySymbol } from 'utils';

export interface IBookingSummaryLiteProps {
  className: string;
  booking: any;
  t: (key: string) => string;
}

export const BookingSummaryLite = (props: IBookingSummaryLiteProps) => {
  const { t } = useTranslation();
  const breakdown = props.booking.breakdown;
  const priceIsOnRequest = props.booking.breakdown.displayTotals.totals.oneOrMoreItemsOnRequest;
  const totalCents = props.booking.breakdown.displayTotals.totals.totalForPricedItemsCents;
  const margin = parseFloat(props.booking.taMarginAmount);
  const marginTypeIsPercent = props.booking.taMarginType === 'percentage';
  const marginValue = marginTypeIsPercent ? (totalCents / 100) * (margin / 100) : margin;
  const currencySymbol = getCurrencySymbol(breakdown.currency);
  return (
    <div className={props.className}>
      <Heading2>{props.booking.hotelName}</Heading2>
      <DisplayTotalsBreakdown
        t={t}
        currencyCode={currencySymbol as string}
        displayTotals={props.booking.breakdown.displayTotals}
      />

      <p className="margin">
        {margin > 0 &&
          !marginTypeIsPercent &&
          `Your current margin will be ${currencySymbol}${formatPrice(marginValue)}`}

        {!priceIsOnRequest &&
          margin > 0 &&
          marginTypeIsPercent &&
          `Your current margin will be ${currencySymbol}${formatPrice(
            marginValue
          )}, ${margin}% of the total cost shown above`}
      </p>
    </div>
  );
};

export default styled(BookingSummaryLite)`
  background: ${pureUiTheme.colorRoles.areaBackground};
  padding: 20px;
  margin-bottom: 35px;

  .margin {
    font-size: 12px;
    color: ${pureUiTheme.colors.black};
    border-top: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
    padding: 20px 0 0;
  }
`;
