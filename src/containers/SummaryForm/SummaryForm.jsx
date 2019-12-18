import React, { useState, Fragment, useCallback } from 'react';
import { compose, head, partial, path, pathOr, pipe, propOr, prop, gt, length } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { Form, Input, Loader, Modal, Markdown, List } from '@pure-escapes/webapp-ui-components';

import AgreeToForm from 'components/AgreeToForm';
import SummaryRoomEdit from 'containers/SummaryRoomEdit';
import LodgingSummary from 'containers/LodgingSummary';
import SummaryFormExtras from 'containers/SummaryFormExtras';

import { PAYMENT_ENABLED } from 'config';
import { useModalState, useEffectBoundary } from 'effects';
import {
  mapWithIndex,
  getTitleForAccommodationUuid,
  getNightsBreakdownForDates,
  getOccupancyBreakdownForAccommodation,
  getMealPlanBreakdownForLodging,
  getOccassionsBreakdownForLodging,
} from 'utils';

import { isActive } from 'store/common';

import { ProductTypes, PaymentTypes } from 'config/enums';

import connect from './SummaryForm.state';
import { propTypes, defaultProps } from './SummaryForm.props';
import {
  Error,
  Hotel,
  HotelName,
  StyledModal,
  StyledSummary,
  SummaryFormActions,
  SummaryFormButton,
  Total,
  EditGuard,
  ModalContent,
  ModalBody,
  ModalTitle,
  HotelTotals,
} from './SummaryForm.styles';
import { formatPrice } from '../../utils';
import { PrimaryButton } from 'pureUi/Buttons';
import { makeBackendApi } from 'services/BackendApi';
const modalProps = { className: 'room-summary-form' };
import { getBookingsEndpointAttributesForBookingDomain } from 'utils/bookingBuilder';

const getSingleValue = (type, data) =>
  pipe(
    pathOr([''], ['request', type]),
    head,
    propOr('', 'uuid')
  )(data);

const renderTotalPrice = (t, currencyCode, isOnRequest, value, isSecondary, isDiscounted) => {
  <Total data-request={isOnRequest} data-secondary={isSecondary} data-discounted={isDiscounted}>
    {isOnRequest ? t('labels.onRequest') : `${currencyCode}${formatPrice(value)}`}
  </Total>;
};

const renderHotel = (
  t,
  {
    preDiscountTotal,
    offersCount,
    showDiscountedPrice,
    name,
    total,
    compact,
    showOriginalTotal,
    overrideTotal,
    isOnRequest,
    showFullTotal,
    currencyCode,
  }
) => (
  <Hotel data-compact={compact}>
    <HotelName>{name}</HotelName>
    {!showFullTotal && compact && (
      <HotelTotals>
        {renderTotalPrice(t, {
          currencyCode,
          isOnRequest,
          total: overrideTotal || total,
          discounted: !overrideTotal && showDiscountedPrice && gt(offersCount, 0),
        })}
        {overrideTotal &&
          gt(offersCount, 0) &&
          renderTotalPrice(t, {
            currencyCode,
            isOnRequest,
            total,
            secondary: true,
            discounted: true,
          })}
        {((showOriginalTotal && overrideTotal) || (showDiscountedPrice && gt(offersCount, 0))) &&
          !isOnRequest &&
          renderTotalPrice(t, {
            currencyCode,
            isOnRequest,
            total: preDiscountTotal,
            secondary: true,
          })}
      </HotelTotals>
    )}
  </Hotel>
);

const renderError = ({ message }, i) => <Error key={i}>{message}</Error>;
const renderSummaryErrors = errors => !isNilOrEmpty(errors) && <List>{mapWithIndex(renderError, errors)}</List>;

const renderLodgingSummary = (
  lodging,
  setModalId,
  editGuard,
  onEditGuard,
  availableProductSets,
  potentialBooking,
  textOnlyOffersPerLodging
) => {
  const handleRoomEdit = () => {
    if (editGuard) {
      return onEditGuard();
    }
    return setModalId(lodging.uuid);
  };
  return (
    <LodgingSummary
      hotelUuid={lodging.hotelUuid}
      key={lodging.index}
      lodging={lodging}
      handleRoomEditFunction={handleRoomEdit}
      availableProductSets={availableProductSets}
      potentialBooking={potentialBooking}
      editGuard={editGuard}
      onEditGuard={onEditGuard}
      textOnlyOffersPerLodging={textOnlyOffersPerLodging}
    />
  );
};

const renderLodgingSummaries = (t, booking, props) => {
  if (!booking) {
    return null;
  }
  const { request: bookingRequest, response: bookingResponse } = booking;
  const { editGuard, onEditGuard, setModalId } = props;

  if (!bookingRequest || !bookingResponse) {
    return [];
  }

  const lodgingSummaries = bookingRequest.Accommodation.map((requestedAccommodation, index) => {
    return {
      ...requestedAccommodation,
      index,
      hotelUuid: bookingRequest.hotelUuid,
      title: getTitleForAccommodationUuid(requestedAccommodation.uuid, bookingResponse.availableProductSets),
      nightsBreakdown: getNightsBreakdownForDates(requestedAccommodation.startDate, requestedAccommodation.endDate, t),
      mealPlanBreakdown: getMealPlanBreakdownForLodging(
        requestedAccommodation,
        index,
        bookingResponse.availableProductSets
      ),
      occupancyBreakdown: getOccupancyBreakdownForAccommodation(requestedAccommodation),
      occasionsBreakdown: getOccassionsBreakdownForLodging(requestedAccommodation),
    };
  });

  if (lodgingSummaries.length <= 0) {
    return null;
  }

  return (
    <React.Fragment>
      <label>
        <strong>{t('labels.lodgings')}</strong>
      </label>
      {lodgingSummaries.map(lodging =>
        renderLodgingSummary(
          lodging,
          setModalId,
          editGuard,
          onEditGuard,
          bookingResponse.availableProductSets,
          bookingResponse.potentialBooking,
          bookingResponse.textOnlyOffersPerLodging
        )
      )}
      {lodgingSummaries.length >= 1 && <hr />}
    </React.Fragment>
  );
};

const renderRoomEditModal = (
  t,
  { id, hotelUuid, modalId, canChangeDates, status, getRatesForDates, setModalId, onModalClose }
) => {
  if (!modalId) return null;

  return (
    <StyledModal open={true} onClose={onModalClose} modalContentProps={modalProps}>
      <SummaryRoomEdit
        canChangeDates={canChangeDates}
        hotelUuid={hotelUuid}
        id={id}
        onComplete={setModalId}
        onDatesShow={getRatesForDates}
        onEdit={setModalId}
        roomId={modalId}
        status={status}
      />
    </StyledModal>
  );
};

const handleSaveBookingButton = async props => {
  const { bookingDomain, backendApi } = props;

  const attr = getBookingsEndpointAttributesForBookingDomain({ bookingDomain });

  try {
    const res = await backendApi.postBookingSave(attr);
    const newBookingUuid = res.data.data.uuid;

    window.location.href = `/bookings/${newBookingUuid}`;
  } catch (e) {
    throw Error(`Error in saving booking - ${e}`);
  }
};

const SaveBookingButton = props => {
  const { backendApi, bookingDomain, canBook, t } = props;

  const [hasClicked, setHasClicked] = useState(false);
  return (
    <PrimaryButton
      className="mt-4"
      type="button"
      disabled={!canBook || hasClicked}
      onClick={() => {
        setHasClicked(true);
        handleSaveBookingButton({ backendApi, bookingDomain });
      }}
    >
      {t('buttons.saveBooking')}
    </PrimaryButton>
  );
};

const renderForm = (
  t,
  {
    addHoldLabel,
    booking,
    bookLabel,
    canBook,
    canEdit,
    children,
    compact,
    editGuard,
    errors,
    holdOnly,
    holds,
    id,
    initialValues,
    isOnRequest,
    onEditGuard,
    onHoldModalInit,
    onSubmit,
    releaseHoldLabel,
    showAddHolds,
    showBookNow,
    showHolds,
    showReleaseHolds,
    summaryOnly,
    backendApi,
    bookingDomain,
  }
) => {
  return (
    <Form initialValues={initialValues} onSubmit={onSubmit && partial(onSubmit, [id])} enableReinitialize={true}>
      {({ values }) => (
        <Fragment>
          <Input type="hidden" value={canBook} name="valid" />
          <SummaryFormExtras
            compact={compact}
            editGuard={editGuard}
            id={id}
            onEditGuard={onEditGuard}
            summaryOnly={summaryOnly}
            values={values}
            booking={booking}
          />
          {renderSummaryErrors(errors)}
          {children({ booking })}
          <SummaryFormActions>
            {showHolds && (holdOnly || holds) && (prop('hasFullHolds', holds) || showReleaseHolds) && (
              <SummaryFormButton type="button" onClick={() => onHoldModalInit('release')} data-secondary>
                {releaseHoldLabel || t('buttons.releaseHold', { count: length(prop('breakdown', holds)) })}
              </SummaryFormButton>
            )}
            {((showHolds && !prop('hasFullHolds', holds)) || showAddHolds) && (
              <SummaryFormButton
                disabled={!(holdOnly || prop('canHold', holds) || showAddHolds)}
                onClick={() => onHoldModalInit('add')}
                type="button"
              >
                {addHoldLabel ||
                  (holdOnly
                    ? t('buttons.takeHold')
                    : t('buttons.addHold', { count: length(prop('breakdown', holds)) }))}
              </SummaryFormButton>
            )}

            {((!summaryOnly && canEdit) || (showHolds && !holdOnly)) && showBookNow && (
              <SummaryFormButton disabled={!(showHolds || canBook)} type="submit">
                {bookLabel || (isOnRequest ? t('buttons.bookOnRequest') : t('buttons.bookNow'))}
              </SummaryFormButton>
            )}
          </SummaryFormActions>
          <SaveBookingButton t={t} canBook={canBook} backendApi={backendApi} bookingDomain={bookingDomain} />
        </Fragment>
      )}
    </Form>
  );
};

const renderEditGuard = (t, { setShowEditGuard, editGuardContent, showEditGuard, onEditGuardAccepted }) =>
  showEditGuard && (
    <Modal open={showEditGuard} onClose={() => setShowEditGuard(false)}>
      <EditGuard>
        <Markdown>{editGuardContent || t('content.editGuard')}</Markdown>
        <SummaryFormButton onClick={onEditGuardAccepted}>{t('buttons.accept')}</SummaryFormButton>
      </EditGuard>
    </Modal>
  );

const renderHoldModal = (
  t,
  { holdModalContext, onHoldRelease, onHoldConfirm, holdModalOpen, onHoldModalClose, id }
) => {
  if (!holdModalOpen) return;

  const holdModalInfo = {
    add: {
      title: t('labels.confirmYourhold'),
      content: t('content.holdConfirm'),
      button: t('buttons.takeHold'),
      action: partial(onHoldConfirm, [id]),
    },
    release: {
      title: t('labels.releaseHold'),
      content: t('content.holdRelease'),
      button: t('buttons.confirmAndRelease'),
      action: partial(onHoldRelease, [id]),
    },
  };

  const modalContent = prop(holdModalContext, holdModalInfo);

  return (
    modalContent && (
      <Modal open={true} onClose={onHoldModalClose}>
        <ModalBody>
          <ModalTitle>{prop('title', modalContent)}</ModalTitle>
          <Markdown>{prop('content', modalContent)}</Markdown>
          <SummaryFormButton type="button" onClick={prop('action', modalContent)}>
            {prop('button', modalContent)}
          </SummaryFormButton>
        </ModalBody>
      </Modal>
    )
  );
};

const renderConfirmModalSubmitButton = label => <SummaryFormButton type="submit">{label}</SummaryFormButton>;

const renderConfirmModalForm = ({ onConfirmSubmit, buttonLabel, initialValues }) => (
  <AgreeToForm
    renderSubmitButton={partial(renderConfirmModalSubmitButton, [buttonLabel])}
    onSubmit={onConfirmSubmit}
    initialValues={initialValues}
  />
);

const renderConfirmModalContent = (t, { isOnRequest, paymentType, onConfirmSubmit, total, currencyCode }) => {
  const finalizeAndPay = (
    <Fragment>
      {t('buttons.finalizeAndPay')} | <Total>{`${currencyCode}${formatPrice(total)}`}</Total>
    </Fragment>
  );

  const paymentTypeContent = {
    [PaymentTypes.CC]: {
      title: t('labels.payByCC'),
      content: t('content.booking.cc'),
      buttonLabel: finalizeAndPay,
    },
    [PaymentTypes.BT]: {
      title: t('labels.payByBT'),
      content: t('content.booking.bt'),
      buttonLabel: finalizeAndPay,
    },
  };

  const title =
    (isOnRequest && t('labels.bookingConfirmOnRequest')) ||
    (PAYMENT_ENABLED && !isOnRequest && path([paymentType, 'title'], paymentTypeContent)) ||
    t('labels.bookingConfirm');
  const content =
    (isOnRequest && t('content.booking.onRequest')) ||
    (PAYMENT_ENABLED && !isOnRequest && path([paymentType, 'content'], paymentTypeContent)) ||
    t('content.booking.default');
  const buttonLabel =
    (isOnRequest && t('buttons.submitBookingRequest')) ||
    (PAYMENT_ENABLED && !isOnRequest && path([paymentType, 'buttonLabel'], paymentTypeContent)) ||
    t('buttons.submitBookingRequest');

  return (
    <ModalBody>
      <ModalTitle>{title}</ModalTitle>
      <ModalContent>{content}</ModalContent>
      {renderConfirmModalForm({
        onConfirmSubmit,
        buttonLabel,
        initialValues: { agreeToTerms: false },
      })}
    </ModalBody>
  );
};

const renderConfirmModal = (t, { confirmModalOpen, onConfirmModalClose, ...props }) =>
  confirmModalOpen && (
    <StyledModal open={confirmModalOpen} onClose={onConfirmModalClose}>
      {renderConfirmModalContent(t, props)}
    </StyledModal>
  );

export const SummaryForm = props => {
  const { t } = useTranslation();

  const {
    booking,
    className,
    compact,
    confirm,
    guardEdit,
    hotelName,
    id,
    onAddHolds,
    onGuardEdit,
    onGuardEditComplete,
    onReleaseHolds,
    onSubmit: onFormSubmit,
    summaryOnly,
    accommodationEditModalErrors,
    actingCountryCode,
  } = props;

  const backendApi = makeBackendApi(actingCountryCode);

  const initialValues = {
    [ProductTypes.TRANSFER]: getSingleValue(ProductTypes.TRANSFER, booking),
    [ProductTypes.GROUND_SERVICE]: getSingleValue(ProductTypes.GROUND_SERVICE, booking),
    ...pathOr({}, ['products', ProductTypes.FINE], booking),
    ...pathOr({}, ['products', ProductTypes.SUPPLEMENT], booking),
  };

  const [complete, setCompleted] = useState(!confirm);
  const [formValues, setFormValues] = useState(initialValues);
  const [modalId, setModalId] = useState();
  const [editGuard, setEditGuard] = useState(guardEdit);
  const [showEditGuard, setShowEditGuard] = useState(false);
  const {
    modalOpen: holdModalOpen,
    modalContext: holdModalContext,
    onModalOpen: onHoldModalOpen,
    onModalClose: onHoldModalClose,
    setModalContext: setHoldModalContext,
  } = useModalState();
  const {
    modalOpen: confirmModalOpen,
    onModalOpen: onConfirmModalOpen,
    onModalClose: onConfirmModalClose,
  } = useModalState();

  useEffectBoundary(() => {
    setFormValues(initialValues);
  }, [booking]);

  const isLoading = isActive(status);

  const handleAccommodationEditModalClose = useCallback(() => {
    return accommodationEditModalErrors ? null : setModalId(undefined);
  }, [accommodationEditModalErrors]);

  const handleEditGuard = useCallback(() => {
    if (!editGuard) return;

    // This is essentially a custom hook pre-showing the guard message
    onGuardEdit().then(() => {
      setShowEditGuard(true);
    });
  }, [editGuard, onGuardEdit]);

  const onEditGuardAccepted = useCallback(() => {
    setShowEditGuard(false);
    setEditGuard(false);

    onGuardEditComplete(id, booking);
  }, [booking, id, onGuardEditComplete]);

  const onHoldModalInit = useCallback(
    context => {
      setHoldModalContext(context);
      onHoldModalOpen();
    },
    [onHoldModalOpen, setHoldModalContext]
  );

  const onHoldConfirm = useCallback(
    id => {
      onAddHolds(id);
      onHoldModalClose();
    },
    [onAddHolds, onHoldModalClose]
  );

  const onHoldRelease = useCallback(
    id => {
      onReleaseHolds(id);
      onHoldModalClose();
    },
    [onReleaseHolds, onHoldModalClose]
  );

  const onSubmit = useCallback(
    values => {
      setFormValues(values);
      confirm && !complete && onConfirmModalOpen();
      !confirm && complete && onFormSubmit(values);
    },
    [complete, confirm, onConfirmModalOpen, onFormSubmit]
  );

  const onConfirmSubmit = useCallback(() => {
    onFormSubmit(formValues);
    setCompleted(true);
    onConfirmModalClose();
  }, [formValues, onConfirmModalClose, onFormSubmit]);

  const hotelUuid = id;

  return (
    <StyledSummary className={className} data-compact={compact}>
      <Loader isLoading={isLoading} showPrev={true} text="Updating...">
        {renderHotel(t, {
          name: hotelName || booking?.response?.hotel?.name || 'Hotel',
          overrideTotal: booking?.response?.totals?.total || '0.00',
          ...props,
        })}

        {renderLodgingSummaries(t, booking, {
          editGuard,
          hotelUuid,
          onEditGuard: handleEditGuard,
          setModalId,
          ...props,
        })}
        {renderForm(t, {
          editGuard,
          initialValues: formValues,
          onEditGuard: handleEditGuard,
          onHoldModalInit,
          onSubmit,
          backendApi,
          ...props,
        })}
      </Loader>
      {!summaryOnly &&
        renderRoomEditModal(t, {
          hotelUuid,
          modalId,
          status,
          setModalId,
          onModalClose: handleAccommodationEditModalClose,
          ...props,
        })}
      {renderEditGuard(t, { setShowEditGuard, showEditGuard, onEditGuardAccepted, ...props })}
      {renderHoldModal(t, {
        holdModalContext,
        holdModalOpen,
        onHoldModalClose,
        onHoldRelease,
        onHoldConfirm,
        ...props,
      })}
      {renderConfirmModal(t, {
        confirmModalOpen,
        onConfirmModalClose,
        onConfirmModalOpen,
        onConfirmSubmit,
        ...props,
      })}
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default compose(connect)(SummaryForm);
