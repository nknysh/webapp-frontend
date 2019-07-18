import React, { useState, useCallback } from 'react';
import {
  gt,
  dropLast,
  update,
  append,
  propOr,
  pipe,
  reduce,
  add,
  length,
  times,
  partial,
  prop,
  defaultTo,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import { DropDownContent, AgeSelect } from 'components/elements';
import { useEffectBoundary } from 'effects';

import { propTypes, defaultProps } from './LodgingSelect.props';
import {
  StyledLodgingSelect,
  LodgingSelectLabel,
  LodgingSelectEntryLabel,
  LodgingSelectSection,
  LodgingSelectEntry,
  LodgingSelectNumberSelect,
  Tabs,
  TabLabel,
} from './LodgingSelect.styles';

const getGuestsCounts = pipe(
  defaultTo([]),
  reduce(
    (accum, guestAges) =>
      pipe(
        add(propOr(0, 'numberOfAdults', guestAges)),
        add(length(propOr([], 'agesOfAllChildren', guestAges)))
      )(accum),
    0
  )
);

const renderLabel = label => label && <LodgingSelectLabel>{label}</LodgingSelectLabel>;

const renderTabLabels = (t, { errors }, i) => (
  <TabLabel key={i} value={i} data-error={!isNilOrEmpty(prop(i, errors))}>
    Room {i + 1}
  </TabLabel>
);

const renderLabels = (t, { totalRooms, ...props }) =>
  (gt(totalRooms, 1) && times(partial(renderTabLabels, [t, { totalRooms, ...props }]), totalRooms)) || [];

const renderTab = (t, { onAgeChange, rooms }, i) => (
  <AgeSelect key={i} values={prop(i, rooms)} onSelect={partial(onAgeChange, [i])} />
);

const renderTabs = (t, { totalRooms, ...props }) =>
  times(partial(renderTab, [t, { totalRooms, ...props }]), totalRooms);

export const LodgingSelect = ({ label, onSelected, rooms, contentOnly }) => {
  const { t } = useTranslation();

  const [tabIndex, setTabIndex] = useState(0);

  const totalRooms = length(rooms);
  const totalGuests = getGuestsCounts(rooms);
  const roomsSummary = `${totalRooms} ${t('room', { count: totalRooms })}`;
  const guestsSummary = `${totalGuests} ${t('guest', { count: totalGuests })}`;
  const summary = `${roomsSummary}, ${guestsSummary}`;

  useEffectBoundary(() => {
    if (totalRooms && gt(tabIndex + 1, totalRooms)) {
      setTabIndex(totalRooms - 1);
    }
  }, [rooms]);

  const onAddRoom = useCallback(() => {
    onSelected(
      append(
        {
          numberOfAdults: 0,
          agesOfAllChildren: [],
        },
        rooms
      )
    );
  }, [rooms, onSelected]);

  const onRemoveRoom = useCallback(() => {
    onSelected(dropLast(1, rooms));
  }, [rooms, onSelected]);

  const onAgeChange = useCallback(
    (i, values) => {
      onSelected(update(i, values, rooms));
    },
    [rooms, onSelected]
  );

  return (
    <StyledLodgingSelect>
      {renderLabel(label)}
      <DropDownContent inputContent={summary} contentOnly={contentOnly} closeOnClickAway={false}>
        <LodgingSelectSection>
          <LodgingSelectEntry>
            <LodgingSelectEntryLabel>{t('room_plural')}</LodgingSelectEntryLabel>
            <LodgingSelectNumberSelect value={totalRooms} onAdd={onAddRoom} onRemove={onRemoveRoom} />
          </LodgingSelectEntry>
        </LodgingSelectSection>

        <Tabs
          value={tabIndex}
          scrollButtons="auto"
          variant="scrollable"
          labels={renderLabels(t, { totalRooms })}
          onChange={setTabIndex}
          tabClassname="lodging-tab"
        >
          {renderTabs(t, { totalRooms, onAgeChange, rooms })}
        </Tabs>
      </DropDownContent>
    </StyledLodgingSelect>
  );
};

LodgingSelect.propTypes = propTypes;
LodgingSelect.defaultProps = defaultProps;

export default LodgingSelect;
