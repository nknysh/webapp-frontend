import React from 'react';
import { gt, compose, length, path, prop, map, flatten, pipe } from 'ramda';

import uiConfig, { getPluralisation, getSingular } from 'config/ui';

import { DropDownMenu } from 'components/elements';

import {
  getFromDateFormat,
  getToDateFormat,
  isEmptyOrNil,
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

// eslint-disable-next-line react/prop-types
const renderSupplement = ({ product, title, total, quantity }) => (
  <ExtraSupplement key={product}>
    {quantity} x {title} - (<ExtraSupplementRate>{total}</ExtraSupplementRate>)
  </ExtraSupplement>
);

const renderSupplements = pipe(
  map(map(renderSupplement)),
  flatten
);

// eslint-disable-next-line react/prop-types
const renderMealPlan = ({ product, title, quantity }) => (
  <RoomRow key={product}>
    {getSingular('mealPlan')}: {quantity} x {title}
  </RoomRow>
);

const renderMealPlans = pipe(
  map(map(renderMealPlan)),
  flatten
);

// eslint-disable-next-line react/prop-types
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
                {datesCount} {getPluralisation('night', datesCount)} | {getFromDateFormat(dates)}{' '}
                {getToDateFormat(dates)}
              </RoomDetail>
            </RoomColumn>
            <RoomColumn data-shrink={true}>
              <RoomPrice>{total}</RoomPrice>
            </RoomColumn>
            {canEdit && (
              <RoomColumn data-shrink={true}>
                <DropDownMenu showArrow={false} title={<RoomMenu>more_vert</RoomMenu>}>
                  <span onClick={onEditRoom}>{path(['buttons', 'edit'], uiConfig)}</span>
                  <span onClick={onRemoveRoom}>{path(['buttons', 'remove'], uiConfig)}</span>
                </DropDownMenu>
              </RoomColumn>
            )}
          </RoomRow>
          <RoomRow>
            {guestLine('guest', getTotalGuests(guests))} {!isEmptyOrNil(ageSplits) && `(${ageSplits})`}
          </RoomRow>
          <RoomRow>{renderSupplements(supplements)}</RoomRow>
          <RoomRow>{renderMealPlans(mealPlans)}</RoomRow>
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
