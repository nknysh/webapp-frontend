import React, { useState, Fragment } from 'react';
import { compose, groupBy, head, mapObjIndexed, partial, path, pathOr, pipe, propOr, values } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import SummaryRoomEdit from 'containers/SummaryRoomEdit';
import SummaryRoom from 'containers/SummaryRoom';
import SummaryFormExtras from 'containers/SummaryFormExtras';

import { Form, Input, Loader, Modal, Markdown } from 'components';
import { mapWithIndex } from 'utils';

import { isActive } from 'store/common';

import { ProductTypes } from 'config/enums';

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
  TotalMargin,
  EditGuard,
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
  { id, summaryOnly, setModalId, removeRoom, hotelUuid, editGuard, onEditGuard },
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
  />
);

const renderRooms = (t, { breakdown, ...data }, props) =>
  pipe(
    pathOr([], ['potentialBooking', 'Accommodation']),
    groupBy(path(['product', 'uuid'])),
    mapObjIndexed(partial(renderRoom, [t, { breakdown, ...data }, props])),
    values
  )(breakdown);

const renderModal = (
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

const renderTotal = (t, { compact, isOnRequest, total, saving, summaryOnly, taMarginAmount, taMarginType }) =>
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
        {summaryOnly && !isOnRequest && (
          <TotalMargin
            type={taMarginType || 'percentage'}
            value={taMarginAmount || 0}
            total={total}
            summaryOnly={true}
          />
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
    id,
    initialValues,
    isOnRequest,
    onEditGuard,
    onSubmit,
    summaryOnly,
  }
) => (
  <Form initialValues={initialValues} onSubmit={partial(onSubmit, [id])} enableReinitialize={true}>
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
        {!summaryOnly && canEdit && (
          <SummaryFormActions>
            <SummaryFormButton disabled={!canBook} type="submit">
              {bookLabel || (isOnRequest ? t('buttons.bookOnRequest') : t('buttons.bookNow'))}
            </SummaryFormButton>
          </SummaryFormActions>
        )}
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
  id,
  isOnRequest,
  onGuardEdit,
  onGuardEditComplete,
  onSubmit,
  removeRoom,
  saving,
  status,
  summaryOnly,
  total,
  ...props
}) => {
  const { t } = useTranslation();
  const { marginApplied, taMarginAmount, taMarginType, hotelUuid, hotelName: name, status: bookingStatus } = booking;

  const [modalId, setModalId] = useState();
  const [editGuard, setEditGuard] = useState(guardEdit || !isNilOrEmpty(bookingStatus));
  const [showEditGuard, setShowEditGuard] = useState(false);

  const isLoading = isActive(status);

  const initialValues = {
    marginApplied,
    taMarginAmount,
    taMarginType,
    [ProductTypes.TRANSFER]: getSingleValue(ProductTypes.TRANSFER, booking),
    [ProductTypes.GROUND_SERVICE]: getSingleValue(ProductTypes.GROUND_SERVICE, booking),
    ...pathOr({}, ['products', ProductTypes.FINE], booking),
    ...pathOr({}, ['products', ProductTypes.SUPPLEMENT], booking),
  };

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
          {renderRooms(t, booking, { id, hotelUuid, summaryOnly, setModalId, removeRoom, editGuard, onEditGuard })}
        </Rooms>
        {renderForm(t, {
          canBook,
          canEdit,
          compact,
          editGuard,
          errors,
          id,
          initialValues,
          isOnRequest,
          onEditGuard,
          onSubmit,
          summaryOnly,
          ...props,
        })}
        {children({ booking })}
      </Loader>
      {!summaryOnly &&
        renderModal(t, { id, hotelUuid, canChangeDates, modalId, status, getRatesForDates, setModalId, onModalClose })}
      {renderEditGuard(t, { setShowEditGuard, showEditGuard, onEditGuardAccepted })}
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default compose(connect)(SummaryForm);
