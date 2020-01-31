import React, { useState, useEffect } from 'react';

import {StandardModal, ModalHeader, ModalContent, ModalFooter} from 'pureUi/Modal';
import Textarea from 'pureUi/Textarea';
import TextInput from 'pureUi/TextInput';
import { PrimaryButton } from 'pureUi/Buttons';
import { AsideDetails, Title } from '../../HotelContainer/HotelContainer.styles';
import { Redirect } from 'react-router-dom';
import { makeBackendApi } from 'services/BackendApi';
import { formatDate } from 'utils';
import { BookingBuilderDomain } from 'store/modules/bookingBuilder';
import { isNilOrEmpty } from 'ramda-adjunct';
import { Heading1 } from 'styles';

const BookingSummaryPotentialSR = props => {
  const newBooking: BookingBuilderDomain = props.newBooking;
  const isOnProposal: boolean = newBooking.proposalUuid ? true : false;
  const canHold: boolean = props.holds?.canHold;
  const isHeld: boolean = props.holds?.hasFullHolds;
  const canCancel = true;

  const { addHoldToBooking, releaseHoldFromBooking, actingCountryCode } = props;

  const backendApi = makeBackendApi(actingCountryCode);

  const [overrideTotal, setTotalOverride] = useState(newBooking.overrideTotal || '');
  const [isConfirmTotalOverridePending, setIsConfirmTotalOverridePending] = useState(false);
  const handleConfirmOverrideTotal = async () => {
    setIsConfirmTotalOverridePending(true);
    try {
      await backendApi.reviewBooking(newBooking.uuid!, {
        overrideTotal: parseFloat(overrideTotal).toString(),
        status: newBooking.status!,
      });
      window.location.reload();
    } catch (e) {
      console.error(`Error ${e}`);
    } finally {
      setIsConfirmTotalOverridePending(false);
    }
  };
  const [localBookingCommentsState, setLocalBookingCommentsState] = useState(newBooking.bookingComments || '');
  const [localInternalCommentsState, setLocalInternalCommentsState] = useState(newBooking.internalComments || '');

  const [isConfirmBookingPending, setIsConfirmBookingPending] = useState(false);
  const [isUpdateCommentsPending, setIsUpdateCommentsPending] = useState(false);

  const handleConfirmBooking = async () => {
    setIsConfirmBookingPending(true);
    try {
      await backendApi.reviewBooking(newBooking.uuid!, {
        status: 'confirmed',
      });
      window.location.reload();
    } catch (e) {
      console.error(`Error ${e}`);
    } finally {
      setIsConfirmBookingPending(false);
    }
  };

  const handleUpdateComments = async () => {
    setIsUpdateCommentsPending(true);

    try {
      await backendApi.reviewBooking(newBooking.uuid!, {
        bookingComments: localBookingCommentsState,
        internalComments: localInternalCommentsState,
        status: newBooking.status!,
      });
      window.location.reload();
    } catch (e) {
      console.error(`Error ${e}`);
    } finally {
      setIsUpdateCommentsPending(false);
    }
  };

  const [canConfirm, setCanConfirm] = useState(false);

  const requiresOverrideTotalAndComments = newBooking.currentBookingBuilder?.response.totals.oneOrMoreItemsOnRequest;

  useEffect(() => {
    if (
      requiresOverrideTotalAndComments &&
      (isNilOrEmpty(newBooking.bookingComments) ||
        isNilOrEmpty(newBooking.internalComments) ||
        isNilOrEmpty(newBooking.overrideTotal))
    ) {
      setCanConfirm(false);
    } else {
      setCanConfirm(true);
    }
  }, [newBooking]);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [hasCancelled, setHasCancelled] = useState(false);
  const handleCancel = async () => {
    try {
      await backendApi.cancelBooking(newBooking);
      setHasCancelled(true);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  };

  // Hold logic is defined here as it is shared by multiple asides
  const [isOverrideHoldModalOpen, setIsOverrideHoldModalOpen] = useState(false);
  const [isConfirmPlaceHoldPending, setIsConfirmPlaceHoldPending] = useState(false);
  const [isUpdateHoldHoursPending, setIsUpdateHoldHoursPending] = useState(false);
  const [holdHours, setHoldHours] = useState('24');
  const handleUpdateHoldHours = () => {
    setIsUpdateHoldHoursPending(true);
    try {
      backendApi.updateHoldHoursForBooking(newBooking.uuid!, holdHours);
    } catch (e) {
      console.error(`Error ${e}`);
    } finally {
      setIsUpdateHoldHoursPending(false);
    }
  };

  const handleConfirmOverrideAndPlaceHold = () => {
    setIsConfirmPlaceHoldPending(true);
    try {
      backendApi.addHoldToBooking(newBooking.uuid!);
    } catch (e) {
      console.error(`Error ${e}`);
    } finally {
      setIsConfirmPlaceHoldPending(false);
    }
  };

  if (hasCancelled) {
    return <Redirect to={`/hotels/${newBooking.hotelUuid}`} />;
  }

  return (
    <React.Fragment>
      <AsideDetails>
        <Title>Grand Total</Title>
        <label>Grand Total Override</label>
        <TextInput value={overrideTotal} onChange={e => setTotalOverride(e.currentTarget.value)} />
        <div className="mt-4">
          <PrimaryButton disabled={isConfirmTotalOverridePending} onClick={handleConfirmOverrideTotal}>
            Save Grand Total Override
          </PrimaryButton>
        </div>
      </AsideDetails>

      <AsideDetails>
        <Title>Comments</Title>
        <div className="mt-4">
          <label>Booking Comments</label>
          <Textarea
            value={localBookingCommentsState}
            onChange={e => {
              setLocalBookingCommentsState(e.target.value);
            }}
          />
        </div>
        <div className="mt-4 mb-4">
          <label>Internal Comments</label>
          <Textarea
            value={localInternalCommentsState}
            onChange={e => {
              setLocalInternalCommentsState(e.target.value);
            }}
          />
        </div>
        <PrimaryButton disabled={isUpdateCommentsPending} onClick={handleUpdateComments}>
          Save All Comments
        </PrimaryButton>
      </AsideDetails>

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
          <div className="mt-4">
            <label>Hold Hours</label>
            <div className="flex mt-4">
              <div className="w-50 pr-2">
                <TextInput type="number" min={1} max={24} value={holdHours} onChange={e => setHoldHours(e.currentTarget.value)} />
              </div>

              <div className="w-50 pl-2">
                <PrimaryButton disabled={isUpdateHoldHoursPending} onClick={handleUpdateHoldHours}>
                  Update Hold Hours
                </PrimaryButton>
              </div>
            </div>
          </div>
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
          <p>This booking is not available to hold</p>

          <PrimaryButton onClick={() => setIsOverrideHoldModalOpen(true)}>Place Hold</PrimaryButton>

          {isOverrideHoldModalOpen && (
            <StandardModal onClose={() => setIsOverrideHoldModalOpen(false)}>
              <ModalContent>
              <h3>Warning!</h3>
              <p>The system reports that this booking is not available to hold</p>
              <p>However, you have permission to override this, and place a hold regardless</p>
              <p>If you place a hold, you should contact the hotel</p>
              </ModalContent>
              <ModalFooter>
              <PrimaryButton disabled={isConfirmPlaceHoldPending} onClick={handleConfirmOverrideAndPlaceHold}>
                Override and Place Hold
              </PrimaryButton>
              </ModalFooter>
            </StandardModal>
          )}
        </AsideDetails>
      )}

      {/* Confirm aside */}
      <AsideDetails>
        <Title>Confirm</Title>
        {canConfirm && <p>You can confirm this booking</p>}
        {!canConfirm && (
          <p>
            This booking can only be confirmed once an override total, booking comments and internal comments have been
            set
          </p>
        )}
        <PrimaryButton disabled={!canConfirm || isConfirmBookingPending} onClick={() => setIsConfirmModalOpen(true)}>
          Confirm Booking
        </PrimaryButton>

        {isConfirmModalOpen && (
          <StandardModal onClose={() => setIsConfirmModalOpen(false)}>
            <ModalHeader>
              <Heading1>Confirm</Heading1>
            </ModalHeader>
            <ModalContent>
              Are you sure you want to confirm this booking?
            </ModalContent>
            <ModalFooter>
              <PrimaryButton onClick={() => handleConfirmBooking()}>Yes</PrimaryButton>
              <PrimaryButton onClick={() => setIsConfirmModalOpen(false)}>No</PrimaryButton>
            </ModalFooter>
          </StandardModal>
        )}
      </AsideDetails>

      {canCancel && (
        <AsideDetails>
          <Title>{props.t('labels.cancellation')}</Title>
          <p>You can cancel and restart this booking</p>
          <p>
            This will mark the booking as cancelled, and you will be redirected to the resort page to restart the
            booking process
          </p>
          <PrimaryButton onClick={e => setIsCancelModalOpen(true)}>Cancel & Restart Booking</PrimaryButton>

          {isCancelModalOpen && (
            <StandardModal onClose={() => setIsCancelModalOpen(false)}>
              <ModalHeader>
                <Heading1>Cancel & Restart Booking</Heading1>
              </ModalHeader>
              <ModalContent>
                Are you sure you want to cancel and restart this booking?
              </ModalContent>
              <ModalFooter>
                <PrimaryButton onClick={() => handleCancel()}>Yes</PrimaryButton>
                <PrimaryButton onClick={() => setIsCancelModalOpen(false)}>No</PrimaryButton>
              </ModalFooter>
            </StandardModal>
          )}
        </AsideDetails>
      )}
    </React.Fragment>
  );
};

export default BookingSummaryPotentialSR;
