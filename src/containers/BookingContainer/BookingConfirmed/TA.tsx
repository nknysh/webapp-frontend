import React from 'react';
import { PrimaryButton } from 'pureUi/Buttons';
import { AsideDetails, Title } from '../../HotelContainer/HotelContainer.styles';
import { Text } from 'pureUi/typography';

const BookingSummaryConfirmedTA = props => {
  const { newBooking } = props;

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
    </React.Fragment>
  );
};

export default BookingSummaryConfirmedTA;
