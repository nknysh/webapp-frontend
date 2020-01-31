import React, { useState, useEffect } from 'react';
import { PrimaryButton } from 'pureUi/Buttons';
import { AsideDetails, Title } from '../../HotelContainer/HotelContainer.styles';

const BookingSummaryPotential = props => {
  const canHold: boolean = false;
  const isHeld: boolean = props.holds?.hasFullHolds;

  const {
    newBooking,
    addHoldToBooking,
    releaseHoldFromBooking,
  } = props;

  const isOnProposal: boolean = newBooking.proposalUuid;

  return (
    <React.Fragment>
      {!isOnProposal && (
        <AsideDetails>
          <Title>{props.t('labels.proposalId')}</Title>
          <p>This booking is not on a proposal</p>
        </AsideDetails>
      )}

      {isOnProposal && (
        <AsideDetails>
          <Title>{props.t('labels.proposalId')}</Title>
          <a href={`/proposals/${newBooking.proposalUuid}`}>
            <PrimaryButton>View Proposal</PrimaryButton>
          </a>
        </AsideDetails>
      )}

      {isHeld && (
        <AsideDetails>
          <Title>{props.t('labels.holds')}</Title>
          <PrimaryButton onClick={() => releaseHoldFromBooking(newBooking.uuid)}>Release Holds</PrimaryButton>
        </AsideDetails>
      )}

      {!isHeld && canHold && (
        <AsideDetails>
          <Title>{props.t('labels.holds')}</Title>
          <p>This booking is currently not being held</p>
          <PrimaryButton onClick={() => addHoldToBooking(newBooking.uuid)}>Hold for 24 Hours</PrimaryButton>
        </AsideDetails>
      )}

      {!isHeld && !canHold && (
        <AsideDetails>
          <Title>{props.t('labels.holds')}</Title>
          <p>This booking is currently not being held</p>
          <p>There are no available actions to take</p>
        </AsideDetails>
      )}
    </React.Fragment>
  );
};

export default BookingSummaryPotential;
