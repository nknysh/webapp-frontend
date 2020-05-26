import React, { useState, useEffect } from 'react';

import { AddToProposalModalContent } from '../../HotelContainer/AddToProposalModal';
import { StandardModal, ModalHeader, ModalContent, ModalFooter } from 'pureUi/Modal';
import Textarea from 'pureUi/Textarea';
import TextInput from 'pureUi/TextInput';
import { PrimaryButton, SecondaryButton, ButtonBar } from 'pureUi/Buttons';
import { AsideDetails, Title } from '../../HotelContainer/HotelContainer.styles';
import { Redirect } from 'react-router-dom';
import { makeBackendApi } from 'services/BackendApi';
import { formatDate, formatDateDisplay } from 'utils';
import { Heading1 } from 'styles';
import { Text } from 'pureUi/typography';
import Label from 'pureUi/Label';
import { validHoldHours } from '../helpers';

const BookingSummaryPotentialSR = props => {
  const [isOnProposal, setIsOnProposal] = useState<boolean>(props.newBooking?.proposalUuid);
  const [canHold, setCanHold] = useState<boolean>(props.holds?.canHold);
  const [isHeld, setIsHeld] = useState<boolean>(props.holds?.hasFullHolds);
  const [holdExpiry, setHoldExpiry] = useState<string | null>(null);
  const canCancel = false;
  const canRequestToBook = true;

  useEffect(() => {
    setIsOnProposal(props.newBooking?.proposalUuid);
    setIsHeld(props.holds?.hasFullHolds);
    setCanHold(props.holds?.canHold);
    setHoldExpiry(props.holds?.fullHoldsExpires);
  }, [props]);

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

  const backendApi = makeBackendApi(actingCountryCode);

  const [overrideTotal, setTotalOverride] = useState(newBooking.overrideTotal || '');
  const [isConfirmTotalOverridePending, setIsConfirmTotalOverridePending] = useState(false);
  const [isUpdateCommentsPending, setIsUpdateCommentsPending] = useState(false);
  const [localBookingCommentsState, setLocalBookingCommentsState] = useState(newBooking.bookingComments || '');
  const [localInternalCommentsState, setLocalInternalCommentsState] = useState(newBooking.internalComments || '');
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isRequestToBookLoading, setIsRequestToBookLoading] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [hasCancelled, setHasCancelled] = useState(false);
  const [isOverrideHoldModalOpen, setIsOverrideHoldModalOpen] = useState(false);
  const [isConfirmPlaceHoldPending, setIsConfirmPlaceHoldPending] = useState(false);
  const [isUpdateHoldHoursPending, setIsUpdateHoldHoursPending] = useState(false);
  const [holdHours, setHoldHours] = useState('24');

  const handleConfirmOverrideAndPlaceHold = () => {
    setIsConfirmPlaceHoldPending(true);
    try {
      backendApi.addHoldToBooking(newBooking.uuid).then(json => {
        setHoldExpiry(json.data.data.fullHoldsExpires);
        setIsOverrideHoldModalOpen(false);
        setIsHeld(json.data.data.hasFullHolds);
        setCanHold(json.data.data.canHold);
      });
    } catch (e) {
      console.error(`Error ${e}`);
    } finally {
      setIsConfirmPlaceHoldPending(false);
    }
  };

  const handleCancel = async () => {
    try {
      await backendApi.cancelBooking(newBooking);
      setHasCancelled(true);
    } catch (e) {
      console.error(`Error: ${e}`);
    }
  };

  const handleReleaseHoldFromBooking = uuid => {
    releaseHoldFromBooking(uuid);
    setIsHeld(false);
  };

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

  const handleConfirmOverrideTotal = async () => {
    setIsConfirmTotalOverridePending(true);
    try {
      await backendApi.reviewBooking(newBooking.uuid, {
        overrideTotal: parseFloat(overrideTotal).toString(),
        status: newBooking.status,
      });
      window.location.reload();
    } catch (e) {
      console.error(`Error ${e}`);
    } finally {
      setIsConfirmTotalOverridePending(false);
    }
  };

  const handleUpdateComments = async () => {
    setIsUpdateCommentsPending(true);

    try {
      await backendApi.reviewBooking(newBooking.uuid, {
        bookingComments: localBookingCommentsState,
        internalComments: localInternalCommentsState,
        status: newBooking.status,
      });
      window.location.reload();
    } catch (e) {
      console.error(`Error ${e}`);
    } finally {
      setIsUpdateCommentsPending(false);
    }
  };

  if (hasCancelled) {
    return <Redirect to={`/hotels/${newBooking.hotelUuid}`} />;
  }

  return (
    <React.Fragment>
      {/* Grand total aside */}
      <AsideDetails>
        <Title>Grand Total</Title>
        <Label text="Grand Total Override">
          <TextInput value={overrideTotal} onChange={e => setTotalOverride(e.currentTarget.value)} />
        </Label>

        <div className="mt-4">
          <PrimaryButton disabled={isConfirmTotalOverridePending} onClick={handleConfirmOverrideTotal}>
            Save Grand Total Override
          </PrimaryButton>
        </div>
      </AsideDetails>

      {/* Comments Aside */}
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

          <Text>You can add this booking onto a proposal</Text>
          <PrimaryButton onClick={() => setIsProposalModalOpen(true)}>{props.t('buttons.addToProposal')}</PrimaryButton>
        </AsideDetails>
      )}

      {isOnProposal && (
        <AsideDetails>
          <Title>{props.t('labels.proposalId')}</Title>
          <Text>This booking is on a proposal</Text>
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
            It will expire {formatDateDisplay(holdExpiry)} at {formatDate(holdExpiry, 'pp')}
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
                <PrimaryButton disabled={isConfirmPlaceHoldPending} onClick={handleConfirmOverrideAndPlaceHold}>
                  Override and Place Hold
                </PrimaryButton>
              </ModalContent>
            </StandardModal>
          )}
        </AsideDetails>
      )}

      {canRequestToBook && (
        <React.Fragment>
          <AsideDetails>
            <Title>{props.t('labels.requestToBook')}</Title>
            <Text>You can request to book this booking</Text>
            <PrimaryButton
              disabled={isRequestToBookLoading}
              onClick={async () => {
                setIsRequestToBookLoading(true);
                try {
                  await backendApi.requestToBook(newBooking);
                  location.reload();
                } catch (e) {
                  console.error(`Error: ${e}`);
                } finally {
                  setIsRequestToBookLoading(false);
                }
              }}
            >
              {props.t('labels.requestToBook')}
            </PrimaryButton>
          </AsideDetails>
        </React.Fragment>
      )}

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
              <ModalContent>
                <Text>Are you sure you want to cancel and restart this booking?</Text>
              </ModalContent>
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

export default BookingSummaryPotentialSR;
