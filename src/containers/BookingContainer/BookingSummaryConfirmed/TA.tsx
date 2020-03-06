import React from 'react';
import { AsideDetails, Title } from '../../HotelContainer/HotelContainer.styles';
import { Text } from 'pureUi/typography';
import { LinkButton } from 'pureUi/Buttons';

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
          <LinkButton to={`/proposals/${newBooking.proposalUuid}`}>View Proposal</LinkButton>
        </AsideDetails>
      )}
    </React.Fragment>
  );
};

export default BookingSummaryConfirmedTA;
