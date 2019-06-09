import React, { Fragment } from 'react';
import { gt, prop, times, partial } from 'ramda';
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

const renderGuestNumberSelect = (t, { totalRooms, onAddRoom, onRemoveRoom, onQuantityChange }) => (
  <GuestSelectEntry>
    <GuestSelectEntryLabel>{t('room_plural')}</GuestSelectEntryLabel>
    <GuestSelectNumberSelect
      value={totalRooms}
      onAdd={onAddRoom}
      onRemove={onRemoveRoom}
      onChange={onQuantityChange}
      min={1}
    />
  </GuestSelectEntry>
);

const renderTabLabels = (t, { errors }, i) => (
  <TabLabel key={i} value={i} data-error={!isNilOrEmpty(prop(i, errors))}>
    Room {i + 1}
  </TabLabel>
);

const renderLabels = (t, { totalRooms, ...props }) =>
  (gt(totalRooms, 1) && times(partial(renderTabLabels, [t, { totalRooms, ...props }]), totalRooms)) || [];

const renderTab = (t, { ageRanges, values, errors, onAgesChange, minMax, children }, i) => (
  <Fragment key={i}>
    <AgeSelect
      ageRanges={{ adult: {}, ...prop(i, ageRanges) }}
      minMax={prop(i, minMax)}
      values={prop(i, values)}
      onSelect={partial(onAgesChange, [i])}
    />
    {isArray(errors) && prop(i, errors)}
    {isArray(children) && prop(i, children)}
  </Fragment>
);

const renderTabs = (t, { totalRooms, ...props }) =>
  times(partial(renderTab, [t, { totalRooms, ...props }]), totalRooms);

export const GuestSelect = ({
  ageRanges,
  children,
  errors,
  label,
  minMax,
  onAddRoom,
  onQuantityChange,
  onRemoveRoom,
  onSelected,
  onTabChange,
  tabIndex,
  totalRooms,
  values,
}) => {
  const { t } = useTranslation();

  const onAgesChange = (i, ageValues) => {
    values[i] = ageValues;
    onSelected(ageValues, i);
  };

  return (
    <StyledGuestSelect>
      {renderLabel(label)}
      <GuestSelectSection>
        {renderGuestNumberSelect(t, { totalRooms, onAddRoom, onRemoveRoom, onQuantityChange })}
      </GuestSelectSection>
      <RoomTabs
        value={tabIndex}
        scrollButtons="auto"
        variant="scrollable"
        labels={renderLabels(t, { totalRooms })}
        onChange={onTabChange}
      >
        {renderTabs(t, { totalRooms, ageRanges, values, errors, minMax, children, onAgesChange })}
      </RoomTabs>
    </StyledGuestSelect>
  );
};

GuestSelect.propTypes = propTypes;
GuestSelect.defaultProps = defaultProps;

export default GuestSelect;
