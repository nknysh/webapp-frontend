import React from 'react';
import { gt, length, path, prop } from 'ramda';

import uiConfig, { getPluralisation, getSingular } from 'config/ui';

import { DropDownMenu } from 'components/elements';

import { getFromDateFormat, getToDateFormat, isEmptyOrNil, getNumberOfDays } from 'utils';

import { guestLine, getTotalGuests, getAgeSplits } from './SummaryRoom.utils';
import { propTypes, defaultProps } from './SummaryRoom.props';
import { Room, RoomColumn, RoomDetail, RoomMenu, RoomName, RoomPrice, RoomRow } from './SummaryRoom.styles';

export const SummaryRoom = ({ id, details, dates, total, mealPlan, quantity, onChange, onEdit, canEdit, ...props }) => {
  const datesCount = getNumberOfDays(dates);
  const ageSplits = getAgeSplits(quantity);

  const onRemoveRoom = () => onChange({ accommodationProducts: { [id]: { quantity: [] } } });
  const onEditRoom = () => onEdit({ id, quantity, mealPlan });

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
