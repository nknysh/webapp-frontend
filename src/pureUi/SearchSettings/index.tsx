import React, { memo } from 'react';
import { SearchOptions, MealPlanNames, Filters, StarRating, SearchQuery, Occasion } from 'services/BackendApi';
import { List } from 'pureUi/List/index';

export interface SearchSettingsProps extends React.HTMLAttributes<HTMLDivElement> {
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
  onSubmit: () => void;
}

// NOTE: This has been cobbled together quickly just to get it usable for basic testing.
// I'll be breaking component up and removing the duplication soon.

export const SearchSettings = (props: SearchSettingsProps) => {
  const handleFilterChange = (filter: Filters) => () => props.onFilterChange(filter);

  const handleStarRatingChange = (starRating: StarRating) => (e: React.FormEvent<HTMLInputElement>) =>
    props.onStarRatingChange(starRating, e.currentTarget.checked);

  const handleOccasionChange = (occasion: Occasion) => (e: React.FormEvent<HTMLInputElement>) =>
    props.onOccasionChange(occasion, e.currentTarget.checked);

  const handleMealPlanChange = (mealPlan: MealPlanNames) => (e: React.FormEvent<HTMLInputElement>) =>
    props.onMealPlanChange(mealPlan, e.currentTarget.checked);

  const handleRegionChange = (region: string) => (e: React.FormEvent<HTMLInputElement>) =>
    props.onRegionChange(region, e.currentTarget.checked);

  return (
    <div className={props.className}>
      <button disabled={props.canSubmit} onClick={props.onSubmit}>
        Search
      </button>

      <section>
        <h3>Regions</h3>
        <ul>
          <li>
            <label>
              <input
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
              <input
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
                    <input name="regions" type="checkbox" checked={isSelected} onChange={handleRegionChange(region)} />{' '}
                    {region}
                  </label>
                </li>
              );
            }}
          />
        )}
      </section>

      <section>
        <h3>Meal Plan</h3>
        <List
          items={Object.keys(MealPlanNames).map(k => MealPlanNames[k])}
          render={(mealPlan: MealPlanNames) => {
            const isSelected = props.query.mealPlanCategories.includes(mealPlan);
            return (
              <li key={mealPlan}>
                <label>
                  <input name="mealPlans" type="radio" checked={isSelected} onChange={handleMealPlanChange(mealPlan)} />{' '}
                  {mealPlan}
                </label>
              </li>
            );
          }}
        />
      </section>

      <section>
        <h3>Occasions</h3>
        <List
          items={Object.keys(Occasion).map(k => Occasion[k])}
          render={(occasion: Occasion) => {
            const isSelected = props.query.lodgings[0][occasion];
            return (
              <li key={occasion}>
                <label>
                  <input type="checkbox" checked={isSelected} onChange={handleOccasionChange(occasion)} /> {occasion}
                </label>
              </li>
            );
          }}
        />
      </section>

      <section>
        <h3>Star Rating</h3>
        <List
          items={props.options.starRatings}
          render={(starRating: StarRating) => {
            const isSelected = props.query.starRatings.includes(starRating);
            return (
              <li key={starRating}>
                <label>
                  <input type="checkbox" checked={isSelected} onChange={handleStarRatingChange(starRating)} />{' '}
                  {starRating}
                </label>
              </li>
            );
          }}
        />
      </section>

      <section>
        <h3>Filters</h3>
        <List
          items={props.options.filters}
          render={(filter: Filters) => {
            const isSelected = props.query.filters.includes(filter);
            return (
              <li key={filter}>
                <label>
                  {' '}
                  <input type="checkbox" checked={isSelected} onChange={handleFilterChange(filter)} /> {filter}
                </label>
              </li>
            );
          }}
        />
        <button onClick={props.onRemoveAllFilters} disabled={!props.query.filters.length}>
          Remove all filters
        </button>
      </section>
      <button disabled={props.canSubmit} onClick={props.onSubmit}>
        Search
      </button>
    </div>
  );
};
