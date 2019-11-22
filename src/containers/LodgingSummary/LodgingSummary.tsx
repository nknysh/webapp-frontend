import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const possibleChildAges = {
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: '11',
  12: '12',
  13: '13',
  14: '14',
  15: '15',
  16: '16',
  17: '17',
};

// @ts-ignore
import { LodgingSummary, BookingBuilderAvailableProductSets } from 'interfaces';

// @ts-ignore
import { isNilOrEmpty } from 'ramda-adjunct';
import { compose, clone } from 'ramda';
import {
  formatPrice,
  // @ts-ignore
} from 'utils';

import {
  getAvailableMealPlansForAccommodation,
  getAppliedSupplementsForLodging,
  getLodgingTotals,
  getAppliedOffersForLodging,
} from '../../utils/bookingBuilder';

// @ts-ignore
import { OccasionsSelect } from 'components';

// @ts-ignore
import { Icon } from '@material-ui/core';

import { Text } from '../SummaryForm/SummaryForm.styles';

// @ts-ignore
import { DatePicker, RadioButton, NumberSelect, Button } from '@pure-escapes/webapp-ui-components';

import {
  LodgingSummaryCard,
  CollapseButton,
  CollapseHeader,
  LodgingSummaryTitle,
  LodgingTotal,
  LodgingTotalWrapper,
  ChildAgeSelect,
  CollapsibleSection,
  ButtonSmall,
} from './LodgingSummary.styles';
import connect from './LodgingSummary.state';

export const LodgingSummaryRender = props => {
  const lodging: LodgingSummary = props.lodging;
  const availableProductSets: BookingBuilderAvailableProductSets = props.availableProductSets;
  const potentialBooking: any = props.potentialBooking;

  const updateLodgingGuestAges: Function = props.updateLodgingGuestAges;
  const updateLodgingMealPlan: Function = props.updateLodgingMealPlan;
  const updateRequestedBuildLodgingDates: Function = props.updateRequestedBuildLodgingDates;
  const removeLodging: Function = props.removeLodging;
  const updateLodgingOccasions: Function = props.updateLodgingOccasions;
  const currencyCode: string = props.currencyCode;
  const editGuard: boolean = props.editGuard;
  const onEditGuard: Function = props.onEditGuard;

  const appliedSupplements = getAppliedSupplementsForLodging(lodging, availableProductSets, currencyCode);
  const lodgingTotals = getLodgingTotals(lodging, potentialBooking);
  const appliedOffers = getAppliedOffersForLodging(lodging, potentialBooking);

  const { t } = useTranslation();
  /**
   * handles opening/closing collapsables. makes use of editGuard and onEditGuard
   */
  const CollapseToggle = ({ isCollapsed, onClick }: { isCollapsed: boolean; onClick: Function }) => {
    return (
      <CollapseButton
        onClick={() => {
          if (editGuard) {
            return onEditGuard();
          }
          onClick(!isCollapsed);
        }}
      >
        {isCollapsed ? <Icon>keyboard_arrow_down</Icon> : <Icon>keyboard_arrow_up</Icon>}
      </CollapseButton>
    );
  };

  const OccupancyEditor = ({ onUpdate }: { onUpdate: Function }) => {
    const [numberOfAdults, setNumberOfAdults] = useState(lodging.guestAges.numberOfAdults);
    const [agesOfAllChildren, setAgesOfAllChildren] = useState(lodging.guestAges.agesOfAllChildren || []);

    const updateAgeOfChild = (index, value) => {
      const newAgesOfAllChildren = clone(agesOfAllChildren);
      newAgesOfAllChildren[index] = parseInt(value);
      setAgesOfAllChildren(newAgesOfAllChildren);
    };

    const handleUpdate = () => {
      const newGuestAges = {
        numberOfAdults,
        agesOfAllChildren,
      };
      updateLodgingGuestAges(lodging.hotelUuid, lodging.index, newGuestAges);
      onUpdate(true);
    };

    return (
      <div>
        <div className="lodging-summary__occupancy-editor__number-of-adults">
          <label>{t('labels.numberOfAdults')}</label>
          <br />
          <div style={{ display: 'inline-block' }}>
            <NumberSelect
              className="numberSelect"
              min={0}
              max={99}
              value={numberOfAdults}
              onAdd={() => setNumberOfAdults(numberOfAdults + 1)}
              onRemove={() => setNumberOfAdults(numberOfAdults - 1)}
            />
          </div>
        </div>

        <div className="lodging-summary__occupancy-editor__number-of-children">
          <label>{t('labels.numberOfChildren')}</label>
          <br />
          <div style={{ display: 'inline-block' }}>
            <NumberSelect
              className="numberSelect"
              min={0}
              max={99}
              value={agesOfAllChildren.length}
              onAdd={() => {
                setAgesOfAllChildren([...agesOfAllChildren, 0]);
              }}
              onRemove={() => {
                setAgesOfAllChildren(agesOfAllChildren.slice(0, agesOfAllChildren.length - 1));
              }}
            />
          </div>
        </div>

        {agesOfAllChildren.length >= 1 && (
          <div className="className='lodging-summary__occupancy-editor__specify-ages-of-children">
            <label>{t('labels.pleaseSpecifyAgesOfAllChildren')}:</label>
            <br />
            {agesOfAllChildren.map((ageOfChild, index) => {
              return (
                <ChildAgeSelect
                  options={possibleChildAges}
                  value={ageOfChild}
                  onChange={e => updateAgeOfChild(index, e.target.value)}
                />
              );
            })}
          </div>
        )}

        <ButtonSmall onClick={handleUpdate}>{t('labels.updateOccupancy')}</ButtonSmall>
      </div>
    );
  };

  const MealPlanEditor = ({ onUpdate }: { onUpdate: Function }) => {
    const availableMealPlans = getAvailableMealPlansForAccommodation(lodging, availableProductSets, currencyCode);
    const selectedMealPlanSetUuid = lodging.subProducts['Meal Plan'].map(m => m.uuid).join('/');

    const handleMealPlanSetSelection = (event, mealPlanSetUuid) => {
      const mealPlanUuids = mealPlanSetUuid.split('/');
      updateLodgingMealPlan(lodging.hotelUuid, lodging.index, mealPlanUuids);
      onUpdate(true);
    };

    if (isNilOrEmpty(availableMealPlans)) {
      return (
        <React.Fragment>
          <p>{t('labels.noMealPlansForDatesOccupancy')}</p>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <RadioButton
          onChange={handleMealPlanSetSelection}
          value={selectedMealPlanSetUuid}
          options={availableMealPlans}
        />
      </React.Fragment>
    );
  };

  const DateCollapsible = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
      <React.Fragment>
        <CollapseHeader>
          {lodging.nightsBreakdown}
          <CollapseToggle isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </CollapseHeader>

        {!isCollapsed && (
          <DatePicker
            label={t('labels.datePicker')}
            multiple={true}
            dayPickerProps={{
              month: new Date(lodging.startDate),
            }}
            onSelected={(dateValues: { startDate: Date; from: Date; to: Date }) => {
              if (dateValues.startDate || !dateValues.from || !dateValues.to) {
                // if we have a `startDate`, or `from` or `to` are empty, return out
                return;
              }
              updateRequestedBuildLodgingDates(lodging.hotelUuid, lodging.index, dateValues.from, dateValues.to);
              setIsCollapsed(true);
            }}
            selectedValues={{
              startDate: new Date(lodging.startDate),
              endDate: new Date(lodging.endDate),
            }}
            placeholder=""
          />
        )}
      </React.Fragment>
    );
  };

  const OccupancyCollapsible = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
      <CollapsibleSection>
        <CollapseHeader>
          {lodging.occupancyBreakdown}
          <CollapseToggle isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </CollapseHeader>

        {!isCollapsed && <OccupancyEditor onUpdate={val => setIsCollapsed(val)} />}
      </CollapsibleSection>
    );
  };

  const MealPlanCollapsible = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
      <CollapsibleSection>
        <CollapseHeader>
          {lodging.mealPlanBreakdown || 'Meal Plan Selection'}
          <CollapseToggle isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </CollapseHeader>

        {!isCollapsed && <MealPlanEditor onUpdate={val => setIsCollapsed(val)} />}
      </CollapsibleSection>
    );
  };

  const OccasionsCollapsible = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
      <CollapsibleSection>
        <CollapseHeader>
          <label>Occasion(s): </label>
          {lodging.occasionsBreakdown || <label>None</label>}
          <CollapseToggle isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </CollapseHeader>

        {!isCollapsed && (
          <OccasionsSelect
            onChange={e => {
              updateLodgingOccasions(lodging.hotelUuid, lodging.index, e.occasions);
            }}
            occasions={undefined} // need to specify undefined because OccassionsSelect is setup badly
            selected={lodging}
          />
        )}
      </CollapsibleSection>
    );
  };

  return (
    <LodgingSummaryCard className="lodging-summary">
      <LodgingSummaryTitle>
        <strong>{lodging.title}</strong>
        <LodgingTotalWrapper>
          <LodgingTotal data-discounted={true}>
            {currencyCode}
            {formatPrice(lodgingTotals.total)}
          </LodgingTotal>
          {lodgingTotals.totalBeforeDiscount && (
            <LodgingTotal data-secondary={true}>
              {currencyCode}
              {formatPrice(lodgingTotals.totalBeforeDiscount)}
            </LodgingTotal>
          )}
        </LodgingTotalWrapper>
      </LodgingSummaryTitle>
      <DateCollapsible />
      <OccupancyCollapsible />
      <MealPlanCollapsible />
      <OccasionsCollapsible />

      <CollapsibleSection>
        {appliedSupplements && appliedSupplements.length >= 1 && (
          <CollapseHeader>
            <label>{t('labels.appliedSupplements')}</label>
            {appliedSupplements.map(s => (
              <Text>{s}</Text>
            ))}
          </CollapseHeader>
        )}
      </CollapsibleSection>

      <CollapsibleSection>
        {appliedOffers && appliedOffers.length >= 1 && (
          <CollapseHeader>
            <label>{t('labels.appliedOffers')}</label>
            {appliedOffers.map(s => (
              <Text data-discounted="true">{s}</Text>
            ))}
          </CollapseHeader>
        )}
      </CollapsibleSection>
      <ButtonSmall
        onClick={() => {
          removeLodging(lodging.hotelUuid, lodging.index);
        }}
      >
        {t('labels.removeLodging')}
      </ButtonSmall>
    </LodgingSummaryCard>
  );
};

// @ts-ignore
export default compose(connect)(LodgingSummaryRender);
