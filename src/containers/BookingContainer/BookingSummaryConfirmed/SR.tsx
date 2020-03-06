import React, { useState } from 'react';

import { StandardModal, ModalHeader, ModalContent, ModalFooter } from 'pureUi/Modal';
import { PrimaryButton, SecondaryButton, ButtonBar } from 'pureUi/Buttons';
import { AsideDetails, Title } from '../../HotelContainer/HotelContainer.styles';
import { Redirect } from 'react-router-dom';
import { makeBackendApi } from 'services/BackendApi';
import { BookingBuilderDomain } from 'store/modules/bookingBuilder';
import { Heading1 } from 'styles';
import { Text } from 'pureUi/typography';
import { LinkButton } from 'pureUi/Buttons';

const BookingSummaryConfirmedSR = props => {
  const newBooking: BookingBuilderDomain = props.newBooking;
  const isOnProposal: boolean = newBooking.proposalUuid ? true : false;
  const canCancel = true;

  const { actingCountryCode } = props;

  const backendApi = makeBackendApi(actingCountryCode);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [hasCancelled, setHasCancelled] = useState(false);
  const handleCancel = async () => {
    try {
      await backendApi.cancelBooking(newBooking);
      setHasCancelled(true);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  };

  if (hasCancelled) {
    return <Redirect to={`/`} />;
  }

  return (
    <React.Fragment>
      {canCancel && (
        <AsideDetails>
          <Title>{props.t('labels.cancellation')}</Title>
          <Text>You can cancel and restart this booking</Text>
          <Text>This will mark the booking as cancelled, and you will be redirected to the landing page</Text>
          <PrimaryButton onClick={e => setIsCancelModalOpen(true)}>Cancel Booking</PrimaryButton>

          {isCancelModalOpen && (
            <StandardModal onClose={() => setIsCancelModalOpen(false)}>
              <ModalHeader>
                <Heading1>Cancel Booking</Heading1>
              </ModalHeader>
              <ModalContent>
                <Text>Are you sure you want to cancel this booking?</Text>
              </ModalContent>
              <ModalFooter>
                <ButtonBar>
                  <SecondaryButton onClick={() => handleCancel()}>Cancel</SecondaryButton>
                  <PrimaryButton autoFocus onClick={() => setIsCancelModalOpen(false)}>
                    Keep
                  </PrimaryButton>
                </ButtonBar>
              </ModalFooter>
            </StandardModal>
          )}
        </AsideDetails>
      )}

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

export default BookingSummaryConfirmedSR;
