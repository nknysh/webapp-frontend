import React from 'react';
import { gt, compose, length, partial, map, flatten, pipe, prop, join, values, mapObjIndexed, head } from 'ramda';
import { useTranslation } from 'react-i18next';

import { DropDownMenu } from 'components/elements';

import { ProductTypes } from 'config/enums';

import {
  replaceAccommodationWithRoom,
  groupErrorsByRoomIndex,
  getFromDateFormat,
  getToDateFormat,
  getNumberOfDays,
} from 'utils';

import { getProduct, getSupplements, getMealPlans, getTotalGuests, getAgeSplits } from './SummaryRoom.utils';
import connect from './SummaryRoom.state';
import { propTypes, defaultProps } from './SummaryRoom.props';
import {
  ExtraSupplement,
  ExtraSupplementRate,
  Room,
  RoomColumn,
  RoomDetail,
  RoomDetails,
  RoomImage,
  RoomImages,
  RoomMenu,
  RoomName,
  RoomPrice,
  RoomRow,
  Error,
} from './SummaryRoom.styles';

const renderSupplement = (t, { product, title, total, quantity }) => (
  <ExtraSupplement key={product}>
    {quantity} x {title} - (<ExtraSupplementRate>{total}</ExtraSupplementRate>)
  </ExtraSupplement>
);

const renderSupplements = (t, supplements) =>
  pipe(
    map(partial(renderSupplement, [t])),
    flatten
  )(supplements);

const renderMealPlan = (t, { product, title, quantity }) => (
  <RoomRow key={product}>
    {t(ProductTypes.MEAL_PLAN)}: {quantity} x {title}
  </RoomRow>
);

const renderMealPlans = (t, mealPlans) =>
  pipe(
    map(partial(renderMealPlan, [t])),
    flatten
  )(mealPlans);

const renderError = message => <Error key={message}>{message}</Error>;
const renderErrors = pipe(
  groupErrorsByRoomIndex,
  replaceAccommodationWithRoom,
  map(map(renderError))
);

export const SummaryRoom = ({
  canEdit,
  className,
  errors,
  id,
  roomId,
  onEdit,
  photo,
  removeRoom,
  requestedRooms,
  rooms,
  total,
  dates,
}) => {
  const { t } = useTranslation();

  const product = getProduct(rooms);
  const supplements = getSupplements(rooms);
  const mealPlans = getMealPlans(rooms);
  const totalNights = getNumberOfDays(head(dates));
  const totalGuests = getTotalGuests(requestedRooms);
  const ageSplits = getAgeSplits(product, requestedRooms);

  const hasErrors = gt(length(errors), 1);

  const onRemoveRoom = () => removeRoom(id, roomId, true);
  const onEditRoom = () => onEdit(roomId);

  return (
    <Room key={roomId} className={className}>
      {!canEdit && prop('url', photo) && (
        <RoomImages>
          <RoomImage src={prop('url', photo)} alt={prop('displayName', photo)} />
        </RoomImages>
      )}
      <RoomDetails>
        <RoomRow>
          <RoomColumn>
            <RoomName data-errors={hasErrors}>
              {prop('name', product)} ({length(rooms)}) {hasErrors && '*'}
            </RoomName>
            <RoomDetail>
              {totalNights} {t('night', { count: totalNights })} | {getFromDateFormat(head(dates))}{' '}
              {getToDateFormat(head(dates))}
            </RoomDetail>
          </RoomColumn>
          <RoomColumn data-shrink={true}>
            <RoomPrice>{total}</RoomPrice>
          </RoomColumn>
          {canEdit && (
            <RoomColumn data-shrink={true}>
              <DropDownMenu showArrow={false} title={<RoomMenu>more_vert</RoomMenu>}>
                <span onClick={onEditRoom}>{t('buttons.edit')}</span>
                <span onClick={onRemoveRoom}>{t('buttons.remove')}</span>
              </DropDownMenu>
            </RoomColumn>
          )}
        </RoomRow>
        <RoomRow>
          {totalGuests} {t('guest', { count: totalGuests })} (
          {join(' + ', values(mapObjIndexed((value, key) => `${value} ${t(key)}`, ageSplits)))})
        </RoomRow>
        <RoomRow>{renderSupplements(t, supplements)}</RoomRow>
        <RoomRow>{renderMealPlans(t, mealPlans)}</RoomRow>
        {canEdit && renderErrors(errors)}
      </RoomDetails>
    </Room>
  );
};

SummaryRoom.propTypes = propTypes;
SummaryRoom.defaultProps = defaultProps;

export default compose(connect)(SummaryRoom);
