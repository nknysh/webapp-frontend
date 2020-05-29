import React from 'react';
import { IBooking } from 'services/BackendApi';
import {
  requestToBookRequestAction,
  cancelRequestAction,
  confirmRequestAction,
} from 'store/modules/bookingManager/actions';
import { PrimaryButton } from 'pureUi/Buttons';
import styled from 'styled-components';

interface IPrimaryActionToolbarProps {
  className?: string;
  booking: IBooking;
  isSr: boolean;
  requestToBookRequest: typeof requestToBookRequestAction;
  cancelRequest: typeof cancelRequestAction;
  confirmRequest: typeof confirmRequestAction;
}

const PrimaryActionToolbarComponent = (props: IPrimaryActionToolbarProps) => {
  const canRequestToBook = props.booking.status === 'potential';
  const canConfirm = props.booking.status === 'requested' && props.isSr;
  const canCancel = props.booking.status === 'confirmed' && props.isSr;

  return (
    <div className={props.className}>
      {canRequestToBook && (
        <PrimaryButton
          onClick={() => {
            props.requestToBookRequest(props.booking);
          }}
        >
          Request to book
        </PrimaryButton>
      )}
      {canConfirm && (
        <PrimaryButton
          onClick={() => {
            if (props.booking.uuid) {
              props.confirmRequest(props.booking.uuid);
            }
          }}
        >
          Confirm
        </PrimaryButton>
      )}
      {canCancel && (
        <PrimaryButton
          onClick={() => {
            props.cancelRequest(props.booking);
          }}
        >
          Cancel
        </PrimaryButton>
      )}
    </div>
  );
};

export const PrimaryActionToolbar = styled(PrimaryActionToolbarComponent)`
  padding: 16px;
  border-top: 1px solid #ddd;

  button {
    display: block;
    float: right;
  }
`;
