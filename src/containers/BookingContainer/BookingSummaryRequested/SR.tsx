import React, { useState, useEffect } from 'react';

import { StandardModal, ModalHeader, ModalContent, ModalFooter } from 'pureUi/Modal';
import Textarea from 'pureUi/Textarea';
import TextInput from 'pureUi/TextInput';
import { PrimaryButton, SecondaryButton, ButtonBar } from 'pureUi/Buttons';
import { AsideDetails, Title } from '../../HotelContainer/HotelContainer.styles';
import { Redirect } from 'react-router-dom';
import { makeBackendApi } from 'services/BackendApi';
import { formatDate } from 'utils';
import { BookingBuilderDomain } from 'store/modules/bookingBuilder';
import { isNilOrEmpty } from 'ramda-adjunct';
import { Heading1, P } from 'styles';
import { Label } from 'pureUi/Label';
import { Text } from 'pureUi/typography';
import { validHoldHours } from '../helpers';

const BookingSummaryRequestedSR = props => {
  const newBooking: BookingBuilderDomain = props.newBooking;
  const [isOnProposal, setIsOnProposal] = useState<boolean>(newBooking.proposalUuid ? true : false);

  const { addHoldToBooking, releaseHoldFromBooking, actingCountryCode } = props;

  const backendApi = makeBackendApi(actingCountryCode);

  const [canHold, setCanHold] = useState<boolean>(props.holds?.canHold);
  const [isHeld, setIsHeld] = useState<boolean>(props.holds?.hasFullHolds);
  const [holdExpiry, setHoldExpiry] = useState<string | null>(null);
  const canCancel = false;

  useEffect(() => {
    setIsOnProposal(props.newBooking?.proposalUuid);
    setIsHeld(props.holds?.hasFullHolds);
    setCanHold(props.holds?.canHold);
    setHoldExpiry(props.holds?.fullHoldsExpires);
  }, [props]);

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

  const handleHoldHoursChange = (value: string) => {
    if (validHoldHours(value)) {
      setHoldHours(value);
    }
  };

  const handleUpdateHoldHours = () => {
    setIsUpdateHoldHoursPending(true);
    try {
      backendApi.updateHoldHoursForBooking(newBooking.uuid!, holdHours).then(json => {
        setHoldExpiry(json.data.data.fullHoldsExpires);
      });
    } catch (e) {
      console.error(`Error ${e}`);
    } finally {
      setIsUpdateHoldHoursPending(false);
    }
  };

  const handleConfirmOverrideAndPlaceHold = () => {
    setIsConfirmPlaceHoldPending(true);
    try {
      backendApi.addHoldToBooking(newBooking.uuid!).then(json => {
        setHoldExpiry(json.data.data.fullHoldsExpires);
        setIsOverrideHoldModalOpen(false);
        setIsHeld(json.data.data.hasFullHolds);
      });
    } catch (e) {
      console.error(`Error ${e}`);
    } finally {
      setIsConfirmPlaceHoldPending(false);
    }
  };

  const handleReleaseHoldFromBooking = uuid => {
    releaseHoldFromBooking(uuid);
    setIsHeld(false);
  };

  if (hasCancelled) {
    return <Redirect to={`/hotels/${newBooking.hotelUuid}`} />;
  }

  return (
    <React.Fragment>
      <AsideDetails>
        <Title>Grand Total</Title>
        <Label text="Grand Total Override">
          <TextInput value={overrideTotal} onChange={e => setTotalOverride(e.currentTarget.value)} />
        </Label>
        <PrimaryButton className="mt-4" disabled={isConfirmTotalOverridePending} onClick={handleConfirmOverrideTotal}>
          Save Grand Total Override
        </PrimaryButton>
      </AsideDetails>

      <AsideDetails>
        <Title>Comments</Title>
        <div className="mt-4">
          <Label text="Booking Comments">
            <Textarea
              value={localBookingCommentsState}
              onChange={e => {
                setLocalBookingCommentsState(e.target.value);
              }}
            />
          </Label>
        </div>
        <div className="mt-4 mb-4">
          <Label text="Internal Comments">
            <Textarea
              value={localInternalCommentsState}
              onChange={e => {
                setLocalInternalCommentsState(e.target.value);
              }}
            />
          </Label>
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

      {isHeld && holdExpiry && (
        <AsideDetails>
          <Title>{props.t('labels.holds')}</Title>
          <Text>This booking is being held.</Text>

          <Text>
            It will expire {formatDate(holdExpiry, 'PPP')} at {formatDate(holdExpiry, 'pp')}
          </Text>

          <PrimaryButton onClick={() => handleReleaseHoldFromBooking(newBooking.uuid)}>Release Holds</PrimaryButton>
          <div className="mt-4">
            <Label text="Hold Hours">
              <span className="number-input-form">
                <TextInput
                  inputMode="numeric"
                  pattern="[0-9]*"
                  min={1}
                  max={24}
                  value={holdHours}
                  onChange={e => handleHoldHoursChange(e.currentTarget.value)}
                />
                <PrimaryButton disabled={isUpdateHoldHoursPending} onClick={handleUpdateHoldHours}>
                  Update Hold Hours
                </PrimaryButton>
              </span>
            </Label>
          </div>
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
          <Text>This booking is not available to hold</Text>

          <PrimaryButton onClick={() => setIsOverrideHoldModalOpen(true)}>Place Hold</PrimaryButton>

          {isOverrideHoldModalOpen && (
            <StandardModal onClose={() => setIsOverrideHoldModalOpen(false)}>
              <ModalContent>
                <h3>Warning!</h3>
                <Text>The system reports that this booking is not available to hold</Text>
                <Text>However, you have permission to override this, and place a hold regardless</Text>
                <Text>If you place a hold, you should contact the hotel</Text>
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
        {canConfirm && <Text>You can confirm this booking</Text>}
        {!canConfirm && (
          <Text>
            This booking can only be confirmed once an override total, booking comments and internal comments have been
            set
          </Text>
        )}
        <PrimaryButton disabled={!canConfirm || isConfirmBookingPending} onClick={() => setIsConfirmModalOpen(true)}>
          Confirm Booking
        </PrimaryButton>

        {isConfirmModalOpen && (
          <StandardModal onClose={() => setIsConfirmModalOpen(false)}>
            <ModalHeader>
              <Heading1>Confirm</Heading1>
            </ModalHeader>
            <ModalContent>Are you sure you want to confirm this booking?</ModalContent>
            <ModalFooter>
              <ButtonBar>
                <SecondaryButton onClick={() => setIsConfirmModalOpen(false)}>No</SecondaryButton>
                <PrimaryButton autoFocus onClick={() => handleConfirmBooking()}>
                  Yes
                </PrimaryButton>
              </ButtonBar>
            </ModalFooter>
          </StandardModal>
        )}
      </AsideDetails>

      {canCancel && (
        <AsideDetails>
          <Title>{props.t('labels.cancellation')}</Title>
          <Text>You can cancel and restart this booking</Text>
          <Text>
            This will mark the booking as cancelled, and you will be redirected to the resort page to restart the
            booking process
          </Text>
          <PrimaryButton onClick={e => setIsCancelModalOpen(true)}>Cancel & Restart Booking</PrimaryButton>

          {isCancelModalOpen && (
            <StandardModal onClose={() => setIsCancelModalOpen(false)}>
              <ModalHeader>
                <Heading1>Cancel & Restart Booking</Heading1>
              </ModalHeader>
              <ModalContent>Are you sure you want to cancel and restart this booking?</ModalContent>
              <ModalFooter>
                <ButtonBar>
                  <SecondaryButton onClick={() => handleCancel()}>Cancel & Restart</SecondaryButton>
                  <PrimaryButton autoFocus onClick={() => setIsCancelModalOpen(false)}>
                    Keep
                  </PrimaryButton>
                </ButtonBar>
              </ModalFooter>
            </StandardModal>
          )}
        </AsideDetails>
      )}
    </React.Fragment>
  );
};

export default BookingSummaryRequestedSR;
