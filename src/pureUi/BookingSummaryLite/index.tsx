import React from 'react';
import styled from 'styled-components';
import { Heading2 } from 'styles';
import DisplayTotalsBreakdown from '../../components/DisplayTotalsBreakdown/DisplayTotalsBreakdown';
import { useTranslation } from 'react-i18next';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { formatPrice, calculatePercentage, getCurrencySymbol } from 'utils';
import { LinkButton } from 'pureUi/Buttons/index';

export interface IBookingSummaryLiteProps {
  className?: string;
  booking: any;
  hideViewBookingButton: boolean;
  hideBookingReference?: boolean;
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
    <div className={props.className ? props.className : ''}>
      <Heading2 className="hotelName">{props.booking.hotelName}</Heading2>

      {!props.hideBookingReference && (
        <div className="mt-4 mb-4 comments booking-reference-container">
          <strong>
            <label>Reference:</label>
          </strong>

          <label> #{props.booking.humanReadableId || props.booking.uuid}</label>
        </div>
      )}
      <DisplayTotalsBreakdown
        t={t}
        currencyCode={currencySymbol as string}
        displayTotals={props.booking.breakdown.displayTotals}
        overrideTotal={props.booking.overrideTotal || undefined}
      />

      {margin > 0 && !marginTypeIsPercent && (
        <React.Fragment>
          <hr className="mt-4 mb-2" />
          <p className="margin">
            Your current margin will be {currencySymbol}
            {formatPrice(marginValue)}
          </p>
        </React.Fragment>
      )}

      {!priceIsOnRequest && margin > 0 && marginTypeIsPercent && (
        <React.Fragment>
          <hr className="mt-4 mb-2" />
          <p className="margin">
            Your current margin will be {currencySymbol}
            {formatPrice(marginValue)}, {margin}% of the total cost shown above
          </p>
        </React.Fragment>
      )}

      {props.booking.bookingComments && (
        <React.Fragment>
          <div className="mt-4 comments">
            <hr className="mb-4" />
            <strong>
              <label>{t('labels.bookingComments')}</label>
            </strong>
            <p>{props.booking.bookingComments}</p>
          </div>
        </React.Fragment>
      )}

      {props.booking.internalComments && (
        <React.Fragment>
          <div className="mt-4 comments">
            <hr className="mb-4" />
            <strong>
              <label>{t('labels.internalComments')}</label>
            </strong>
            <p>{props.booking.internalComments}</p>
          </div>
        </React.Fragment>
      )}

      {props.booking.uuid && !props.hideViewBookingButton && (
        <div className="actions">
          <LinkButton to={`/bookings/${props.booking.uuid}`}>View booking</LinkButton>
        </div>
      )}
    </div>
  );
};

export default styled(BookingSummaryLite)`
  background: ${pureUiTheme.colorRoles.areaBackground};
  padding: 20px;
  margin-bottom: 35px;

  .booking-reference-container {
    margin-left: 20px;
  }

  .hotelName {
    padding: 0 21px;
  }

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

  .actions {
    border-top: 1px solid ${pureUiTheme.colorRoles.lightGreyBorder};
    margin-top: 20px;
    padding-top: 20px;
  }
`;
