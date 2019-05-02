import React, { useState } from 'react';
import { all, always, equals, mapObjIndexed, path, pipe, values, when, propOr } from 'ramda';

import { SummaryRoom, SummaryRoomEdit, SummaryFormExtras, SummaryFormMargin } from 'components/app';

import uiConfig from 'config/ui';

import { propTypes, defaultProps } from './SummaryForm.props';
import {
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
} from './SummaryForm.styles';

const renderHotelName = name => name && <HotelName>{name}</HotelName>;

export const SummaryForm = ({
  hotel,
  total,
  saving,
  className,
  booking,
  getHotelRoom,
  getRoomDates,
  getRoomTotal,
  getRatesForDates,
  getRoomMealPlans,
  getRoomMealPlan,
  getAccommodationProductAgeRanges,
  getExtraSupplements,
  onBookingChange,
  canBook,
  onBook,
  getTransferProducts,
  summaryOnly,
  children,
  checkBooking,
  removeRoom,
  transfersTotal,
  groundServicesTotal,
}) => {
  const { accommodationProducts, margin } = booking;
  const { name, uuid: hotelUuid, transferProducts } = hotel;

  const [modalData, setModalData] = useState({});

  const marginType = propOr('percentage', 'type', margin);
  const marginValue = propOr(0, 'value', margin);

  const onModalClose = () => setModalData({});

  const onEditChange = (values, close = true) => {
    onBookingChange(values);
    close && onModalClose();
  };

  // eslint-disable-next-line react/prop-types
  const renderRoom = ({ quantity }, id) => (
    <SummaryRoom
      {...path(['accommodationProducts', id], booking)}
      canEdit={!summaryOnly}
      dates={getRoomDates(id)}
      details={getHotelRoom(id)}
      extraSupplements={getExtraSupplements(id)}
      id={id}
      key={id}
      mealPlan={getRoomMealPlan(id)}
      onChange={onBookingChange}
      onEdit={setModalData}
      onRemove={removeRoom}
      quantity={quantity}
      hotelUuid={hotelUuid}
      total={getRoomTotal(id)}
    />
  );

  const renderRooms = pipe(
    mapObjIndexed(renderRoom),
    values,
    when(all(equals(false)), always(null))
  );

  const renderExtras = () => (
    <SummaryFormExtras
      booking={booking}
      onChange={onBookingChange}
      total={total}
      transfers={getTransferProducts(transferProducts || [])}
      margin={margin}
      summaryOnly={summaryOnly}
      totals={{ transfer: transfersTotal, groundService: groundServicesTotal }}
    />
  );

  const renderModal = () => {
    const { id } = modalData;

    const bookingRoom = path(['accommodationProducts', id], booking);

    if (!bookingRoom) return null;

    return (
      <StyledModal open={true} onClose={onModalClose} modalContentProps={{ className: 'room-summary-form' }}>
        <SummaryRoomEdit
          ageRanges={getAccommodationProductAgeRanges(id)}
          dates={getRoomDates(id)}
          details={getHotelRoom(id)}
          hotelUuid={hotelUuid}
          id={id}
          mealPlans={getRoomMealPlans(id)}
          onSubmit={onEditChange}
          onDatesShow={getRatesForDates}
          onEdit={setModalData}
          onChange={checkBooking}
          {...bookingRoom}
        />
      </StyledModal>
    );
  };

  const renderTotal = () => (
    <Section>
      <Total>{total}</Total>
      <Text>{path(['labels', 'includesTaxes'], uiConfig)}</Text>
      {saving && (
        <Text>
          {path(['labels', 'savingOfPrefix'], uiConfig)}
          <Saving>{saving}</Saving>
          {path(['labels', 'savingOfSuffix'], uiConfig)}
        </Text>
      )}
      {summaryOnly && <SummaryFormMargin type={marginType} value={marginValue} total={total} summaryOnly={true} />}
    </Section>
  );

  return (
    <StyledSummary className={className}>
      <Title>{path(['labels', 'totalNet'], uiConfig)}</Title>
      {renderTotal()}
      {renderHotelName(name)}
      <Rooms>{renderRooms(accommodationProducts)}</Rooms>
      {renderExtras()}
      {!summaryOnly && (
        <SummaryFormActions>
          <SummaryFormButton onMouseUp={onBook} disabled={!canBook}>
            {path(['buttons', 'bookNow'], uiConfig)}
          </SummaryFormButton>
        </SummaryFormActions>
      )}
      {!summaryOnly && renderModal()}
      {children}
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default SummaryForm;
