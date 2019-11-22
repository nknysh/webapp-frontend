import React, { memo, EventHandler, FormEvent } from 'react';
import { SearchOptions, MealPlanNames, Filters, StarRating, SearchQuery, Occasion } from 'services/BackendApi';
import { List } from 'pureUi/List/index';
import RangeInput, { RangeValueType } from 'pureUi/RangeInput';
import Checkbox from 'pureUi/Checkbox';
import RadioButton from 'pureUi/RadioButton';
import SidebarGroup from 'pureUi/SidebarGroup';
import styled from 'styled-components';
import { pureUiTheme } from 'pureUi/pureUiTheme';
import { PrimaryButton } from '../Buttons/index';
export interface SearchSettingsProps extends React.HTMLProps<HTMLDivElement> {
  options: SearchOptions;
  query: SearchQuery;
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
  const handleStarRatingChange = (starRating: StarRating): EventHandler<FormEvent> => (e: React.FormEvent<HTMLInputElement>) =>
    props.onStarRatingChange(starRating, e.currentTarget.checked);

  const handleOccasionChange = (occasion: Occasion): EventHandler<FormEvent> => (e: React.FormEvent<HTMLInputElement>) =>
    props.onOccasionChange(occasion, e.currentTarget.checked);

  const handleMealPlanChange = (mealPlan: MealPlanNames): EventHandler<FormEvent> => (e: React.FormEvent<HTMLInputElement>) =>
    props.onMealPlanChange(mealPlan, e.currentTarget.checked);

  const handleRegionChange = (region: string) => (e: React.FormEvent<HTMLInputElement>) =>
    props.onRegionChange(region, e.currentTarget.checked);


  return (
    <div className={props.className}>
      <SidebarGroup>
        <h4>Occasions</h4>
        <List
          items={Object.keys(Occasion).map(k => Occasion[k])}
          render={(occasion: Occasion) => {
            const isSelected = props.query.lodgings[0][occasion];
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
              const isSelected = props.query.regions.includes(region);
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
        <h4>Meal Plan</h4>
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
            const isSelected = props.query.starRatings.includes(starRating);
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
        <List
          items={props.options.filters}
          render={(filter: Filters) => {
            const isSelected = props.query.filters.includes(filter);
            return (
              <li key={filter}>
                <label>
                  {' '}
                  <Checkbox checked={isSelected} onChange={handleFilterChange(filter)} /> {filter}
                </label>
              </li>
            );
          }}
        />
        <PrimaryButton onClick={props.onRemoveAllFilters} disabled={!props.query.filters.length}>
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
`;

