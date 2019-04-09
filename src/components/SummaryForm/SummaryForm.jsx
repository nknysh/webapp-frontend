import React, { useState } from 'react';
import { all, always, equals, gt, lensPath, mapObjIndexed, path, pipe, prop, sum, values, when } from 'ramda';
import hash from 'object-hash';
import { isThisMonth } from 'date-fns';

import { DropDownMenu, LodgingSelect } from 'components';
import {
  formatDate,
  getEndOfMonth,
  getFromDateFormat,
  getNumberOfDays,
  getStartOfMonth,
  getToDateFormat,
  toDate,
} from 'utils';

import uiConfig, { getPluralisation } from 'config/ui';

import { propTypes, defaultProps } from './SummaryForm.props';
import {
  DatePrice,
  EditForm,
  EditFormSection,
  EditFormTitle,
  HotelName,
  Room,
  RoomColumn,
  RoomDetail,
  RoomMenu,
  RoomName,
  RoomPrice,
  RoomRow,
  Rooms,
  Saving,
  Section,
  StyledDatePicker,
  StyledModal,
  StyledSummary,
  SummaryFormActions,
  SummaryFormButton,
  Text,
  Title,
  Total,
} from './SummaryForm.styles';
import {
  getGuestsFromBooking,
  getOptionsFromRates,
  guestLine,
  additionalGuestLine,
  canBook,
} from './SummaryForm.utils';

const renderTotal = (total, saving) => (
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
  </Section>
);

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
  onBookingChange,
}) => {
  const { accommodationProducts } = booking;
  const { name, uuid: hotelUuid } = hotel;

  const [modalData, setModalData] = useState({});

  const onModalClose = () => setModalData({});

  const renderRoom = ({ quantity, ...roomBooking }, id) => {
    const roomDetails = getHotelRoom(id);
    const roomDates = getRoomDates(id);
    const roomDatesCount = getNumberOfDays(roomDates);
    const { adults, teens, children, infants } = getGuestsFromBooking(roomBooking);

    const totalGuests = sum([adults, teens, children, infants]);

    const bookingRoomQuantityLens = lensPath(['accommodationProducts', id, 'quantity']);

    const onRemoveRoom = () => onBookingChange(bookingRoomQuantityLens, 0);
    const onEditRoom = () => setModalData({ id, quantity, adults, children, teens, infants });

    return (
      roomDetails &&
      roomDates &&
      gt(quantity, 0) && (
        <Room key={hash(roomDetails)}>
          <RoomRow>
            <RoomColumn>
              <RoomName>
                {prop('name', roomDetails)} ({quantity})
              </RoomName>
              <RoomDetail>
                {roomDatesCount} {getPluralisation('night', roomDatesCount)} | {getFromDateFormat(roomDates)}{' '}
                {getToDateFormat(roomDates)}
              </RoomDetail>
            </RoomColumn>
            <RoomColumn data-shrink={true}>
              <RoomPrice>{getRoomTotal(id)}</RoomPrice>
            </RoomColumn>
            <RoomColumn data-shrink={true}>
              <DropDownMenu showArrow={false} title={<RoomMenu>more_vert</RoomMenu>}>
                <span onClick={onEditRoom}>{path(['buttons', 'edit'], uiConfig)}</span>
                <span onClick={onRemoveRoom}>{path(['buttons', 'remove'], uiConfig)}</span>
              </DropDownMenu>
            </RoomColumn>
          </RoomRow>
          <RoomRow>
            {guestLine('guest', totalGuests)} ({guestLine('adult', adults)}
            {additionalGuestLine('teen', teens)}
            {additionalGuestLine('children', children)}
            {additionalGuestLine('infant', infants)})
          </RoomRow>
        </Room>
      )
    );
  };

  const renderRooms = pipe(
    mapObjIndexed(renderRoom),
    values,
    when(all(equals(false)), always(null))
  );

  const renderModal = () => {
    const { id, quantity, adults, children, teens, infants } = modalData;

    if (!id) return null;

    const { name, rates } = getHotelRoom(id);
    const { firstDate, lastDate, disabled } = getOptionsFromRates(rates);
    const roomDates = getRoomDates(id);

    const onDateSelected = range => onBookingChange({ accommodationProducts: { [id]: { dates: range } } });
    const onLodgingSelect = selected => {
      onBookingChange({ accommodationProducts: { [id]: { ...selected } } });
      setModalData({ id, ...selected });
    };

    const renderDay = day => {
      const rate = prop(formatDate(day), rates);

      return (
        <span>
          <div>{formatDate(day, 'D')}</div>
          {rate && <DatePrice>{prop('rate', rate)}</DatePrice>}
        </span>
      );
    };

    const onMonthChange = month => {
      getRatesForDates(
        hotelUuid,
        id,
        isThisMonth(month) ? formatDate(toDate()) : getStartOfMonth(month),
        getEndOfMonth(month)
      );
      return month;
    };

    const onDayPickerShow = () => getRatesForDates(hotelUuid, id, firstDate, getEndOfMonth(lastDate));

    return (
      <StyledModal open={true} onClose={onModalClose} modalContentProps={{ className: 'room-summary-form' }}>
        <EditForm>
          <EditFormTitle>{name}</EditFormTitle>
          <EditFormSection>
            <LodgingSelect
              onSelected={onLodgingSelect}
              contentOnly={true}
              selectedValues={{ quantity, adults, children, teens, infants }}
            />
          </EditFormSection>
          <EditFormSection>
            <StyledDatePicker
              dayPickerProps={{
                disabledDays: [
                  ...disabled,
                  {
                    before: new Date(firstDate),
                    after: new Date(lastDate),
                  },
                ],
                renderDay,
                onMonthChange,
              }}
              onDayPickerShow={onDayPickerShow}
              selectedValues={roomDates}
              onSelected={onDateSelected}
            />
          </EditFormSection>
        </EditForm>
      </StyledModal>
    );
  };

  return (
    <StyledSummary className={className}>
      <Title>{path(['labels', 'totalNet'], uiConfig)}</Title>
      {renderTotal(total, saving)}
      {renderHotelName(name)}
      <Rooms>{renderRooms(accommodationProducts)}</Rooms>
      {renderModal()}
      <SummaryFormActions>
        <SummaryFormButton disabled={!canBook(booking)}>{path(['buttons', 'bookNow'], uiConfig)}</SummaryFormButton>
      </SummaryFormActions>
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default SummaryForm;
