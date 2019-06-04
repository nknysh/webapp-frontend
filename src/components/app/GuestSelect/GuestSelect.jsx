import React, { Fragment } from 'react';
import { curry, length, gt, prop, times, map, when, either, isNil, equals, always } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import { AgeSelect } from 'components/elements';
import { isArray } from 'utils';

import { propTypes, defaultProps } from './GuestSelect.props';
import {
  StyledGuestSelect,
  GuestSelectLabel,
  GuestSelectEntryLabel,
  GuestSelectSection,
  GuestSelectEntry,
  GuestSelectNumberSelect,
  RoomTabs,
  TabLabel,
} from './GuestSelect.styles';

const renderLabel = label => label && <GuestSelectLabel>{label}</GuestSelectLabel>;

export const GuestSelect = ({
  ageRanges,
  label,
  onSelected,
  selectedValues,
  minMax,
  errors,
  children,
  onRoomChange,
  selectedRoom,
}) => {
  const { t } = useTranslation();

  const rooms = length(selectedValues);

  const onQuantityChange = number => {
    selectedValues.length = number;
    onSelected(map(when(either(isNil, equals(undefined)), always({})), selectedValues));
  };

  const onAgesChange = curry((i, ageValues) => {
    selectedValues[i] = ageValues;
    onSelected(selectedValues);
  });

  const renderTab = i => (
    <Fragment key={i}>
      <AgeSelect
        ageRanges={{ adult: {}, ...ageRanges }}
        onSelect={onAgesChange(i)}
        values={prop(i, selectedValues)}
        minMax={minMax}
      />
      {isArray(errors) && prop(i, errors)}
      {isArray(children) && prop(i, children)}
    </Fragment>
  );

  const renderTabLabels = i => (
    <TabLabel key={i} value={i} data-error={!isNilOrEmpty(prop(i, errors))}>
      Room {i + 1}
    </TabLabel>
  );

  const labels = (gt(rooms, 1) && times(renderTabLabels, rooms)) || [];

  const tabs = times(renderTab, rooms);

  return (
    <StyledGuestSelect>
      {renderLabel(label)}
      <GuestSelectSection>
        <GuestSelectEntry>
          <GuestSelectEntryLabel>{t('room_plural')}</GuestSelectEntryLabel>
          <GuestSelectNumberSelect value={rooms} onChange={onQuantityChange} min={1} />
        </GuestSelectEntry>
      </GuestSelectSection>
      <RoomTabs value={selectedRoom} scrollButtons="auto" variant="scrollable" labels={labels} onChange={onRoomChange}>
        {tabs}
      </RoomTabs>
    </StyledGuestSelect>
  );
};

GuestSelect.propTypes = propTypes;
GuestSelect.defaultProps = defaultProps;

export default GuestSelect;
