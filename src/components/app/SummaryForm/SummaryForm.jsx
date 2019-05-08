import React, { useState } from 'react';
import { all, always, equals, mapObjIndexed, path, pipe, values, when, propOr, prop } from 'ramda';

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
  booking,
  canBook,
  checkBooking,
  children,
  className,
  getAccommodationProductAgeRanges,
  getExtraSupplements,
  getHotelRoom,
  getRatesForDates,
  getRoomDates,
  getRoomMealPlan,
  getRoomMealPlans,
  getRoomTotal,
  groundServicesTotal,
  hotel,
  onBook,
  onBookingChange,
  removeRoom,
  saving,
  summaryOnly,
  total,
  transferProducts,
  transfersTotal,
  groundServiceProducts,
  getRate,
  onBookingExtrasChange,
}) => {
  const { rooms, margin } = booking;
  const { name, uuid: hotelUuid } = hotel;

  const [modalData, setModalData] = useState({});

  const marginType = propOr('percentage', 'type', margin);
  const marginValue = propOr(0, 'value', margin);

  const onModalClose = () => setModalData({});

  const onEditChange = (values, close = true) => {
    onBookingChange(values);
    close && onModalClose();
  };

  // eslint-disable-next-line react/prop-types
  const renderRoom = ({ guests }, id) => (
    <SummaryRoom
      {...prop(id, rooms)}
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
      guests={guests}
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
      getRate={getRate}
      booking={booking}
      onChange={onBookingExtrasChange}
      total={total}
      transfers={transferProducts || []}
      groundServices={groundServiceProducts || []}
      margin={margin}
      summaryOnly={summaryOnly}
      totals={{ transfer: transfersTotal, groundService: groundServicesTotal }}
    />
  );

  const renderModal = () => {
    const { id } = modalData;

    const bookingRoom = path(['rooms', id], booking);

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
      <Rooms>{renderRooms(rooms)}</Rooms>
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
