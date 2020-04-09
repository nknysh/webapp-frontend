import React, { useCallback, Fragment } from 'react';
import {
  append,
  compose,
  equals,
  flatten,
  gt,
  head,
  isEmpty,
  join,
  length,
  map,
  mapObjIndexed,
  partial,
  pipe,
  prop,
  propEq,
  propOr,
  reduce,
  values,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { ToolTip } from '@pure-escapes/webapp-ui-components';

import { ProductTypes } from 'config/enums';

import { ContextMenu } from 'components';
import {
  replaceAccommodationWithRoom,
  groupErrorsByRoomIndex,
  getFromDateFormat,
  getToDateFormat,
  getNumberOfDays,
  mapWithIndex,
  formatPrice,
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
  HoldCountdown,
} from './SummaryRoom.styles';

const renderSupplement = (t, { currencyCode }, { product, title, total, quantity }) => (
  <ExtraSupplement key={product}>
    {quantity} x {title} - (<ExtraSupplementRate>{`${currencyCode}${formatPrice(total)}`}</ExtraSupplementRate>)
  </ExtraSupplement>
);

const renderSupplements = (t, props, supplements) =>
  pipe(map(partial(renderSupplement, [t, props])), flatten)(supplements);

const renderMealPlan = (t, { title, quantity }, i) => (
  <RoomRow key={i}>
    {t(ProductTypes.MEAL_PLAN)}: {quantity} x {title}
  </RoomRow>
);

const renderMealPlans = (t, mealPlans) => pipe(mapWithIndex(partial(renderMealPlan, [t])), flatten)(mealPlans);

const renderError = (message, i) => <Error key={i}>{message}</Error>;
const renderErrors = pipe(groupErrorsByRoomIndex, replaceAccommodationWithRoom, map(mapWithIndex(renderError)));

const renderHold = (t, hold, i) => (
  <HoldCountdown key={i} label={t('labels.expiresIn')} date={propOr(Date.now(), 'expires', hold)}>
    {t('labels.holdExpired')}
  </HoldCountdown>
);

const renderHolds = (t, data) => mapWithIndex(partial(renderHold, [t]), data);

const wrapOfferToolTip = ({ name, furtherInformation }) =>
  !isNilOrEmpty(furtherInformation) ? (
    <ToolTip helpText={true} label={name}>
      {furtherInformation}
    </ToolTip>
  ) : (
    name
  );

const renderOffer = (t, { offer }, i) => (
  <RoomRow data-discount={true} key={i}>
    {t('offer')}: {wrapOfferToolTip(offer)}
  </RoomRow>
);

const renderOffers = (t, offers) => mapWithIndex(partial(renderOffer, [t]), offers);

export const SummaryRoom = ({
  canEdit,
  className,
  currencyCode,
  dates,
  editGuard,
  errors,
  hold,
  id,
  offers,
  onEdit,
  onEditGuard,
  photo,
  preDiscountTotal,
  removeRoom,
  requestedRooms,
  roomId,
  rooms,
  showHolds,
  showImage,
  total,
  isOnRequest,
  hasUnusedAvailableMealPlanOffers,
}) => {
  const { t } = useTranslation();

  const product = getProduct(rooms);
  const supplements = getSupplements(rooms);
  const mealPlans = getMealPlans(rooms);
  const totalNights = getNumberOfDays(head(dates));
  const totalGuests = getTotalGuests(requestedRooms);
  const ageSplits = getAgeSplits(product, requestedRooms);
  const hasDiscount = !equals(total, preDiscountTotal);

  const hasErrors = gt(length(errors), 1);

  const onRemoveRoom = useCallback(() => removeRoom(id, roomId, true), [id, removeRoom, roomId]);
  const onEditRoom = useCallback(() => {
    if (editGuard) {
      return onEditGuard();
    }

    onEdit(roomId);
  }, [editGuard, onEdit, onEditGuard, roomId]);

  const roomHolds = reduce((accum, hold) => (propEq('hasHold', true, hold) ? append(hold, accum) : accum), [], hold);

  const hasHolds = !isEmpty(roomHolds);
  const hasImage = showImage && photo;

  return (
    <Room className={className}>
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
            {isOnRequest ? (
              <RoomPrice>{t('labels.onRequest')}</RoomPrice>
            ) : (
              <Fragment>
                <RoomPrice data-discount={hasDiscount}>{`${currencyCode}${formatPrice(total)}`}</RoomPrice>
                {hasDiscount && (
                  <RoomPrice data-discounted={hasDiscount}>{`${currencyCode}${formatPrice(
                    preDiscountTotal
                  )}`}</RoomPrice>
                )}
              </Fragment>
            )}
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
        <RoomRow>{renderSupplements(t, { currencyCode }, supplements)}</RoomRow>
        <RoomRow>{renderMealPlans(t, mealPlans)}</RoomRow>
        {!isEmpty(offers) && renderOffers(t, offers)}
        {hasUnusedAvailableMealPlanOffers && <p>{t('labels.mealPlanOffersAvailable')}</p>}
        {canEdit && renderErrors(errors)}
      </RoomDetails>
    </Room>
  );
};

SummaryRoom.propTypes = propTypes;
SummaryRoom.defaultProps = defaultProps;

export default compose(connect)(SummaryRoom);
