import React, { useState, Fragment } from 'react';
import {
  compose,
  groupBy,
  head,
  mapObjIndexed,
  partial,
  path,
  pathOr,
  pipe,
  propOr,
  values,
  prop,
  length,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import SummaryRoomEdit from 'containers/SummaryRoomEdit';
import SummaryRoom from 'containers/SummaryRoom';
import SummaryFormExtras from 'containers/SummaryFormExtras';

import { PAYMENT_ENABLED } from 'config';
import { useModalState } from 'effects';
import { Form, Input, Loader, Modal, Markdown, AgreeToForm } from 'components';
import { mapWithIndex } from 'utils';

import { isActive } from 'store/common';

import { ProductTypes, PaymentTypes } from 'config/enums';

import connect from './SummaryForm.state';
import { propTypes, defaultProps } from './SummaryForm.props';
import {
  Error,
  Errors,
  Hotel,
  HotelName,
  Rooms,
  Saving,
  Section,
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
} from './SummaryForm.styles';

const modalProps = { className: 'room-summary-form' };

const getSingleValue = (type, data) =>
  pipe(
    pathOr([''], ['breakdown', 'requestedBuild', type]),
    head,
    propOr('', 'uuid')
  )(data);

const renderHotel = (t, { name, total, compact }) => (
  <Hotel data-compact={compact}>
    <HotelName>{name}</HotelName>
    {compact && <Total>{total}</Total>}
  </Hotel>
);

const renderError = ({ message }, i) => <Error key={i}>{message}</Error>;
const renderSummaryErrors = errors => !isNilOrEmpty(errors) && <Errors>{mapWithIndex(renderError, errors)}</Errors>;

const renderRoom = (
  t,
  booking,
  { id, summaryOnly, setModalId, removeRoom, hotelUuid, editGuard, onEditGuard, showRoomImage, showHolds },
  rooms,
  uuid
) => (
  <SummaryRoom
    canEdit={!summaryOnly}
    hotelUuid={hotelUuid}
    id={id}
    key={uuid}
    onEdit={setModalId}
    onRemove={removeRoom}
    roomId={uuid}
    editGuard={editGuard}
    onEditGuard={onEditGuard}
    showImage={showRoomImage}
    showHolds={showHolds}
  />
);

const renderRooms = (t, { breakdown, ...data }, props) =>
  pipe(
    pathOr([], ['potentialBooking', 'Accommodation']),
    groupBy(path(['product', 'uuid'])),
    mapObjIndexed(partial(renderRoom, [t, { breakdown, ...data }, props])),
    values
  )(breakdown);

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

const renderTotal = (t, { compact, isOnRequest, total, saving }) =>
  !compact && (
    <Fragment>
      <Title>{t('labels.totalNet')}</Title>
      <Section>
        <Total data-request={isOnRequest}>{isOnRequest ? t('labels.onRequest') : total}</Total>
        {!isOnRequest && <Text>{t('labels.includesTaxes')}</Text>}
        {saving && !isOnRequest && (
          <Text>
            {t('labels.savingOfPrefix')}
            <Saving>{saving}</Saving>
            {t('labels.savingOfSuffix')}
          </Text>
        )}
      </Section>
    </Fragment>
  );

const renderForm = (
  t,
  {
    bookLabel,
    canBook,
    canEdit,
    compact,
    editGuard,
    errors,
    holds,
    id,
    initialValues,
    isOnRequest,
    onEditGuard,
    onSubmit,
    summaryOnly,
    children,
    booking,
    showHolds,
    onHoldModalInit,
    holdOnly,
    showBookNow,
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
        />
        {renderSummaryErrors(errors)}
        {children({ booking })}
        <SummaryFormActions>
          {showHolds &&
            (holdOnly || holds) &&
            (prop('hasFullHolds', holds) ? (
              <SummaryFormButton type="button" onClick={() => onHoldModalInit('release')} data-secondary>
                {t('buttons.releaseHold', { count: length(prop('breakdown', holds)) })}
              </SummaryFormButton>
            ) : (
              <SummaryFormButton
                disabled={!(holdOnly || prop('canHold', holds))}
                onClick={() => onHoldModalInit('add')}
                type="button"
              >
                {holdOnly ? t('buttons.takeHold') : t('buttons.addHold', { count: length(prop('breakdown', holds)) })}
              </SummaryFormButton>
            ))}
          {((!summaryOnly && canEdit) || (showHolds && showBookNow && !holdOnly)) && (
            <SummaryFormButton disabled={!(showHolds || canBook)} type="submit">
              {bookLabel || (isOnRequest ? t('buttons.bookOnRequest') : t('buttons.bookNow'))}
            </SummaryFormButton>
          )}
        </SummaryFormActions>
      </Fragment>
    )}
  </Form>
);

const renderEditGuard = (t, { setShowEditGuard, showEditGuard, onEditGuardAccepted }) =>
  showEditGuard && (
    <Modal open={showEditGuard} onClose={() => setShowEditGuard(false)}>
      <EditGuard>
        <Markdown>{t('content.editGuard')}</Markdown>
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

const renderConfirmModalContent = (t, { isOnRequest, paymentType, onConfirmSubmit, total }) => {
  const finalizeAndPay = (
    <Fragment>
      {t('buttons.finalizeAndPay')} | <Total>{total}</Total>
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
      {renderConfirmModalForm({ onConfirmSubmit, buttonLabel, initialValues: { agreeToTerms: false } })}
    </ModalBody>
  );
};

const renderConfirmModal = (t, { confirmModalOpen, onConfirmModalClose, ...props }) =>
  confirmModalOpen && (
    <StyledModal open={confirmModalOpen} onClose={onConfirmModalClose}>
      {renderConfirmModalContent(t, props)}
    </StyledModal>
  );

export const SummaryForm = ({
  booking,
  canBook,
  canChangeDates,
  canEdit,
  children,
  className,
  compact,
  errors,
  getRatesForDates,
  guardEdit,
  holds,
  id,
  isOnRequest,
  onAddHolds,
  onGuardEdit,
  onGuardEditComplete,
  onReleaseHolds,
  onSubmit: onFormSubmit,
  removeRoom,
  saving,
  showHolds,
  showRoomImage,
  status,
  summaryOnly,
  total,
  confirm,
  holdOnly,
  showBookNow,
  ...props
}) => {
  const { t } = useTranslation();
  const { marginApplied, taMarginAmount, taMarginType, hotelUuid, hotelName: name, status: bookingStatus } = booking;

  const initialValues = {
    marginApplied,
    taMarginAmount,
    taMarginType,
    [ProductTypes.TRANSFER]: getSingleValue(ProductTypes.TRANSFER, booking),
    [ProductTypes.GROUND_SERVICE]: getSingleValue(ProductTypes.GROUND_SERVICE, booking),
    ...pathOr({}, ['products', ProductTypes.FINE], booking),
    ...pathOr({}, ['products', ProductTypes.SUPPLEMENT], booking),
  };

  const [complete, setCompleted] = useState(!confirm);
  const [formValues, setFormValues] = useState(initialValues);
  const [modalId, setModalId] = useState();
  const [editGuard, setEditGuard] = useState(guardEdit || !isNilOrEmpty(bookingStatus));
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

  const isLoading = isActive(status);

  const onModalClose = () => setModalId(undefined);

  const onEditGuard = () => {
    if (!editGuard) return;

    // This is essentially a custom hook pre-showing the guard message
    onGuardEdit().then(() => {
      setShowEditGuard(true);
    });
  };

  const onEditGuardAccepted = () => {
    setShowEditGuard(false);
    setEditGuard(false);

    onGuardEditComplete(id, booking);
  };

  const onHoldModalInit = context => {
    setHoldModalContext(context);
    onHoldModalOpen();
  };

  const onHoldConfirm = id => {
    onAddHolds(id);
    onHoldModalClose();
  };

  const onHoldRelease = id => {
    onReleaseHolds(id);
    onHoldModalClose();
  };

  const onSubmit = values => {
    setFormValues(values);
    confirm && !complete && onConfirmModalOpen();
    !confirm && complete && onFormSubmit(values);
  };

  const onConfirmSubmit = () => {
    onFormSubmit(formValues);
    setCompleted(true);
    onConfirmModalClose();
  };

  return (
    <StyledSummary className={className} data-compact={compact}>
      <Loader isLoading={isLoading} showPrev={true} text="Updating...">
        {renderTotal(t, {
          compact,
          editGuard,
          isOnRequest,
          onEditGuard,
          saving,
          summaryOnly,
          taMarginAmount,
          taMarginType,
          total,
        })}
        {renderHotel(t, { name, total, compact })}
        <Rooms data-summary={summaryOnly} data-compact={compact}>
          {renderRooms(t, booking, {
            editGuard,
            hotelUuid,
            id,
            onEditGuard,
            removeRoom,
            setModalId,
            showHolds,
            showRoomImage,
            summaryOnly,
          })}
        </Rooms>
        {renderForm(t, {
          booking,
          canBook,
          canEdit,
          children,
          compact,
          editGuard,
          errors,
          holdOnly,
          holds,
          id,
          initialValues: formValues,
          isOnRequest,
          onEditGuard,
          onHoldModalInit,
          onSubmit,
          showBookNow,
          showHolds,
          summaryOnly,
          ...props,
        })}
      </Loader>
      {!summaryOnly &&
        renderRoomEditModal(t, {
          id,
          hotelUuid,
          canChangeDates,
          modalId,
          status,
          getRatesForDates,
          setModalId,
          onModalClose,
        })}
      {renderEditGuard(t, { setShowEditGuard, showEditGuard, onEditGuardAccepted })}
      {renderHoldModal(t, { holdModalContext, holdModalOpen, onHoldModalClose, onHoldRelease, onHoldConfirm, id })}
      {renderConfirmModal(t, {
        confirmModalOpen,
        isOnRequest,
        onConfirmModalClose,
        onConfirmModalOpen,
        onConfirmSubmit,
      })}
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default compose(connect)(SummaryForm);
