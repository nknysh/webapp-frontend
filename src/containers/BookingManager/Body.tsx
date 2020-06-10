import React from 'react';
import styled from 'styled-components';

import { PrimaryActionToolbar } from './PrimaryActionToolbar';
import { ProgressBar, IProgressBarStage } from './ProgressBar';
import { ENetworkRequestStatus, IBooking } from 'services/BackendApi';
import { IBookingLeadGuestInformation } from 'store/modules/bookingManager/model';
import {
  requestToBookRequestAction,
  cancelRequestAction,
  confirmRequestAction,
} from 'store/modules/bookingManager/actions';

export interface IBodyComponentProps {
  className?: string;
  booking: IBooking;
  requestToBookRequestStatus: ENetworkRequestStatus;
  confirmRequestStatus: ENetworkRequestStatus;
  cancelRequestStatus: ENetworkRequestStatus;
  progressBarData: {
    stages: IProgressBarStage[];
  };
  leadGuestInformation: IBookingLeadGuestInformation;
  isSr: boolean;
  requestToBookRequest: typeof requestToBookRequestAction;
  cancelRequest: typeof cancelRequestAction;
  confirmRequest: typeof confirmRequestAction;
}

const BodyComponent = (props: IBodyComponentProps) => {
  return (
    <div className={props.className}>
      <div className="top-bar">
        <ProgressBar data={props.progressBarData} />
      </div>

      <div>
        <div className="booking-information">
          <label>Booking Status</label>
          <p>{props.booking.status}</p>
        </div>

        <div className="lead-guest-information">
          <p>{props.leadGuestInformation.guestTitle}</p>
          <p>{props.leadGuestInformation.guestFirstName}</p>
          <p>{props.leadGuestInformation.guestLastName}</p>
          <p>{props.leadGuestInformation.guestEmail}</p>
        </div>

        {props.requestToBookRequestStatus === ENetworkRequestStatus.PENDING ||
        props.confirmRequestStatus === ENetworkRequestStatus.PENDING ||
        props.cancelRequestStatus === ENetworkRequestStatus.PENDING ? (
          <p>Loading...</p>
        ) : (
          <React.Fragment>
            {props.requestToBookRequestStatus === ENetworkRequestStatus.ERROR && (
              <p>There was an error while attempting to mark this booking as Requested. Please try again.</p>
            )}

            {props.cancelRequestStatus === ENetworkRequestStatus.ERROR && (
              <p>There was an error while attempting to mark this booking as Cancelled. Please try again.</p>
            )}

            {props.confirmRequestStatus === ENetworkRequestStatus.ERROR && (
              <p>There was an error while attempting to mark this booking as Confirmed. Please try again.</p>
            )}

            <PrimaryActionToolbar
              booking={props.booking}
              isSr={props.isSr}
              requestToBookRequest={props.requestToBookRequest}
              cancelRequest={props.cancelRequest}
              confirmRequest={props.confirmRequest}
            />
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export const Body = styled(BodyComponent)`
  flex-grow: 2;
  .top-bar {
    border-bottom: 1px solid #ccc;
    margin-bottom: 16px;
    display: flex;
    flex-direction: row-reverse;
  }
`;
