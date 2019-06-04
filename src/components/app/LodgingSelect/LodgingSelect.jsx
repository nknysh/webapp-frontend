import React from 'react';
import { curry, lensProp, view, set, propOr, pipe, omit, values, sum, map, length } from 'ramda';
import { useTranslation } from 'react-i18next';

import { DropDownContent, AgeSelect } from 'components/elements';

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
  map(length),
  sum
);

const renderLabel = label => label && <LodgingSelectLabel>{label}</LodgingSelectLabel>;

export const LodgingSelect = ({ label, onSelected, selectedValues, contentOnly }) => {
  const { t } = useTranslation();

  const updateCount = curry((lens, number) => {
    onSelected(set(lens, number, selectedValues));
  });

  const rooms = getRoomsCount(selectedValues);
  const guests = getGuestsCount(selectedValues);

  const roomsSummary = `${rooms} ${t('room', { count: rooms })}`;
  const guestsSummary = `${guests} ${t('guest', { count: guests })}`;
  const summary = `${roomsSummary}, ${guestsSummary}`;

  const quantity = view(roomsLens, selectedValues);

  return (
    <StyledLodgingSelect>
      {renderLabel(label)}
      <DropDownContent inputContent={summary} contentOnly={contentOnly} closeOnClickAway={false}>
        <LodgingSelectSection>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{t('room_plural')}</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect value={quantity} onChange={updateCount(roomsLens)} />
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
