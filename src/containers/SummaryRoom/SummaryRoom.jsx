import React from 'react';
import {
  gt,
  compose,
  length,
  partial,
  map,
  flatten,
  pipe,
  prop,
  join,
  values,
  mapObjIndexed,
  head,
  propOr,
  isEmpty,
  reduce,
  propEq,
  append,
} from 'ramda';
import { useTranslation } from 'react-i18next';

import { ProductTypes } from 'config/enums';

import { ContextMenu, Countdown } from 'components';
import {
  replaceAccommodationWithRoom,
  groupErrorsByRoomIndex,
  getFromDateFormat,
  getToDateFormat,
  getNumberOfDays,
  mapWithIndex,
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
  RoomName,
  RoomPrice,
  RoomRow,
  Error,
  Hold,
  HoldLabel,
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

const renderHold = (t, hold, i) => (
  <Countdown key={i} label={t('labels.expiresIn')} date={propOr(Date.now(), 'endDate', hold)}>
    {t('labels.holdExpired')}
  </Countdown>
);

const renderHolds = (t, data) => mapWithIndex(partial(renderHold, [t]), data);

export const SummaryRoom = ({
  canEdit,
  className,
  dates,
  editGuard,
  errors,
  id,
  onEdit,
  onEditGuard,
  photo,
  removeRoom,
  requestedRooms,
  roomId,
  rooms,
  total,
  hold,
  showImage,
  showHolds,
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
  const onEditRoom = () => {
    if (editGuard) {
      return onEditGuard();
    }

    onEdit(roomId);
  };

  const roomHolds = reduce((accum, hold) => (propEq('hasHold', true, hold) ? append(hold, accum) : accum), [], hold);

  const hasHolds = !isEmpty(roomHolds);
  const hasImage = showImage && photo;

  return (
    <Room key={roomId} className={className}>
      {(hasHolds || hasImage) && (
        <RoomImages>
          {hasImage && <RoomImage src={prop('url', photo)} />}
          {showHolds && hasHolds && (
            <Hold>
              <HoldLabel>{t('labels.roomIsHeld', { count: length(hold) })}</HoldLabel>
              {renderHolds(t, hold)}
            </Hold>
          )}
        </RoomImages>
      )}
      <RoomDetails>
        <RoomRow>
          <RoomColumn>
            <RoomName data-errors={hasErrors}>
              {prop('name', product)} ({length(requestedRooms)}) {hasErrors && '*'}
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
              <ContextMenu>
                <span onClick={onEditRoom}>{t('buttons.edit')}</span>
                <span onClick={onRemoveRoom}>{t('buttons.remove')}</span>
              </ContextMenu>
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
