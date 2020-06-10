import React from 'react';
import styled from 'styled-components';
import { IBooking } from 'services/BackendApi';
import { IBookingLeadGuestInformation } from 'store/modules/bookingManager/model';
import { formatDateDisplay, currencyCodeToSymbol, formatPrice } from 'utils';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { IconButton } from 'pureUi/Buttons';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import copy from 'copy-to-clipboard';

export interface IHeaderComponentProps {
  className?: string;
  booking: IBooking;
  leadGuestInformation: IBookingLeadGuestInformation;
  compactGuestBreakdown: string;
}
const HeaderComponent = (props: IHeaderComponentProps) => {
  if (!props.booking.breakdown) {
    return null;
  }

  const { total, totalBeforeDiscount } = props.booking.breakdown.totals;

  return (
    <div className={props.className}>
      <div className="reference">
        <IconButton
          className="icon-button"
          onClick={() => {
            if (props.booking.humanReadableId) {
              copy(props.booking.humanReadableId)
            }
          }}
        >
          <FileCopyIcon />
        </IconButton>
        <span>Ref: #</span>
        <input readOnly id="booking-human-readable-id" type="text" value={props.booking.humanReadableId} />
      </div>

      <div className="booking-manager-header-inner">
        <div className="guest-details">
          <h1>
            {props.leadGuestInformation.guestTitle} {props.leadGuestInformation.guestFirstName}{' '}
            {props.leadGuestInformation.guestLastName}
          </h1>
          <h2>{props.booking.travelAgent?.companySignupInfo.name}</h2>
          <p>
            <label>Agent</label> {props.booking.travelAgent?.firstName} {props.booking.travelAgent?.lastName}
          </p>
          <p>
            <label>Email</label> {props.booking.travelAgent?.email}
          </p>
          <p>
            <label>Tel</label> {props.booking.travelAgent?.phoneNumber}
          </p>
        </div>

        <div className="resort-details">
          <h1>{props.booking.hotelName}</h1>
          <p>
            <label>Arrival</label>{' '}
            {props.booking.flightArrivalDate ? formatDateDisplay(props.booking.flightArrivalDate) : '/'}
          </p>
          <p>
            <label>Depart</label>{' '}
            {props.booking.flightDepartureDate ? formatDateDisplay(props.booking.flightDepartureDate) : '/'}
          </p>
          <p>
            <label>Guests</label> {props.compactGuestBreakdown}
          </p>
        </div>

        <div className="price-details">
          <label>Total</label>
          <h1>
            {currencyCodeToSymbol(props.booking.breakdown.currency)}
            {formatPrice(total)}
          </h1>
          <h2>
            Before Discount: {currencyCodeToSymbol(props.booking.breakdown.currency)}
            {formatPrice(totalBeforeDiscount)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export const Header = styled(HeaderComponent)`
  width: 100%;
  margin: 0 auto;
  padding: 20px 10px;

  .reference {
    display: flex;
    align-items: center;
  }

  .reference span, .reference input {
    font-size: ${pureUiTheme.typography.sizes.default}px;
  }

  .reference .icon-button {
    padding-left: 0;
    color: ${pureUiTheme.colors.teal};
    cursor: pointer;
  }

  .reference input {
    background: none;
    border: none;
    outline: none;
  }

  .booking-manager-header-inner {
    display: flex;
    justify-content: space-between;
  }

  h1 {
    font-size: ${pureUiTheme.typography.sizes.big}px;
  }
  h2 {
    font-size: ${pureUiTheme.typography.sizes.mid}px;
  }
  label,
  p {
    font-size: ${pureUiTheme.typography.sizes.default}px;
  }

  p > label {
    color: ${pureUiTheme.colors.grayDarker};
  }

  .guest-details {
    margin-right: 40px;
  }

  .guest-details h1 {
    font-family: ${pureUiTheme.typography.serifFont};
  }

  .guest-details h2 {
    font-weight: normal;
    margin 8px 0px;
    font-size: ${pureUiTheme.typography.sizes.less}px;
  }

  .resort-details h1 {
    font-family: ${pureUiTheme.typography.serifFont};
  }

  .resort-details {
    flex-grow: 2;
  }

  .price-details {
    text-align: right;
  }

  .price-details h1 {
    font-size: ${pureUiTheme.typography.sizes.bigger}px;
    color: ${pureUiTheme.colors.green};
  }

  .price-details h2 {
    color: ${pureUiTheme.colors.grayDarker};
    font-weight: normal;
  }

  @media (max-width: 600px) {
    .booking-manager-header-inner {
      flex-wrap: wrap;
    }

    .guest-details {
      width: 100%;
      margin-right: 0px;
    }

    .resort-details {
      width: 100%;
    }

    .price-details {
      width: 100%;
      text-align: left;
    }
  }
`;
