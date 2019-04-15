import React from 'react';
import { curry, length, gt, map, range, prop } from 'ramda';

import AgeSelect from 'components/AgeSelect';

import { getPlural } from 'config/ui';

import { propTypes, defaultProps } from './GuestSelect.props';
import {
  StyledGuestSelect,
  GuestSelectLabel,
  GuestSelectEntryLabel,
  GuestSelectSection,
  GuestSelectEntry,
  GuestSelectNumberSelect,
  RoomTabs,
} from './GuestSelect.styles';

const renderLabel = label => label && <GuestSelectLabel>{label}</GuestSelectLabel>;

export const GuestSelect = ({ label, onSelected, selectedValues }) => {
  const quantity = length(selectedValues);

  const labels = (gt(quantity, 1) && map(i => `Room ${i + 1}`, range(0, quantity))) || [];

  const onQuantityChange = number => {
    selectedValues.length = number;
    onSelected(selectedValues);
  };

  const onAgesChange = curry((i, ageValues) => {
    selectedValues[i] = ageValues;
    onSelected(selectedValues);
  });

  const tabs = map(
    i => <AgeSelect key={i} onSelect={onAgesChange(i)} values={prop(i, selectedValues)} />,
    range(0, quantity)
  );

  return (
    <StyledGuestSelect>
      {renderLabel(label)}
      <GuestSelectSection>
        <GuestSelectEntry>
          <GuestSelectEntryLabel>{getPlural('room')}</GuestSelectEntryLabel>
          <GuestSelectNumberSelect value={quantity} onChange={onQuantityChange} />
        </GuestSelectEntry>
      </GuestSelectSection>
      <RoomTabs scrollButtons="auto" variant="scrollable" labels={labels}>
        {tabs}
      </RoomTabs>
    </StyledGuestSelect>
  );
};

GuestSelect.propTypes = propTypes;
GuestSelect.defaultProps = defaultProps;

export default GuestSelect;
