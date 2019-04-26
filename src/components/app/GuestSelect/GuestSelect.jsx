import React, { Fragment } from 'react';
import { curry, length, gt, prop, times, map, when, either, isNil, equals, always } from 'ramda';

import { AgeSelect } from 'components/elements';

import { getPlural } from 'config/ui';
import { isArray, isEmptyOrNil } from 'utils';

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

export const GuestSelect = ({ ageRanges, label, onSelected, selectedValues, minMax, errors, children }) => {
  const quantity = length(selectedValues);

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

  const renderTabLabels = i => <TabLabel data-error={!isEmptyOrNil(prop(i, errors))}>Room {i + 1}</TabLabel>;

  const labels = (gt(quantity, 1) && times(renderTabLabels, quantity)) || [];

  const tabs = times(renderTab, quantity);

  return (
    <StyledGuestSelect>
      {renderLabel(label)}
      <GuestSelectSection>
        <GuestSelectEntry>
          <GuestSelectEntryLabel>{getPlural('room')}</GuestSelectEntryLabel>
          <GuestSelectNumberSelect value={quantity} onChange={onQuantityChange} min={1} />
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
