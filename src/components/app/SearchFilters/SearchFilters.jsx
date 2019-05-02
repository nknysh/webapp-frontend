import React, { Fragment } from 'react';
import { __, set, view, path, prop, propOr, lensPath, pipe, equals, map, merge, head, last, values } from 'ramda';

import { ToolTip } from 'components';

import uiConfig, { getSingular, getPlural } from 'config/ui';
import { RegionSelectTypes, MealPlanSelectTypes, isEmptyOrNil } from 'utils';

import { propTypes, defaultProps } from './SearchFilters.props';
import {
  MealPlanRadioButton,
  PriceRange,
  PriceRangeLabel,
  PriceRangeLabelPrice,
  PriceRangeLabels,
  RegionCheckbox,
  RegionRadioButton,
  SectionField,
  SideBarButton,
  Title,
  MealTypeTip,
  MealTypeKey,
  FilterCheckbox,
  RatingsCheckbox,
} from './SearchFilters.styles';

const filtersRegionTypeLens = lensPath(['filters', 'regions', 'type']);
const filtersRegionSelectedLens = lensPath(['filters', 'regions', 'selected']);
const filtersPricesLens = lensPath(['filters', 'prices']);
const filtersStarRatingsLens = lensPath(['filters', 'starRatings']);
const filtersFeaturesLens = lensPath(['filters', 'features']);
const filtersMealPlanLens = lensPath(['filters', 'mealPlan']);

const defaultPriceRange = path(['defaults', 'priceRange'], uiConfig);

const mapMealPlan = value => ({ label: value, value });
const mapMealPlans = map(mapMealPlan);
const mealPlanOptions = values(mapMealPlans(MealPlanSelectTypes));

const renderMealPlanTip = value => (
  <MealTypeTip key={value}>
    <MealTypeKey>{value}</MealTypeKey>
    {path(['mealTypes', value], uiConfig)}
  </MealTypeTip>
);

export const SearchFilters = ({ onChange, onReset, searchQuery, starRatings, regions, features }) => {
  const updateSearchQuery = set(__, __, searchQuery);
  const getSearchQueryData = view(__, searchQuery);

  const setRegionsTypeToSearchQuery = pipe(
    path(['currentTarget', 'value']),
    updateSearchQuery(filtersRegionTypeLens),
    onChange
  );
  const setRegionsSelectedToSearchQuery = pipe(
    merge(getSearchQueryData(filtersRegionSelectedLens)),
    updateSearchQuery(filtersRegionSelectedLens),
    onChange
  );
  const setPriceRangeToSearchQuery = pipe(
    updateSearchQuery(filtersPricesLens),
    onChange
  );
  const setStarRatingsToSearchQuery = pipe(
    merge(getSearchQueryData(filtersStarRatingsLens)),
    updateSearchQuery(filtersStarRatingsLens),
    onChange
  );
  const setFeaturesToSearchQuery = pipe(
    merge(getSearchQueryData(filtersFeaturesLens)),
    updateSearchQuery(filtersFeaturesLens),
    onChange
  );
  const setMealPlanToSearchQuery = pipe(
    path(['currentTarget', 'value']),
    updateSearchQuery(filtersMealPlanLens),
    onChange
  );

  const renderRegionCheckbox = region =>
    region && (
      <RegionCheckbox
        key={region}
        name={`regions[selected][${region}]`}
        label={region}
        checked={prop(region, getSearchQueryData(filtersRegionSelectedLens))}
        onChange={(e, checked) => setRegionsSelectedToSearchQuery({ [region]: checked })}
      />
    );

  const renderStarRatingsCheckbox = rating =>
    rating && (
      <RatingsCheckbox
        key={rating}
        name={`starRatings[${rating}]`}
        label={`${rating} ${getSingular('star')}`}
        checked={propOr(true, rating, getSearchQueryData(filtersStarRatingsLens))}
        onChange={(e, checked) => setStarRatingsToSearchQuery({ [rating]: checked })}
      />
    );

  const renderFeaturesCheckbox = feature =>
    feature && (
      <FilterCheckbox
        key={feature}
        name={`features[${feature}]`}
        label={feature}
        checked={propOr(false, feature, getSearchQueryData(filtersFeaturesLens))}
        onChange={(e, checked) => setFeaturesToSearchQuery({ [feature]: checked })}
      />
    );

  return (
    <Fragment>
      <Title>{getSingular('region')}</Title>
      <SectionField>
        <RegionRadioButton
          name="regions[type]"
          value={getSearchQueryData(filtersRegionTypeLens) || RegionSelectTypes.ALL}
          onChange={setRegionsTypeToSearchQuery}
          options={[
            {
              label: path(['labels', 'allRegions'], uiConfig),
              value: RegionSelectTypes.ALL,
            },
            {
              label: path(['labels', 'specifyRegions'], uiConfig),
              value: RegionSelectTypes.SPECIFY,
            },
          ]}
        />
        {equals(RegionSelectTypes.SPECIFY, getSearchQueryData(filtersRegionTypeLens)) &&
          map(renderRegionCheckbox, regions)}
      </SectionField>

      <Title>{getSingular('priceRange')}</Title>
      <SectionField>
        <p>{path(['taglines', 'pricesIn'], uiConfig)}</p>
        <PriceRangeLabels>
          <PriceRangeLabel>
            {path(['labels', 'from'], uiConfig)} <PriceRangeLabelPrice>{head(defaultPriceRange)}</PriceRangeLabelPrice>
          </PriceRangeLabel>
          <PriceRangeLabel data-align="right">
            {path(['labels', 'to'], uiConfig)} <PriceRangeLabelPrice>{last(defaultPriceRange)}</PriceRangeLabelPrice>
          </PriceRangeLabel>
        </PriceRangeLabels>
        <PriceRange
          value={getSearchQueryData(filtersPricesLens) || defaultPriceRange}
          onAfterChange={setPriceRangeToSearchQuery}
          min={head(defaultPriceRange)}
          max={last(defaultPriceRange)}
        />
      </SectionField>

      {!isEmptyOrNil(starRatings) && (
        <Fragment>
          <Title>{getSingular('starRating')}</Title>
          <SectionField data-flex={true}>{map(renderStarRatingsCheckbox, starRatings)}</SectionField>
        </Fragment>
      )}

      <Title>
        {getSingular('mealPlan')}
        <ToolTip>{values(map(renderMealPlanTip, MealPlanSelectTypes))}</ToolTip>
      </Title>
      <SectionField>
        <MealPlanRadioButton
          name="mealPlan"
          value={getSearchQueryData(filtersMealPlanLens) || MealPlanSelectTypes.BB}
          onChange={setMealPlanToSearchQuery}
          options={mealPlanOptions}
        />
      </SectionField>

      {!isEmptyOrNil(features) && (
        <Fragment>
          <Title>{getPlural('feature')}</Title>
          <SectionField>{map(renderFeaturesCheckbox, features)}</SectionField>
        </Fragment>
      )}

      <SectionField>
        <SideBarButton onClick={() => onReset()}>{path(['buttons', 'removeFilters'], uiConfig)}</SideBarButton>
      </SectionField>
    </Fragment>
  );
};

SearchFilters.propTypes = propTypes;
SearchFilters.defaultProps = defaultProps;

export default SearchFilters;
