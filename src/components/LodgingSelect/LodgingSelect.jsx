import React, { useState, useEffect } from 'react';
import { lensProp, view, set, prop, pipe, omit, values, sum } from 'ramda';

import { getPluralisation, getPlural } from 'config/ui';
import { DropDownContent } from 'components';

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

export const LodgingSelect = ({ id, label, onSelected, selectedValues }) => {
  const [data, setData] = useState(
    selectedValues || {
      rooms: 0,
      adults: 0,
      teens: 0,
      children: 0,
      infants: 0,
    }
  );

  useEffect(() => {
    onSelected(data);
  }, [data]);

  const rooms = getRoomsCount(data);
  const guests = getGuestsCount(data);

  const roomsSummary = `${rooms} ${getPluralisation('room', rooms)}`;
  const guestsSummary = `${guests} ${getPluralisation('guest', guests)}`;

  const summary = `${roomsSummary}, ${guestsSummary}`;

  return (
    <StyledLodgingSelect>
      {renderLabel(label)}
      <DropDownContent id={id} inputContent={summary}>
        <LodgingSelectSection>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{getPlural('room')}</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect
              startAt={view(roomsLens, data)}
              onChange={number => setData(set(roomsLens, number, data))}
            />
          </LodgingSelectEntry>
        </LodgingSelectSection>
        <LodgingSelectSection>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{getPlural('adult')}</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect
              startAt={view(adultsLens, data)}
              onChange={number => setData(set(adultsLens, number, data))}
            />
          </LodgingSelectEntry>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{getPlural('teen')} (13-18)</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect
              startAt={view(teensLens, data)}
              onChange={number => setData(set(teensLens, number, data))}
            />
          </LodgingSelectEntry>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{getPlural('children')} (2-12)</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect
              startAt={view(childrenLens, data)}
              onChange={number => setData(set(childrenLens, number, data))}
            />
          </LodgingSelectEntry>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{getPlural('infant')} (0-2)</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect
              startAt={view(infantsLens, data)}
              onChange={number => setData(set(infantsLens, number, data))}
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
