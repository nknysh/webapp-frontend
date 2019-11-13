import React, { useState } from 'react';
import { compose } from 'ramda';

// @ts-ignore
import { isNilOrEmpty } from 'ramda-adjunct';

import { LodgingSummary, BookingBuilderAvailableProductSets } from 'interfaces';

// @ts-ignore
import { getAvailableMealPlansForAccommodation } from 'utils';

// @ts-ignore
import { DatePicker, RadioButton, NumberSelect } from '@pure-escapes/webapp-ui-components';
import connect from './LodgingSummary.state';

import { LodgingSummaryCard } from './LodgingSummary.styles';

export const LodgingSummaryRender = props => {
  const lodging: LodgingSummary = props.lodging;
  const availableProductSets: BookingBuilderAvailableProductSets = props.availableProductSets;
  const updateRequestedBuildLodgingGuestAges: Function = props.updateRequestedBuildLodgingGuestAges;
  const updateRequestedBuildLodgingDates: Function = props.updateRequestedBuildLodgingDates;
  const updateRequestedBuildLodgingMealPlan: Function = props.updateRequestedBuildLodgingMealPlan;
  const currencyCode: string = props.currencyCode;

  const OccupancyEditor = ({ onUpdate }: { onUpdate: Function }) => {
    const [numberOfAdults, setNumberOfAdults] = useState(lodging.guestAges.numberOfAdults);
    const [agesOfAllChildren, setAgesOfAllChildren] = useState(lodging.guestAges.agesOfAllChildren || []);
    const [newChildAge, setNewChildAge] = useState('');

    const decrementNumberOfAdults = () => {
      if (numberOfAdults <= 0) {
        return;
      }
      setNumberOfAdults(numberOfAdults - 1);
    };

    const incrementNumberOfAdults = () => {
      setNumberOfAdults(numberOfAdults + 1);
    };

    const addNewChildAge = () => {
      agesOfAllChildren.push(parseInt(newChildAge));
      setAgesOfAllChildren(agesOfAllChildren);
      setNewChildAge('');
    };

    const update = () => {
      const newGuestAges = {
        numberOfAdults,
        agesOfAllChildren,
      };
      updateRequestedBuildLodgingGuestAges(lodging.hotelUuid, lodging.index, newGuestAges);
      onUpdate(true);
    };

    return (
      <div>
        <div>
          <label>Number of Adults</label>
          <br />
          <NumberSelect
            style={{ float: 'left' }}
            className="numberSelect"
            min={0}
            max={99}
            value={numberOfAdults}
            onAdd={incrementNumberOfAdults}
            onRemove={decrementNumberOfAdults}
          />
        </div>

        <div style={{ clear: 'both' }}>
          <label>Ages of all children</label>
          <br />
          {agesOfAllChildren.map(age => (
            <p>{age}</p>
          ))}
          <input type="number" min="1" max="18" value={newChildAge} onChange={e => setNewChildAge(e.target.value)} />
          <button onClick={addNewChildAge}>add child</button>
        </div>
        <div>
          <button onClick={update}>Update</button>
        </div>
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

  const DateCollapsible = ({  }: {}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const CollapseToggle = () => (
      <button style={{ float: 'right' }} onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? '+' : '-'}
      </button>
    );

    return (
      <React.Fragment>
        <p>
          {lodging.nightsBreakdown} <CollapseToggle />
        </p>

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

  const OccupancyCollapsible = ({  }: {}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const CollapseToggle = () => (
      <button style={{ float: 'right' }} onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? '+' : '-'}
      </button>
    );

    return (
      <React.Fragment>
        <p>
          {lodging.occupancyBreakdown} <CollapseToggle />
        </p>

        {!isCollapsed && <OccupancyEditor onUpdate={val => setIsCollapsed(val)} />}
      </React.Fragment>
    );
  };

  const MealPlanCollapsible = ({  }: {}) => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const CollapseToggle = () => (
      <button style={{ float: 'right' }} onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? '+' : '-'}
      </button>
    );

    return (
      <React.Fragment>
        <p>
          {lodging.mealPlanBreakdown || 'Meal Plan Selection'} <CollapseToggle />
        </p>

        {!isCollapsed && <MealPlanEditor onUpdate={val => setIsCollapsed(val)} />}
      </React.Fragment>
    );
  };

  return (
    <LodgingSummaryCard className="lodging-summary">
      <p>{lodging.title}</p>
      <label>Dates</label>
      <DateCollapsible />
      <label>Occupancy</label>
      <OccupancyCollapsible />
      <label>Meal Plan</label>
      <MealPlanCollapsible />
    </LodgingSummaryCard>
  );
};

// @ts-ignore
export default compose(connect)(LodgingSummaryRender);
