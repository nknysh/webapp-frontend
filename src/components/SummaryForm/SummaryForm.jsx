import React, { useState } from 'react';
import { gt, path, prop, mapObjIndexed, values, pipe, when, all, equals, always, multiply, lensPath, propOr } from 'ramda';
import hash from 'object-hash';

import { DropDownMenu, Modal, LodgingSelect, DatePicker } from 'components';
import { getNumberOfDays, getFromDateFormat, getToDateFormat, formatPrice } from 'utils';

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
  EditFormSection
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
  onBookingChange,
}) => {
  const { rooms } = booking;
  const { name } = hotel;

  const [modalData, setModalData] = useState({});

  const onModalClose = () => setModalData({});

  const renderRoom = ({ quantity, bestRate }, id) => {
    const roomDetails = getHotelRoom(id);
    const roomDates = getRoomDates(id);
    const roomDatesCount = getNumberOfDays(roomDates);
    const roomRate = propOr(path(['bestRate', 'rate'], roomDetails), 'rate', bestRate);

    const bookingRoomQuantityLens = lensPath(['rooms', id, 'quantity']);

    const onRemoveRoom = () => onBookingChange(bookingRoomQuantityLens, 0);
    const onEditRoom = () => setModalData({id, quantity});

    return (
      roomDetails &&
      roomDates &&
      roomRate &&
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
            <RoomPrice>{formatPrice(multiply(roomRate, quantity))}</RoomPrice>
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
    const {id, quantity} = modalData;

    if(!id) return null;
  

    const { name } = getHotelRoom(id);
    const roomDates = getRoomDates(id);
    
    const onDateSelected = range => onBookingChange({ rooms: { [id]: { dates: range }} }); 
    
    return (
      <Modal open={true} onClose={onModalClose}>
        <EditForm>
          <EditFormTitle>{name}</EditFormTitle>
          <EditFormSection>
            <LodgingSelect contentOnly={true} selectedValues={{ rooms: quantity }} />
          </EditFormSection>
          <EditFormSection>
            <DatePicker selectedValues={roomDates} onSelected={onDateSelected}/>
          </EditFormSection>
        </EditForm>
      </Modal>
    )

  }

  return (
    <StyledSummary className={className}>
      <Title>{path(['labels', 'totalNet'], uiConfig)}</Title>
      {renderTotal(total, saving)}
      {renderHotelName(name)}
      <Rooms>{renderRooms(rooms)}</Rooms>
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
