import React from 'react';
import { gt, compose, length, prop, map, flatten, pipe } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import { DropDownMenu } from 'components/elements';

import {
  getFromDateFormat,
  getToDateFormat,
  getNumberOfDays,
  getFromToFromDates,
  replaceAccommodationWithRoom,
  groupErrorsByRoomIndex,
} from 'utils';

import { guestLine, getTotalGuests, getAgeSplits } from './SummaryRoom.utils';
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

const renderSupplement = ({ product, title, total, quantity }) => (
  <ExtraSupplement key={product}>
    {quantity} x {title} - (<ExtraSupplementRate>{total}</ExtraSupplementRate>)
  </ExtraSupplement>
);

const renderSupplements = pipe(
  map(map(renderSupplement)),
  flatten
);

// eslint-disable-next-line
const renderMealPlan = t => ({ product, title, quantity }) => (
  <RoomRow key={product}>
    {t('mealPlan')}: {quantity} x {title}
  </RoomRow>
);

const renderMealPlans = t =>
  pipe(
    map(map(renderMealPlan(t))),
    flatten
  );

const renderError = message => <Error key={message}>{message}</Error>;
const renderErrors = pipe(
  groupErrorsByRoomIndex,
  replaceAccommodationWithRoom,
  map(map(renderError))
);

export const SummaryRoom = ({
  canEdit,
  dates: dateArr,
  details,
  supplements,
  guests,
  hotelUuid,
  id,
  mealPlans,
  onEdit,
  onRemove,
  photo,
  total,
  potentialBooking,
  errors,
  ...props
}) => {
  const { t } = useTranslation();

  const dates = getFromToFromDates(dateArr);
  const datesCount = getNumberOfDays(dates);
  const ageSplits = getAgeSplits(guests);

  const onRemoveRoom = () => onRemove(hotelUuid, id, true);
  const onEditRoom = () => onEdit({ id });

  const hasErrors = gt(length(errors), 1);

  return (
    (details && dates && gt(length(guests), 0) && (
      <Room {...props}>
        {!canEdit && prop('url', photo) && (
          <RoomImages>
            <RoomImage src={prop('url', photo)} alt={prop('displayName', photo)} />
          </RoomImages>
        )}
        <RoomDetails>
          <RoomRow>
            <RoomColumn>
              <RoomName data-errors={hasErrors}>
                {prop('name', details)} ({length(potentialBooking)}) {hasErrors && '*'}
              </RoomName>
              <RoomDetail>
                {datesCount} {t('night', { count: datesCount })} | {getFromDateFormat(dates)} {getToDateFormat(dates)}
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
            {guestLine('guest', getTotalGuests(guests))} {!isNilOrEmpty(ageSplits) && `(${ageSplits})`}
          </RoomRow>
          <RoomRow>{renderSupplements(supplements)}</RoomRow>
          <RoomRow>{renderMealPlans(t)(mealPlans)}</RoomRow>
          {renderErrors(errors)}
        </RoomDetails>
      </Room>
    )) ||
    null
  );
};

SummaryRoom.propTypes = propTypes;
SummaryRoom.defaultProps = defaultProps;

export default compose(connect)(SummaryRoom);
