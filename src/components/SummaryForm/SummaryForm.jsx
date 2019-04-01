import React from 'react';
import { gt, path, prop, mapObjIndexed, values, pipe, when, all, equals, always, multiply, lensPath } from 'ramda';
import hash from 'object-hash';

import { DropDownMenu } from 'components';
import { getNumberOfDays, getFromDateFormat, getToDateFormat } from 'utils';

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

  const renderRoom = ({ quantity }, id) => {
    const roomDetails = getHotelRoom(id);
    const roomDates = getRoomDates(id);
    const roomDatesCount = getNumberOfDays(roomDates);
    const rate = path(['bestRate', 'rate'], roomDetails);
    const bookingRoomQuantityLens = lensPath(['rooms', id, 'quantity']);

    const onRemoveRoom = () => {
      onBookingChange(bookingRoomQuantityLens, 0);
    };

    return (
      roomDetails &&
      rate &&
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
            <RoomPrice>{multiply(rate, quantity).toFixed(2)}</RoomPrice>
          </RoomColumn>
          <RoomColumn data-shrink={true}>
            <DropDownMenu showArrow={false} title={<RoomMenu>more_vert</RoomMenu>}>
              <span>Edit</span>
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

  return (
    <StyledSummary className={className}>
      <Title>{path(['labels', 'totalNet'], uiConfig)}</Title>
      {renderTotal(total, saving)}
      {renderHotelName(prop('name', hotel))}
      <Rooms>{renderRooms(rooms)}</Rooms>
      {/* <Title>{path(['labels', 'returnTransfers'], uiConfig)}</Title>
      <Title>{path(['labels', 'groundService'], uiConfig)}</Title>
      <Title>{path(['labels', 'addOns'], uiConfig)}</Title>
      <Title>{path(['labels', 'addCommission'], uiConfig)}</Title> */}
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default SummaryForm;
