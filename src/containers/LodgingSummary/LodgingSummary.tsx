import React, { useState } from 'react';
import { compose } from 'ramda';

import { LodgingSummary, BookingBuilderAvailableProductSets } from 'interfaces';

// @ts-ignore
import { getAvailableMealPlansForAccommodation } from 'utils';

// @ts-ignore
import { DatePicker, RadioButton, NumberSelect } from '@pure-escapes/webapp-ui-components';
import connect from './LodgingSummary.state';

const OccupancyEditor = ({
  lodging,
  updateRequestedBuildLodgingGuestAges,
  onUpdate,
}: {
  lodging: LodgingSummary;
  updateRequestedBuildLodgingGuestAges: Function;
  onUpdate: Function;
}) => {
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

const MealPlanEditor = ({
  lodging,
  availableProductSets,
  updateRequestedBuildLodgingMealPlan,
  onUpdate,
}: {
  lodging: LodgingSummary;
  availableProductSets: BookingBuilderAvailableProductSets;
  updateRequestedBuildLodgingMealPlan: Function;
  onUpdate: Function;
}) => {
  const availableMealPlans = getAvailableMealPlansForAccommodation(lodging, availableProductSets);
  const selectedMealPlanSetUuid = lodging.subProducts['Meal Plan'].map(m => m.uuid).join('/');

  const handleMealPlanSetSelection = (event, mealPlanSetUuid) => {
    const mealPlanUuids = mealPlanSetUuid.split('/');
    updateRequestedBuildLodgingMealPlan(lodging.hotelUuid, lodging.index, mealPlanUuids);
    onUpdate(true);
  };

  return (
    <React.Fragment>
      <RadioButton onChange={handleMealPlanSetSelection} value={selectedMealPlanSetUuid} options={availableMealPlans} />
    </React.Fragment>
  );
};

const DateCollapsible = ({
  lodging,
  updateRequestedBuildLodgingDates,
}: {
  lodging: LodgingSummary;
  updateRequestedBuildLodgingDates: Function;
}) => {
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

const OccupancyCollapsible = ({
  lodging,
  updateRequestedBuildLodgingGuestAges,
}: {
  lodging: LodgingSummary;
  updateRequestedBuildLodgingGuestAges: any;
}) => {
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

      {!isCollapsed && (
        <OccupancyEditor
          lodging={lodging}
          onUpdate={val => setIsCollapsed(val)}
          updateRequestedBuildLodgingGuestAges={updateRequestedBuildLodgingGuestAges}
        />
      )}
    </React.Fragment>
  );
};

const MealPlanCollapsible = ({
  lodging,
  availableProductSets,
  updateRequestedBuildLodgingMealPlan,
}: {
  lodging: LodgingSummary;
  availableProductSets: BookingBuilderAvailableProductSets;
  updateRequestedBuildLodgingMealPlan: Function;
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const CollapseToggle = () => (
    <button style={{ float: 'right' }} onClick={() => setIsCollapsed(!isCollapsed)}>
      {isCollapsed ? '+' : '-'}
    </button>
  );

  return (
    <React.Fragment>
      <p>
        {lodging.mealPlanBreakdown} <CollapseToggle />
      </p>

      {!isCollapsed && (
        <MealPlanEditor
          lodging={lodging}
          availableProductSets={availableProductSets}
          updateRequestedBuildLodgingMealPlan={updateRequestedBuildLodgingMealPlan}
          onUpdate={val => setIsCollapsed(val)}
        />
      )}
    </React.Fragment>
  );
};

export const LodgingSummaryRender = props => {
  const lodging: LodgingSummary = props.lodging;
  const availableProductSets: BookingBuilderAvailableProductSets = props.availableProductSets;
  const updateRequestedBuildLodgingGuestAges: Function = props.updateRequestedBuildLodgingGuestAges;
  const updateRequestedBuildLodgingDates: Function = props.updateRequestedBuildLodgingDates;
  const updateRequestedBuildLodgingMealPlan: Function = props.updateRequestedBuildLodgingMealPlan;

  return (
    <React.Fragment>
      <p>{lodging.title}</p>
      <DateCollapsible lodging={lodging} updateRequestedBuildLodgingDates={updateRequestedBuildLodgingDates} />
      <OccupancyCollapsible
        lodging={lodging}
        updateRequestedBuildLodgingGuestAges={updateRequestedBuildLodgingGuestAges}
      />
      <MealPlanCollapsible
        lodging={lodging}
        availableProductSets={availableProductSets}
        updateRequestedBuildLodgingMealPlan={updateRequestedBuildLodgingMealPlan}
      />
    </React.Fragment>
  );
};

// @ts-ignore
export default compose(connect)(LodgingSummaryRender);
