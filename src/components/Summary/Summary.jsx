import React, { Fragment } from 'react';
import { all, always, equals, gt, mapObjIndexed, path, pipe, prop, values, when, length } from 'ramda';
import hash from 'object-hash';
import { getFromDateFormat, getNumberOfDays, getToDateFormat, formatPrice, calculatePercentage } from 'utils';

import { guestLine, getTotalGuests, getAgeSplits } from 'components/SummaryForm/SummaryForm.utils';
import uiConfig, { getPluralisation, getSingular } from 'config/ui';
import { isEmptyOrNil } from 'utils';

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
  getRoomMealPlan,
  hotel,
  saving,
  total,
}) => {
  const { accommodationProducts, margin } = booking;
  const { name } = hotel;

  const renderRoom = ({ quantity }, id) => {
    const roomDetails = getHotelRoom(id);
    const roomDates = getRoomDates(id);
    const roomDatesCount = getNumberOfDays(roomDates);
    const roomMealPlan = getRoomMealPlan(id);

    const ageSplits = getAgeSplits(quantity);

    return (
      roomDetails &&
      roomDates &&
      gt(length(quantity), 0) && (
        <Room key={hash(roomDetails)}>
          <RoomRow>
            <RoomColumn>
              <RoomName>
                {prop('name', roomDetails)} ({length(quantity)})
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
            {guestLine('guest', getTotalGuests(quantity))} {!isEmptyOrNil(ageSplits) && `(${ageSplits})`}
          </RoomRow>
          {roomMealPlan && (
            <RoomRow>
              {getSingular('mealPlan')}: {prop('name', roomMealPlan)}
            </RoomRow>
          )}
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
