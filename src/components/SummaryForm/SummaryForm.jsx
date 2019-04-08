import React, { useState } from 'react';
import {
  gt,
  path,
  prop,
  mapObjIndexed,
  values,
  pipe,
  when,
  all,
  equals,
  always,
  lensPath,
  keys,
  head,
  last,
} from 'ramda';
import hash from 'object-hash';
import { isThisMonth } from 'date-fns';

import { DropDownMenu, Modal, LodgingSelect, DatePicker } from 'components';
import { getNumberOfDays, getFromDateFormat, getToDateFormat, formatDate, getStartOfMonth, getEndOfMonth } from 'utils';

import uiConfig, { getPluralisation } from 'config/ui';

import { propTypes, defaultProps } from './SummaryForm.props';
import {
  StyledSummary,
  Title,
  Section,
  Total,
  Text,
  Saving,
  HotelName,
  Rooms,
  Room,
  RoomColumn,
  RoomName,
  RoomDetail,
  RoomPrice,
  RoomMenu,
  EditForm,
  EditFormTitle,
  EditFormSection,
  DatePrice,
} from './SummaryForm.styles';

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

  const renderRoom = ({ quantity }, id) => {
    const roomDetails = getHotelRoom(id);
    const roomDates = getRoomDates(id);
    const roomDatesCount = getNumberOfDays(roomDates);

    const bookingRoomQuantityLens = lensPath(['accommodationProducts', id, 'quantity']);

    const onRemoveRoom = () => onBookingChange(bookingRoomQuantityLens, 0);
    const onEditRoom = () => setModalData({ id, quantity });

    return (
      roomDetails &&
      roomDates &&
      gt(quantity, 0) && (
        <Room key={hash(roomDetails)}>
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
              <span onClick={onEditRoom}>Edit</span>
              <span onClick={onRemoveRoom}>Remove</span>
            </DropDownMenu>
          </RoomColumn>
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
    const { id, quantity } = modalData;

    if (!id) return null;

    const { name, rates } = getHotelRoom(id);
    const roomDates = getRoomDates(id);

    const ratesDates = keys(rates).sort();
    const firstDate = head(ratesDates);
    const lastDate = last(ratesDates);

    const onDateSelected = range => onBookingChange({ accommodationProducts: { [id]: { dates: range } } });
    const onLodgingSelect = selected => onBookingChange({ accommodationProducts: { [id]: { ...selected } } });

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
        isThisMonth(month) ? formatDate(new Date()) : getStartOfMonth(month),
        getEndOfMonth(month)
      );
      return month;
    };

    const onDayPickerShow = () => {
      getRatesForDates(hotelUuid, id, firstDate, getEndOfMonth(lastDate));
    };

    return (
      <Modal open={true} onClose={onModalClose}>
        <EditForm>
          <EditFormTitle>{name}</EditFormTitle>
          <EditFormSection>
            <LodgingSelect onSelected={onLodgingSelect} contentOnly={true} selectedValues={{ quantity }} />
          </EditFormSection>
          <EditFormSection>
            <DatePicker
              dayPickerProps={{
                key: Date.now(),
                disabledDays: { before: new Date(firstDate), after: new Date(lastDate) },
                renderDay,
                onMonthChange,
              }}
              onDayPickerShow={onDayPickerShow}
              selectedValues={roomDates}
              onSelected={onDateSelected}
            />
          </EditFormSection>
        </EditForm>
      </Modal>
    );
  };

  return (
    <StyledSummary className={className}>
      <Title>{path(['labels', 'totalNet'], uiConfig)}</Title>
      {renderTotal(total, saving)}
      {renderHotelName(name)}
      <Rooms>{renderRooms(accommodationProducts)}</Rooms>
      {/* <Title>{path(['labels', 'returnTransfers'], uiConfig)}</Title>
      <Title>{path(['labels', 'groundService'], uiConfig)}</Title>
      <Title>{path(['labels', 'addOns'], uiConfig)}</Title>
      <Title>{path(['labels', 'addCommission'], uiConfig)}</Title> */}
      {renderModal()}
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default SummaryForm;
