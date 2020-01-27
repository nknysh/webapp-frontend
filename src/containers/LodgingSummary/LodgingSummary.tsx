import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { differenceInCalendarDays } from 'date-fns';
import { DatePickerStateProvider, IDatePickerSateParams } from 'pureUi/providers/DatePickerStateProvider';
import DateRangeInput from 'pureUi/DateRangeInput';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';

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

import { AvailableProductSets } from 'services/BackendApi/types';

// @ts-ignore
import { LodgingSummary } from 'interfaces';

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
import { RadioButton, NumberSelect } from '@pure-escapes/webapp-ui-components';

import {
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
import { DateHelper } from 'pureUi/DatePicker';

import { TableCardBox, TableCardRow } from 'pureUi/TableCard';

export const LodgingSummaryRender = props => {
  const lodging: LodgingSummary = props.lodging;
  const availableProductSets: AvailableProductSets = props.availableProductSets;

  const textOnlyOffersPerLodging: any = props.textOnlyOffersPerLodging;
  const updateLodgingGuestAgesAction: Function = props.updateLodgingGuestAgesAction;
  const updateLodgingMealPlanAction: Function = props.updateLodgingMealPlanAction;
  const updateLodgingDatesAction: Function = props.updateLodgingDatesAction;
  const removeLodgingAction: Function = props.removeLodgingAction;
  const updateLodgingOccasionsAction: Function = props.updateLodgingOccasionsAction;
  const currencyCode: string = props.currencyCode;

  const appliedSupplements = getAppliedSupplementsForLodging(lodging, availableProductSets, currencyCode);
  const lodgingTotals = getLodgingTotals(lodging, availableProductSets);
  const appliedOffers = getAppliedOffersForLodging(lodging, availableProductSets, textOnlyOffersPerLodging);

  const { t } = useTranslation();
  /**
   * handles opening/closing collapsables. makes use of editGuard and onEditGuard
   */
  const CollapseToggle = ({ isCollapsed, onClick }: { isCollapsed: boolean; onClick: Function }) => {
    return (
      <CollapseButton
        onClick={() => {
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
      updateLodgingGuestAgesAction(lodging.hotelUuid, lodging.index, newGuestAges);
      onUpdate(true);
    };

    return (
      <div className="mt-4">
        <div className="lodging-summary__occupancy-editor__number-of-adults">
          <div className="number-select-wrapper">
            <label>{t('labels.numberOfAdults')}</label>
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
          <div className="number-select-wrapper">
            <label>{t('labels.numberOfChildren')}</label>
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
            {agesOfAllChildren.map((ageOfChild, index) => {
              return (
                <div key={`child-age-selector-${index}`} className="child-age-selector">
                  <label>Child {index + 1}</label>
                  <ChildAgeSelect
                    options={possibleChildAges}
                    value={ageOfChild}
                    onChange={e => updateAgeOfChild(index, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
        )}

        <div className="flex flex-row-reverse mt-4">
          <ButtonSmall onClick={handleUpdate}>{t('labels.updateOccupancy')}</ButtonSmall>
        </div>
      </div>
    );
  };

  const MealPlanEditor = ({ onUpdate }: { onUpdate: Function }) => {
    const availableMealPlans = getAvailableMealPlansForAccommodation(lodging, availableProductSets, currencyCode);
    const selectedMealPlanSetUuid = lodging.subProducts['Meal Plan'].map(m => m.uuid).join('/');

    const handleMealPlanSetSelection = (event, mealPlanSetUuid) => {
      const mealPlanUuids = mealPlanSetUuid.split('/');
      updateLodgingMealPlanAction(lodging.hotelUuid, lodging.index, mealPlanUuids);
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
      <div className="mt-4">
        <RadioButton
          onChange={handleMealPlanSetSelection}
          value={selectedMealPlanSetUuid}
          options={availableMealPlans}
        />
      </div>
    );
  };

  const DateCollapsible = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    const handleDateChange = (dates: [string]) => {
      const from = new Date(dates[0]);
      const to = new Date(dates[dates.length - 1]);
      updateLodgingDatesAction(lodging.hotelUuid, lodging.index, from, to);
    };

    // Why +2? Because the difference in non inclusive of the last date, and the end date is a day short
    const length = differenceInCalendarDays(new Date(lodging.endDate), new Date(lodging.startDate)) + 2;
    const firstTimeStamp = new Date(lodging.startDate).getTime();
    const selectedDates = DateHelper.generateDatesFrom(firstTimeStamp, length, 'en-US').map(
      dateObject => dateObject.dateString
    );

    return (
      <React.Fragment>
        <CollapseHeader className={!isCollapsed ? 'color-teal' : ''}>
          {lodging.nightsBreakdown}
          <CollapseToggle isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </CollapseHeader>

        {!isCollapsed && (
          <div className="mt-4">
            <label>{t('labels.datePicker')}</label>
            <DatePickerStateProvider
              defaultSelectedDates={selectedDates}
              onDateChange={handleDateChange}
              render={(params: IDatePickerSateParams) => (
                <DateRangeInput
                  datePickerLeft
                  className="lodgingDateRangeInput"
                  displayString={params.displayString}
                  currentDate={params.datePickerCurrentDate}
                  totalNights={params.totalNights}
                  selectedDates={params.selectedDates}
                  onDayClick={params.handleDayClick}
                  onDayMouseOver={params.handleDateMouseOver}
                  showDatePicker={params.showDatePicker}
                  onNextClick={params.incrementDate}
                  onPrevClick={params.decrementDate}
                  onMouseDown={params.toggleDatePicker}
                  onClickOutside={params.hideDatePicker}
                />
              )}
            />
          </div>
        )}
      </React.Fragment>
    );
  };

  const OccupancyCollapsible = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);

    return (
      <CollapsibleSection>
        <CollapseHeader className={!isCollapsed ? 'color-teal' : ''}>
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
        <CollapseHeader className={!isCollapsed ? 'color-teal' : ''}>
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
        <CollapseHeader className={!isCollapsed ? 'color-teal' : ''}>
          Occasion(s): {lodging.occasionsBreakdown || 'None'}
          <CollapseToggle isCollapsed={isCollapsed} onClick={() => setIsCollapsed(!isCollapsed)} />
        </CollapseHeader>

        {!isCollapsed && (
          <div className="mt-4">
            <OccasionsSelect
              onChange={e => {
                updateLodgingOccasionsAction(lodging.hotelUuid, lodging.index, e.occasions);
              }}
              occasions={undefined} // need to specify undefined because OccassionsSelect is setup badly
              selected={lodging}
            />
          </div>
        )}
      </CollapsibleSection>
    );
  };

  const PriceBreakdown = ({ total, totalBeforeDiscount, isOnRequest }) => {
    if (isOnRequest) {
      return <label>{t('labels.priceAvailableOnRequest')}</label>;
    }

    if (total !== totalBeforeDiscount) {
      return (
        <React.Fragment>
          <LodgingTotal data-discounted={true}>
            {currencyCode}
            {formatPrice(total)}
          </LodgingTotal>
          <LodgingTotal data-secondary={true}>
            {currencyCode}
            {formatPrice(totalBeforeDiscount)}
          </LodgingTotal>
        </React.Fragment>
      );
    } else {
      return (
        <LodgingTotal>
          {currencyCode}
          {formatPrice(total)}
        </LodgingTotal>
      );
    }
  };

  // if lodgingTotals.total is 0, the lodging is still being added, so we need to render
  // a loading component
  if (lodgingTotals.total === '0') {
    return (
      <TableCardBox className="lodging-summary">
        <label>
          <strong>{t('messages.addingLodging')}</strong>
        </label>
      </TableCardBox>
    );
  }

  return (
    <div className={props.className}>
      <TableCardBox className="table-card-box lodging-summary">
        <TableCardRow className="table-card-row" depth={2}>
          <LodgingSummaryTitle>
            <strong>{lodging.title}</strong>
            <LodgingTotalWrapper>
              <PriceBreakdown
                total={lodgingTotals.total}
                totalBeforeDiscount={lodgingTotals.totalBeforeDiscount}
                isOnRequest={lodgingTotals.isOnRequest}
              />
            </LodgingTotalWrapper>
          </LodgingSummaryTitle>
        </TableCardRow>

        <TableCardRow className="table-card-row" depth={3}>
          <DateCollapsible />
        </TableCardRow>

        <TableCardRow className="table-card-row" depth={3}>
          <OccupancyCollapsible />
        </TableCardRow>

        <TableCardRow className="table-card-row" depth={3}>
          <MealPlanCollapsible />
        </TableCardRow>

        <TableCardRow className="table-card-row" depth={3}>
          <OccasionsCollapsible />
        </TableCardRow>

        {appliedSupplements && appliedSupplements.length >= 1 && (
          <TableCardRow className="table-card-row " depth={3}>
            <CollapsibleSection>
              <CollapseHeader>
                <label>{t('labels.appliedSupplements')}</label>
                {appliedSupplements.map(s => (
                  <Text>{s}</Text>
                ))}
              </CollapseHeader>
            </CollapsibleSection>
          </TableCardRow>
        )}

        {appliedOffers && appliedOffers.length >= 1 && (
          <TableCardRow className="table-card-row " depth={3}>
            <CollapsibleSection>
              <CollapseHeader>
                <label>{t('labels.appliedOffers')}</label>
                {appliedOffers.map(s => (
                  <Text data-discounted="true">{s}</Text>
                ))}
              </CollapseHeader>
            </CollapsibleSection>
          </TableCardRow>
        )}

        <TableCardRow depth={3} className="table-card-row pb-4 flex flex-row-reverse">
          <ButtonSmall
            onClick={() => {
              removeLodgingAction(lodging.hotelUuid, lodging.index);
            }}
          >
            {t('labels.removeLodging')}
          </ButtonSmall>
        </TableCardRow>
      </TableCardBox>
    </div>
  );
};

// @ts-ignore
const ConnectedLodgingSummary = compose(connect)(LodgingSummaryRender);

export default styled(ConnectedLodgingSummary)`
  .table-card-box .table-card-row + .table-card-row {
    border-bottom: 1px solid ${pureUiTheme.colors.grayDark};
  }

  .number-select-wrapper {
    display: flex;
    & > label {
      flex: 1;
    }

    span.material-icons:hover {
      background: ${pureUiTheme.colors.teal};
    }
  }

  .child-age-selector {
    display: flex;

    & > label {
      flex: 1;
    }
  }
`;
