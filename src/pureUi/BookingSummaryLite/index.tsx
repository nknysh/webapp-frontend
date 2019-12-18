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

      {margin > 0 && !marginTypeIsPercent && (
        <React.Fragment>
          <hr />
          <p className="margin">
            Your current margin will be {currencySymbol}
            {formatPrice(marginValue)}
          </p>
        </React.Fragment>
      )}

      {!priceIsOnRequest && margin > 0 && marginTypeIsPercent && (
        <React.Fragment>
          <hr />
          <p className="margin">
            Your current margin will be {currencySymbol}
            {formatPrice(marginValue)}, {margin}% of the total cost shown above
          </p>
        </React.Fragment>
      )}

      {true && (
        <React.Fragment>
          <div className="mt-4 comments">
            <hr />
            <strong>
              <label>Booking Comments</label>
            </strong>
            <p>These are some booking comments</p>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default styled(BookingSummaryLite)`
  background: ${pureUiTheme.colorRoles.areaBackground};
  padding: 20px;
  margin-bottom: 35px;

  .comments {
    font-size: 14px;
    color: ${pureUiTheme.colors.black};

    label {
      text-transform: uppercase;
      color: ${pureUiTheme.colorRoles.grayLabel};
      font-weight: bold;
    }
  }

  .margin {
    font-size: 12px;
    color: ${pureUiTheme.colors.black};
    padding: 20px 0 0;
  }
`;
