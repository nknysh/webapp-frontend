import React, { Fragment } from 'react';
import { __, set, view, path, prop, propOr, lensPath, pipe, equals, map, merge, head, last, values } from 'ramda';
import { isNaN, isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import { ToolTip } from 'components/elements';

import config from 'config';
import { MealPlanSelectTypes, RegionSelectTypes } from 'config/enums';

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

const defaultPriceRange = path(['defaults', 'priceRange'], config);

const mapMealPlan = value => ({ label: value, value });
const mapMealPlans = map(mapMealPlan);
const mealPlanOptions = values(mapMealPlans(MealPlanSelectTypes));

// eslint-disable-next-line
const renderMealPlanTip = t => value => (
  <MealTypeTip key={value}>
    <MealTypeKey>{value}</MealTypeKey>
    {t(`mealTypes.${value}`)}
  </MealTypeTip>
);

export const SearchFilters = ({ onChange, onReset, searchQuery, starRatings, regions, features, prices }) => {
  const { t } = useTranslation();

  const updateSearchQuery = set(__, __, searchQuery);
  const getSearchQueryData = view(__, searchQuery);

  const priceStart = isNaN(Number(head(prices))) ? head(defaultPriceRange) : Number(head(prices));
  const priceEnd = isNaN(Number(head(prices))) ? last(defaultPriceRange) : Number(last(prices));

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
        label={`${rating} ${t('star')}`}
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
      <Title>{t('region')}</Title>
      <SectionField>
        <RegionRadioButton
          name="regions[type]"
          value={getSearchQueryData(filtersRegionTypeLens) || RegionSelectTypes.ALL}
          onChange={setRegionsTypeToSearchQuery}
          options={[
            {
              label: t('labels.allRegions'),
              value: RegionSelectTypes.ALL,
            },
            {
              label: t('labels.specifyRegions'),
              value: RegionSelectTypes.SPECIFY,
            },
          ]}
        />
        {equals(RegionSelectTypes.SPECIFY, getSearchQueryData(filtersRegionTypeLens)) &&
          map(renderRegionCheckbox, regions)}
      </SectionField>

      <Title>{t('priceRange')}</Title>
      <SectionField>
        <p>{t('taglines.pricesIn')}</p>
        <PriceRangeLabels>
          <PriceRangeLabel>
            {t('labels.from')} <PriceRangeLabelPrice>{priceStart}</PriceRangeLabelPrice>
          </PriceRangeLabel>
          <PriceRangeLabel data-align="right">
            {t('labels.to')} <PriceRangeLabelPrice>{priceEnd}</PriceRangeLabelPrice>
          </PriceRangeLabel>
        </PriceRangeLabels>
        <PriceRange
          value={getSearchQueryData(filtersPricesLens) || defaultPriceRange}
          onAfterChange={setPriceRangeToSearchQuery}
          min={priceStart}
          max={priceEnd}
        />
      </SectionField>

      {!isNilOrEmpty(starRatings) && (
        <Fragment>
          <Title>{t('starRating')}</Title>
          <SectionField data-flex={true}>{map(renderStarRatingsCheckbox, starRatings)}</SectionField>
        </Fragment>
      )}

      <Title>
        {t('mealPlan')}
        <ToolTip>{values(map(renderMealPlanTip(t), MealPlanSelectTypes))}</ToolTip>
      </Title>
      <SectionField>
        <MealPlanRadioButton
          name="mealPlan"
          value={getSearchQueryData(filtersMealPlanLens) || ''}
          onChange={setMealPlanToSearchQuery}
          options={[{ label: 'Any', value: '' }, ...mealPlanOptions]}
        />
      </SectionField>

      {!isNilOrEmpty(features) && (
        <Fragment>
          <Title>{t('feature_plural')}</Title>
          <SectionField>{map(renderFeaturesCheckbox, features)}</SectionField>
        </Fragment>
      )}

      <SectionField>
        <SideBarButton onClick={() => onReset()}>{t('buttons.removeFilters')}</SideBarButton>
      </SectionField>
    </Fragment>
  );
};

SearchFilters.propTypes = propTypes;
SearchFilters.defaultProps = defaultProps;

export default SearchFilters;
