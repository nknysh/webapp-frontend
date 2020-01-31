import React, { useState, useEffect } from 'react';

import { AddToProposalModalContent } from '../../HotelContainer/AddToProposalModal';
import {StandardModal, ModalHeader, ModalContent, ModalFooter} from 'pureUi/Modal';
import { PrimaryButton } from 'pureUi/Buttons';
import { AsideDetails, Title } from '../../HotelContainer/HotelContainer.styles';
import { Redirect } from 'react-router-dom';
import BookingGuestInformationForm from 'pureUi/BookingGuestInformationForm';
import { makeBackendApi } from 'services/BackendApi';
import { formatDate } from 'utils';
import { Heading1 } from 'styles';

const BookingSummaryPotentialTA = props => {
  const canHold: boolean = props.holds?.canHold;
  const isHeld: boolean = props.holds?.hasFullHolds;
  const canCancel = true;
  const canRequestToBook = true;

  const {
    newBooking,
    proposals,
    createNewProposal,
    addToProposal,
    proposalStatus,
    proposalResult,
    history,
    addHoldToBooking,
    releaseHoldFromBooking,
    updateBookingGuestInformationAction,
    actingCountryCode,
  } = props;

  const isOnProposal: boolean = newBooking.proposalUuid;
  const backendApi = makeBackendApi(actingCountryCode);

  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isRequestToBookModalOpen, setIsRequestToBookModalOpen] = useState(false);
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
    return <Redirect to={`/hotels/${newBooking.hotelUuid}`} />;
  }

  return (
    <React.Fragment>
      {!isOnProposal && (
        <AsideDetails>
          <Title>{props.t('labels.proposalId')}</Title>

          {isProposalModalOpen && (
            <StandardModal onClose={() => setIsProposalModalOpen(false)}>
              <ModalHeader>
                <Heading1>{props.t('buttons.addToProposal')}</Heading1>
              </ModalHeader>
              <ModalContent>
              <AddToProposalModalContent
                proposals={proposals}
                hotelUuid={newBooking.uuid} // TODO write up this
                createNewProposal={createNewProposal}
                addToProposal={addToProposal}
                proposalStatus={proposalStatus}
                proposalResult={proposalResult}
                history={history}
              />
              </ModalContent>
            </StandardModal>
          )}

          <PrimaryButton onClick={() => setIsProposalModalOpen(true)}>{props.t('buttons.addToProposal')}</PrimaryButton>
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
          <p>
            It will expire {formatDate(props.holds.fullHoldsExpires)} at{' '}
            {formatDate(props.holds.fullHoldsExpires, 'h:ma')}
          </p>
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

      {canRequestToBook && (
        <React.Fragment>
          <AsideDetails>
            <Title>{props.t('labels.requestToBook')}</Title>
            <PrimaryButton onClick={() => setIsRequestToBookModalOpen(true)}>
              {props.t('labels.requestToBook')}
            </PrimaryButton>

            {isRequestToBookModalOpen && (
              <StandardModal onClose={() => setIsRequestToBookModalOpen(false)}>
                <ModalHeader>
                  <Heading1>{props.t('labels.requestToBook')}</Heading1>
                </ModalHeader>
                <ModalContent>
                <BookingGuestInformationForm
                  bookingGuestFormValues={...newBooking}
                  onValueChange={newValues => {
                    try {
                      updateBookingGuestInformationAction(newValues);
                    } catch (e) {
                      console.error(`Error ${e}`);
                    }
                  }}
                />
                </ModalContent>
                <ModalFooter>
                <PrimaryButton
                  type="button"
                  onClick={async () => {
                    try {
                      await backendApi.requestToBook(newBooking);
                      location.reload();
                    } catch (e) {
                      console.error(`Error: ${e}`);
                    }
                  }}
                >
                  Request Booking
                </PrimaryButton>
                </ModalFooter>
              </StandardModal>
            )}
          </AsideDetails>
        </React.Fragment>
      )}

      {canCancel && (
        <AsideDetails>
          <Title>{props.t('labels.cancellation')}</Title>
          <PrimaryButton onClick={e => setIsCancelModalOpen(true)}>Cancel & Restart Booking</PrimaryButton>

          {isCancelModalOpen && (
            <StandardModal onClose={() => setIsRequestToBookModalOpen(false)}>
              <ModalHeader>
                <Heading1>Cancel & Restart Booking</Heading1>
              </ModalHeader>
              <ModalContent>
                <p>Are you sure you want to cancel and restart this booking?</p>
              </ModalContent>
              <ModalFooter>
                <PrimaryButton onClick={() => handleCancel()}>Yes</PrimaryButton>
                <PrimaryButton onClick={() => setIsRequestToBookModalOpen(false)}>No</PrimaryButton>
              </ModalFooter>
            </StandardModal>
          )}
        </AsideDetails>
      )}
    </React.Fragment>
  );
};

export default BookingSummaryPotentialTA;
