import React from 'react';
import { curry, lensProp, view, set, propOr, pipe, omit, values, sum } from 'ramda';

import DropDownContent from 'components/DropDownContent';
import AgeSelect from 'components/AgeSelect';

import { getPluralisation, getPlural } from 'config/ui';

import { propTypes, defaultProps } from './LodgingSelect.props';
import {
  StyledLodgingSelect,
  LodgingSelectLabel,
  LodgingSelectEntryLabel,
  LodgingSelectSection,
  LodgingSelectEntry,
  LodgingSelectNumberSelect,
} from './LodgingSelect.styles';

const withoutQuantity = omit(['quantity']);
const roomsLens = lensProp('quantity');
const getRoomsCount = propOr(0, 'quantity');
const getGuestsCount = pipe(
  withoutQuantity,
  values,
  sum
);

const renderLabel = label => label && <LodgingSelectLabel>{label}</LodgingSelectLabel>;

export const LodgingSelect = ({ label, onSelected, selectedValues, contentOnly }) => {
  const updateCount = curry((lens, number) => {
    onSelected(set(lens, number, selectedValues));
  });

  const rooms = getRoomsCount(selectedValues);
  const guests = getGuestsCount(selectedValues);

  const roomsSummary = `${rooms} ${getPluralisation('room', rooms)}`;
  const guestsSummary = `${guests} ${getPluralisation('guest', guests)}`;
  const summary = `${roomsSummary}, ${guestsSummary}`;

  const quantity = view(roomsLens, selectedValues);

  return (
    <StyledLodgingSelect>
      {renderLabel(label)}
      <DropDownContent inputContent={summary} contentOnly={contentOnly}>
        <LodgingSelectSection>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{getPlural('room')}</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect startAt={quantity} onChange={updateCount(roomsLens)} />
          </LodgingSelectEntry>
        </LodgingSelectSection>
        <AgeSelect values={withoutQuantity(selectedValues)} onSelect={onSelected} />
      </DropDownContent>
    </StyledLodgingSelect>
  );
};

LodgingSelect.propTypes = propTypes;
LodgingSelect.defaultProps = defaultProps;

export default LodgingSelect;
