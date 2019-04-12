import React, { Fragment } from 'react';
import { all, always, equals, gt, mapObjIndexed, path, pipe, prop, sum, values, when } from 'ramda';
import hash from 'object-hash';
import { getFromDateFormat, getNumberOfDays, getToDateFormat, formatPrice, calculatePercentage } from 'utils';

import uiConfig, { getPluralisation } from 'config/ui';

import { propTypes, defaultProps } from './Summary.props';
import {
  HotelName,
  Room,
  RoomColumn,
  RoomDetail,
  RoomName,
  RoomPrice,
  RoomRow,
  Rooms,
  Saving,
  Section,
  StyledSummary,
  Text,
  Title,
  Total,
  MarginTotal,
  MarginTotalAmount,
  MarginPercentSuffix,
} from './Summary.styles';
import { getGuestsFromBooking, guestLine, additionalGuestLine } from './Summary.utils';

const renderTotal = (total, saving, margin) => (
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
    {prop('type', margin) && prop('value', margin) && (
      <MarginTotal>
        {path(['labels', 'currentMargin'], uiConfig)}{' '}
        <MarginTotalAmount>
          {formatPrice(
            equals('percentage', prop('type', margin))
              ? calculatePercentage(total, prop('value', margin))
              : prop('value', margin)
          )}
        </MarginTotalAmount>
        {equals('percentage', prop('type', margin)) && (
          <Fragment>
            {', '}
            <MarginPercentSuffix>{prop('value', margin)}</MarginPercentSuffix>{' '}
            {path(['labels', 'currentMarginPercentageSuffix'], uiConfig)}
          </Fragment>
        )}
      </MarginTotal>
    )}
  </Section>
);

const renderHotelName = name => name && <HotelName>{name}</HotelName>;

export const SummaryForm = ({
  booking,
  children,
  className,
  getHotelRoom,
  getRoomDates,
  getRoomTotal,
  hotel,
  saving,
  total,
}) => {
  const { accommodationProducts, margin } = booking;
  const { name } = hotel;

  const renderRoom = ({ quantity, ...roomBooking }, id) => {
    const roomDetails = getHotelRoom(id);
    const roomDates = getRoomDates(id);
    const roomDatesCount = getNumberOfDays(roomDates);
    const { adults, teens, children, infants } = getGuestsFromBooking(roomBooking);

    const totalGuests = sum([adults, teens, children, infants]);

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

  return (
    <StyledSummary className={className}>
      <Title>{path(['labels', 'totalNet'], uiConfig)}</Title>
      {renderTotal(total, saving, margin)}
      {renderHotelName(name)}
      <Rooms>{renderRooms(accommodationProducts)}</Rooms>
      {children}
    </StyledSummary>
  );
};

SummaryForm.propTypes = propTypes;
SummaryForm.defaultProps = defaultProps;

export default SummaryForm;
