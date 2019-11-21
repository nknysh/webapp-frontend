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
  Saving,
  FullTotal,
  StyledModal,
  StyledSummary,
  SummaryFormActions,
  SummaryFormButton,
  Text,
  Title,
  Total,
  EditGuard,
  ModalContent,
  ModalBody,
  ModalTitle,
  HotelTotals,
} from './SummaryForm.styles';
import { formatPrice } from '../../utils';
const modalProps = { className: 'room-summary-form' };

const getSingleValue = (type, data) =>
  pipe(
    pathOr([''], ['breakdown', 'requestedBuild', type]),
    head,
    propOr('', 'uuid')
  )(data);

const renderTotalPrice = (t, { currencyCode, isOnRequest, total, secondary, discounted }) => (
  <Total data-request={isOnRequest} data-secondary={secondary} data-discounted={discounted}>
    {isOnRequest ? t('labels.onRequest') : `${currencyCode}${formatPrice(total)}`}
  </Total>
);

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

const renderLodgingSummary = (lodging, setModalId, editGuard, onEditGuard, availableProductSets, potentialBooking) => {
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
    />
  );
};

const renderLodgingSummaries = (t, booking, props) => {
  // const { breakdown, ...bookingData } = booking;
  const { request: bookingRequest, response: bookingResponse } = booking;
  const { editGuard, onEditGuard, setModalId } = props;

  if (!bookingRequest || !bookingResponse) {
    return [];
  }

  const lodgingErrors = bookingResponse.errors.filter(e => e.meta === 'Accommodation').map(e => e.message) || [];

  const lodgingSummaries = bookingRequest.Accommodation.map((accommodationRequestedBuildObject, index) => {
    return {
      ...accommodationRequestedBuildObject,
      index,
      hotelUuid: bookingRequest.hotelUuid,
      title: getTitleForAccommodationUuid(accommodationRequestedBuildObject.uuid, bookingResponse.availableProductSets),
      nightsBreakdown: getNightsBreakdownForDates(
        accommodationRequestedBuildObject.startDate,
        accommodationRequestedBuildObject.endDate,
        t
      ),
      mealPlanBreakdown: getMealPlanBreakdownForLodging(
        accommodationRequestedBuildObject,
        index,
        bookingResponse.availableProductSets
      ),
      occupancyBreakdown: getOccupancyBreakdownForAccommodation(accommodationRequestedBuildObject),
      occasionsBreakdown: getOccassionsBreakdownForLodging(accommodationRequestedBuildObject),
    };
  });

  return (
    <React.Fragment>
      <label>
        <strong>{t('labels.lodgings')}</strong>
      </label>
      {lodgingErrors.map(error => (
        <p key={error}>{error}</p>
      ))}
      {lodgingSummaries.map(l =>
        renderLodgingSummary(
          l,
          setModalId,
          editGuard,
          onEditGuard,
          bookingResponse.availableProductSets,
          bookingResponse.potentialBooking
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

const renderTotal = (
  t,
  {
    compact,
    isOnRequest,
    total,
    saving,
    overrideTotal,
    showOriginalTotal,
    showFullTotal,
    preDiscountTotal,
    offersCount,
    showDiscountedPrice,
    currencyCode,
  }
) =>
  (!compact || showFullTotal) && (
    <Fragment>
      <Title>{t('labels.totalNet')}</Title>
      <FullTotal>
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
        {gt(offersCount, 0) && <Text data-discounted={true}>{t('labels.includesOffer', { count: offersCount })}</Text>}
        {saving && !isOnRequest && (
          <Text>
            {t('labels.savingOfPrefix')}
            <Saving>{`${currencyCode}${formatPrice(saving)}`}</Saving>
            {t('labels.savingOfSuffix')}
          </Text>
        )}
        {!isOnRequest && <Text>{t('labels.includesTaxes')}</Text>}
      </FullTotal>
    </Fragment>
  );

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
  }
) => (
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
          {showHolds &&
            (holdOnly || holds) &&
            ((prop('hasFullHolds', holds) || showReleaseHolds) && (
              <SummaryFormButton type="button" onClick={() => onHoldModalInit('release')} data-secondary>
                {releaseHoldLabel || t('buttons.releaseHold', { count: length(prop('breakdown', holds)) })}
              </SummaryFormButton>
            ))}
          {((showHolds && !prop('hasFullHolds', holds)) || showAddHolds) && (
            <SummaryFormButton
              disabled={!(holdOnly || prop('canHold', holds) || showAddHolds)}
              onClick={() => onHoldModalInit('add')}
              type="button"
            >
              {addHoldLabel ||
                (holdOnly ? t('buttons.takeHold') : t('buttons.addHold', { count: length(prop('breakdown', holds)) }))}
            </SummaryFormButton>
          )}
          {((!summaryOnly && canEdit) || (showHolds && !holdOnly)) && showBookNow && (
            <SummaryFormButton disabled={!(showHolds || canBook)} type="submit">
              {bookLabel || (isOnRequest ? t('buttons.bookOnRequest') : t('buttons.bookNow'))}
            </SummaryFormButton>
          )}
        </SummaryFormActions>
      </Fragment>
    )}
  </Form>
);

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
  } = props;

  // const {
  //   marginApplied,
  //   taMarginAmount,
  //   taMarginType,
  //   uuid:hotelUuid,
  //   status: bookingStatus,
  //   overrideTotal,
  // } = booking.response;
  // console.log('booking', booking);

  const initialValues = {
    // marginApplied,
    // taMarginAmount,
    // taMarginType,
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

  return (
    <StyledSummary className={className} data-compact={compact}>
      <Loader isLoading={isLoading} showPrev={true} text="Updating...">
        {renderTotal(t, {
          editGuard,
          onEditGuard: handleEditGuard,
          overrideTotal: booking.response.totals.total,
          ...props,
        })}
        {renderHotel(t, {
          name: hotelName || booking.response.hotel.name || 'Hotel',
          overrideTotal: booking.response.totals.total,
          ...props,
        })}

        {renderLodgingSummaries(t, booking, {
          editGuard,
          hotelUuid: booking.response.hotel.uuid,
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
          ...props,
        })}
      </Loader>
      {!summaryOnly &&
        renderRoomEditModal(t, {
          hotelUuid: booking.response.hotel.uuid,
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
