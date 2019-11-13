import React, { useState } from 'react';
import { compose, clone } from 'ramda';
// @ts-ignore
import { Icon } from '@material-ui/core';

// @ts-ignore
import { Text } from 'components';
// @ts-ignore
import { isNilOrEmpty } from 'ramda-adjunct';

import { LodgingSummary, BookingBuilderAvailableProductSets } from 'interfaces';

// @ts-ignore
import { getAvailableMealPlansForAccommodation, getSelectedSupplementsForLodging, getLodgingTotals } from 'utils';

// @ts-ignore
import { DatePicker, RadioButton, NumberSelect } from '@pure-escapes/webapp-ui-components';
import connect from './LodgingSummary.state';

import {
  LodgingSummaryCard,
  CollapseButton,
  CollapseHeader,
  LodgingSummaryTitle,
  LodgingTotal,
} from './LodgingSummary.styles';

const CollapseToggle = ({ isCollapsed, onClick }: { isCollapsed: boolean; onClick: Function }) => {
  return (
    <CollapseButton onClick={() => onClick(!isCollapsed)}>
      {isCollapsed ? <Icon>keyboard_arrow_down</Icon> : <Icon>keyboard_arrow_up</Icon>}
    </CollapseButton>
  );
};

export const LodgingSummaryRender = props => {
  const lodging: LodgingSummary = props.lodging;
  const availableProductSets: BookingBuilderAvailableProductSets = props.availableProductSets;
  const updateRequestedBuildLodgingGuestAges: Function = props.updateRequestedBuildLodgingGuestAges;
  const updateRequestedBuildLodgingDates: Function = props.updateRequestedBuildLodgingDates;
  const updateRequestedBuildLodgingMealPlan: Function = props.updateRequestedBuildLodgingMealPlan;
  const currencyCode: string = props.currencyCode;

  const supplements = getSelectedSupplementsForLodging(lodging, availableProductSets);
  const lodgingTotals = getLodgingTotals(lodging, availableProductSets);

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
      updateRequestedBuildLodgingGuestAges(lodging.hotelUuid, lodging.index, newGuestAges);
      onUpdate(true);
    };

    return (
      <div>
        <div className="lodging-summary__occupancy-editor__number-of-adults">
          <label>Number of Adults</label>
          <br />
          <NumberSelect
            className="numberSelect"
            min={0}
            max={99}
            value={numberOfAdults}
            onAdd={() => setNumberOfAdults(numberOfAdults + 1)}
            onRemove={() => setNumberOfAdults(numberOfAdults - 1)}
          />
        </div>

        <div className="lodging-summary__occupancy-editor__number-of-children">
          <label>Number of Children</label>
          <br />
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

        {agesOfAllChildren.length >= 1 && (
          <div className="className='lodging-summary__occupancy-editor__specify-ages-of-children">
            <label>Please specify ages of all children:</label>

            {agesOfAllChildren.map((ageOfChild, index) => {
              return (
                <React.Fragment>
                  <select value={ageOfChild} onChange={e => updateAgeOfChild(index, e.target.value)}>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                    <option value="11">11</option>
                    <option value="12">12</option>
                    <option value="13">13</option>
                    <option value="14">14</option>
                    <option value="15">15</option>
                    <option value="16">16</option>
                    <option value="17">17</option>
                  </select>
                </React.Fragment>
              );
            })}
          </div>
        )}

        <button onClick={handleUpdate}>Update</button>
      </div>
    );
  };

  const MealPlanEditor = ({ onUpdate }: { onUpdate: Function }) => {
    const availableMealPlans = getAvailableMealPlansForAccommodation(lodging, availableProductSets, currencyCode);
    const selectedMealPlanSetUuid = lodging.subProducts['Meal Plan'].map(m => m.uuid).join('/');

    const handleMealPlanSetSelection = (event, mealPlanSetUuid) => {
      const mealPlanUuids = mealPlanSetUuid.split('/');
      updateRequestedBuildLodgingMealPlan(lodging.hotelUuid, lodging.index, mealPlanUuids);
      onUpdate(true);
    };

    if (isNilOrEmpty(availableMealPlans)) {
      return (
        <React.Fragment>
          <p>There are no available meal plans for the selected dates/occupancy</p>
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
            label={'Date picker'}
            multiple={true}
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
      <React.Fragment>
        <CollapseHeader>
          {lodging.occupancyBreakdown}
          <CollapseToggle isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </CollapseHeader>

        {!isCollapsed && <OccupancyEditor onUpdate={val => setIsCollapsed(val)} />}
      </React.Fragment>
    );
  };

  const MealPlanCollapsible = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
      <React.Fragment>
        <CollapseHeader>
          {lodging.mealPlanBreakdown || 'Meal Plan Selection'}
          <CollapseToggle isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </CollapseHeader>

        {!isCollapsed && <MealPlanEditor onUpdate={val => setIsCollapsed(val)} />}
      </React.Fragment>
    );
  };

  console.log('supplements', supplements);

  return (
    <LodgingSummaryCard className="lodging-summary">
      <Text>
        <strong>{lodging.title}</strong>
        <div>
          <Text>{lodgingTotals.total}</Text>
          {lodgingTotals.totalBeforeDiscount && <Text>{lodgingTotals.totalBeforeDiscount}</Text>}
        </div>
      </Text>
      <DateCollapsible />
      <OccupancyCollapsible />
      <MealPlanCollapsible />
      {supplements && supplements.length >= 1 && (
        <div>
          <label>Supplements</label>
          {supplements.map(s => (
            <Text>{s}</Text>
          ))}
        </div>
      )}
    </LodgingSummaryCard>
  );
};

// @ts-ignore
export default compose(connect)(LodgingSummaryRender);
