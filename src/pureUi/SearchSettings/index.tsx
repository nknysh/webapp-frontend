import React, { EventHandler, FormEvent } from 'react';
import { SearchOptions, MealPlanNames, Filters, StarRating, ISearchQuery, Occasion } from 'services/BackendApi';
import { List } from 'pureUi/List/index';
import RangeInput, { RangeValueType } from 'pureUi/RangeInput';
import Checkbox from 'pureUi/Checkbox';
import RadioButton from 'pureUi/RadioButton';
import SidebarGroup from 'pureUi/SidebarGroup';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { PrimaryButton } from '../Buttons/index';
import { isNilOrEmpty } from 'ramda-adjunct';
import Info from 'pureUi/Info';

import { FiltersCategory } from "./FiltersCategory";

export interface SearchSettingsProps extends React.HTMLProps<HTMLDivElement> {
  options: SearchOptions;
  query: ISearchQuery;
  canSubmit: boolean;
  showRegions: boolean;
  onFilterChange: (filter: Filters) => void;
  onStarRatingChange: (rating: StarRating, cheked: boolean) => void;
  onOccasionChange: (occasion: Occasion, cheked: boolean) => void;
  onMealPlanChange: (mealPlan: MealPlanNames, cheked: boolean) => void;
  onRegionChange: (region: string, cheked: boolean) => void;
  onToggleShowRegions: () => void;
  onRemoveAllFilters: () => void;
  onPriceRangeChange: (type: RangeValueType, value: string) => void;
  onSubmit: () => void;
}

export const SearchSettings = (props: SearchSettingsProps) => {
  const handleFilterChange = (filter: Filters) => () => props.onFilterChange(filter);

  // TODO: These 'EventHandler<FormEvent>' return types shouldn't be necessary. Needs investigation.
  const handleStarRatingChange = (starRating: StarRating): EventHandler<FormEvent> => (
    e: React.FormEvent<HTMLInputElement>
  ) => props.onStarRatingChange(starRating, e.currentTarget.checked);

  const handleOccasionChange = (occasion: Occasion): EventHandler<FormEvent> => (
    e: React.FormEvent<HTMLInputElement>
  ) => props.onOccasionChange(occasion, e.currentTarget.checked);

  const handleMealPlanChange = (mealPlan: MealPlanNames): EventHandler<FormEvent> => (
    e: React.FormEvent<HTMLInputElement>
  ) => props.onMealPlanChange(mealPlan, e.currentTarget.checked);

  const handleRegionChange = (region: string) => (e: React.FormEvent<HTMLInputElement>) =>
    props.onRegionChange(region, e.currentTarget.checked);

  const removeAllFiltersDisabled =
    isNilOrEmpty(props.query.priceRange.min) && isNilOrEmpty(props.query.priceRange.max) && !props.query.filters.length;

  return (
    <div className={props.className}>
      <SidebarGroup>
        <h4>Occasions</h4>
        <List
          items={Object.keys(Occasion).map(k => Occasion[k])}
          render={(occasion: Occasion) => {
            const isSelected = Boolean(props.query.lodgings[0][occasion]);
            return (
              <li key={occasion}>
                <label>
                  <Checkbox checked={isSelected} onChange={handleOccasionChange(occasion)} /> {occasion}
                </label>
              </li>
            );
          }}
        />
      </SidebarGroup>

      <SidebarGroup>
        <section>
          <h4>Regions</h4>
          <ul>
            <li>
              <label>
                <RadioButton
                  name="chooseRegions"
                  type="radio"
                  checked={!props.showRegions}
                  onChange={props.onToggleShowRegions}
                />{' '}
                All Regions
              </label>
            </li>
            <li>
              <label>
                <RadioButton
                  name="chooseRegions"
                  type="radio"
                  checked={props.showRegions}
                  onChange={props.onToggleShowRegions}
                />{' '}
                Specify Regions
              </label>
            </li>
          </ul>
          {props.showRegions && (
            <List
              items={props.options.regions}
              render={(region: string) => {
                const isSelected = Boolean(props.query.regions.includes(region));
                return (
                  <li key={region}>
                    <label>
                      <Checkbox name="regions" checked={isSelected} onChange={handleRegionChange(region)} /> {region}
                    </label>
                  </li>
                );
              }}
            />
          )}
        </section>

        <section>
          <h4>Price Range</h4>
          <RangeInput
            min={props.query.priceRange.min?.toString() || ''}
            max={props.query.priceRange.max?.toString() || ''}
            onChange={props.onPriceRangeChange}
          />
        </section>

        <section>
          <h4>
            Meal Plan
            <Info className="mealplanInfo">
              <ul className="mealplanTooltip">
                <li>
                  <span>BB</span> Breakfast Included
                </li>
                <li>
                  <span>HB</span> Breakfast &amp; Dinner (Drinks excluded)
                </li>
                <li>
                  <span>FB</span> 3 Meals a day (Drinks Excluded)
                </li>
                <li>
                  <span>AI</span> All Inclusive
                </li>
              </ul>
            </Info>
          </h4>
          <List
            className="fiveColumn"
            items={Object.keys(MealPlanNames).map(k => MealPlanNames[k])}
            render={(mealPlan: MealPlanNames) => {
              const isSelected = props.query.mealPlanCategories.includes(mealPlan);
              return (
                <li key={mealPlan}>
                  <label>
                    <RadioButton
                      name="mealPlans"
                      type="radio"
                      checked={isSelected}
                      onChange={handleMealPlanChange(mealPlan)}
                    />{' '}
                    {mealPlan}
                  </label>
                </li>
              );
            }}
          />
        </section>

        <section>
          <h4>Star Rating</h4>
          <List
            className="twoColumn"
            items={props.options.starRatings}
            render={(starRating: StarRating) => {
              const isSelected = Boolean(props.query.starRatings.includes(starRating));
              return (
                <li key={starRating}>
                  <label>
                    <Checkbox checked={isSelected} onChange={handleStarRatingChange(starRating)} /> {starRating} Star
                  </label>
                </li>
              );
            }}
          />
        </section>

        <section>
          <h4>Filters</h4>
          {props.options.filtersCategories.map(category => (
            <FiltersCategory
              filtersCategory={category}
              selectedFilters={props.query.filters}
              handleFilterChange={handleFilterChange}
            />)
          )}
          <PrimaryButton
            className="removeAllFilters"
            onClick={props.onRemoveAllFilters}
            disabled={removeAllFiltersDisabled}
          >
            Remove all filters
          </PrimaryButton>
        </section>
      </SidebarGroup>
    </div>
  );
};

export default styled(SearchSettings)`
  text-transform: uppercase;
  font-family: 'HurmeGeometricSans2';
  font-size: 12px;
  color: ${pureUiTheme.colorRoles.grayLabel};

  h4 {
    font-weight: bold;
    padding-bottom: 15px;
    border-bottom: ${pureUiTheme.colorRoles.lightGreyBorder} 1px solid;
  }

  label {
    user-select: none;
  }

  section {
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    margin-bottom: 17px;
  }

  .twoColumn {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    li {
      display: inline;
    }
  }

  .fiveColumn {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    li {
      display: inline;
    }
  }

  .mealplanInfo {
    position: relative;
    top: 3px;
    margin-left: 5px;
    font-size: 15px;
    color: ${pureUiTheme.colors.gold};
  }

  .mealplanTooltip {
    margin: 20px;

    li {
      display: flex;
      flex-direction: row;
    }

    li > span {
      font-weight: bold;
      color: ${pureUiTheme.colors.gold};
      min-width: 30px;
    }
  }

  .removeAllFilters {
    width: 100%;
  }
`;
