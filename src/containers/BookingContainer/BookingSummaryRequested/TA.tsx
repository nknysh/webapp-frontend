import React, { useState, useEffect } from 'react';
import { PrimaryButton } from 'pureUi/Buttons';
import { AsideDetails, Title } from '../../HotelContainer/HotelContainer.styles';
import { Text } from 'pureUi/typography';
import { formatDate } from 'utils';

const BookingSummaryRequestedTA = props => {
  const canHold: boolean = false;
  const isHeld: boolean = props.holds?.hasFullHolds;

  const { newBooking, addHoldToBooking, releaseHoldFromBooking } = props;

  const isOnProposal: boolean = newBooking.proposalUuid;

  return (
    <React.Fragment>
      {!isOnProposal && (
        <AsideDetails>
          <Title>{props.t('labels.proposalId')}</Title>
          <Text>This booking is not on a proposal</Text>
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
          <p>This booking is being held.</p>
          {props.holds.fullHoldsExpires && (
            <p>
              It will expire {formatDate(props.holds.fullHoldsExpires)} at{' '}
              {formatDate(props.holds.fullHoldsExpires, 'h:ma')}
            </p>
          )}
          <PrimaryButton onClick={() => releaseHoldFromBooking(newBooking.uuid)}>Release Holds</PrimaryButton>
        </AsideDetails>
      )}

      {!isHeld && canHold && (
        <AsideDetails>
          <Title>{props.t('labels.holds')}</Title>
          <Text>This booking is currently not being held</Text>
          <PrimaryButton onClick={() => addHoldToBooking(newBooking.uuid)}>Hold for 24 Hours</PrimaryButton>
        </AsideDetails>
      )}

      {!isHeld && !canHold && (
        <AsideDetails>
          <Title>{props.t('labels.holds')}</Title>
          <Text>This booking is currently not being held</Text>
          <Text>There are no available actions to take</Text>
        </AsideDetails>
      )}
    </React.Fragment>
  );
};

export default BookingSummaryRequestedTA;
