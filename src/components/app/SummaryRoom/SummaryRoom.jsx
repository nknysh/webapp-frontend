import React, { Fragment } from 'react';
import { gt, length, path, prop, map, toPairs, pipe, head, last, equals } from 'ramda';

import uiConfig, { getPluralisation, getSingular } from 'config/ui';

import { DropDownMenu } from 'components/elements';

import { getFromDateFormat, getToDateFormat, isEmptyOrNil, getNumberOfDays } from 'utils';

import { guestLine, getTotalGuests, getAgeSplits, extrasHasSplitRates } from './SummaryRoom.utils';
import { propTypes, defaultProps } from './SummaryRoom.props';
import {
  Room,
  RoomColumn,
  RoomDetail,
  RoomMenu,
  RoomName,
  RoomPrice,
  RoomRow,
  ExtraSupplementRate,
  ExtraSupplement,
} from './SummaryRoom.styles';

export const SummaryRoom = ({
  id,
  details,
  dates,
  total,
  mealPlan,
  quantity,
  onEdit,
  canEdit,
  extraSupplements,
  onRemove,
  hotelUuid,
  ...props
}) => {
  const datesCount = getNumberOfDays(dates);
  const ageSplits = getAgeSplits(quantity);

  const onRemoveRoom = () => onRemove({ hotelUuid, id });
  const onEditRoom = () => onEdit({ id });

  const renderExtraSupplement = ([type, rates]) => {
    const renderSupplement = ([rate, { amount, dates }]) => {
      const firstDate = head(dates);
      const lastDate = last(dates);

      return (
        <ExtraSupplement key={`${type}-${rate}`}>
          {path(['labels', 'extra'], uiConfig)}: {amount} {getPluralisation(type, amount) || type} (+{' '}
          <ExtraSupplementRate>{rate}</ExtraSupplementRate>/pp){' '}
          {extrasHasSplitRates(rates) && (
            <Fragment>
              | {firstDate} {!equals(lastDate, firstDate) && `- ${lastDate}`}
            </Fragment>
          )}
        </ExtraSupplement>
      );
    };
    const supplements = pipe(
      toPairs,
      map(renderSupplement)
    )(rates);

    return <Fragment key={type}>{supplements}</Fragment>;
  };

  const renderExtraSupplements = () => {
    const extras = pipe(
      toPairs,
      map(renderExtraSupplement)
    )(extraSupplements);

    return extras;
  };

  return (
    details &&
    dates &&
    gt(length(quantity), 0) && (
      <Room {...props}>
        <RoomRow>
          <RoomColumn>
            <RoomName>
              {prop('name', details)} ({length(quantity)})
            </RoomName>
            <RoomDetail>
              {datesCount} {getPluralisation('night', datesCount)} | {getFromDateFormat(dates)} {getToDateFormat(dates)}
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
          {guestLine('guest', getTotalGuests(quantity))} {!isEmptyOrNil(ageSplits) && `(${ageSplits})`}
        </RoomRow>
        <RoomRow>{renderExtraSupplements()}</RoomRow>
        {mealPlan && (
          <RoomRow>
            {getSingular('mealPlan')}: {prop('name', mealPlan)}
          </RoomRow>
        )}
      </Room>
    )
  );
};

SummaryRoom.propTypes = propTypes;
SummaryRoom.defaultProps = defaultProps;

export default SummaryRoom;
