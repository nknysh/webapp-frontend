import React from 'react';
import { curry, lensProp, view, set, prop, pipe, omit, values, sum } from 'ramda';

import { DropDownContent } from 'components';

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

const roomsLens = lensProp('rooms');
const adultsLens = lensProp('adults');
const teensLens = lensProp('teens');
const childrenLens = lensProp('children');
const infantsLens = lensProp('infants');

const getRoomsCount = prop('rooms');
const getGuestsCount = pipe(
  omit(['rooms']),
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

  return (
    <StyledLodgingSelect>
      {renderLabel(label)}
      <DropDownContent inputContent={summary} contentOnly={contentOnly}>
        <LodgingSelectSection>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{getPlural('room')}</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect startAt={view(roomsLens, selectedValues)} onChange={updateCount(roomsLens)} />
          </LodgingSelectEntry>
        </LodgingSelectSection>
        <LodgingSelectSection>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{getPlural('adult')}</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect startAt={view(adultsLens, selectedValues)} onChange={updateCount(adultsLens)} />
          </LodgingSelectEntry>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{getPlural('teen')} (13-18)</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect startAt={view(teensLens, selectedValues)} onChange={updateCount(teensLens)} />
          </LodgingSelectEntry>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{getPlural('children')} (2-12)</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect
              startAt={view(childrenLens, selectedValues)}
              onChange={updateCount(childrenLens)}
            />
          </LodgingSelectEntry>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{getPlural('infant')} (0-2)</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect
              startAt={view(infantsLens, selectedValues)}
              onChange={updateCount(infantsLens)}
            />
          </LodgingSelectEntry>
        </LodgingSelectSection>
      </DropDownContent>
    </StyledLodgingSelect>
  );
};

LodgingSelect.propTypes = propTypes;
LodgingSelect.defaultProps = defaultProps;

export default LodgingSelect;
