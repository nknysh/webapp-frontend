import React, { Fragment, useCallback, useMemo, useEffect, useState } from 'react';
import { __, set, view, path, prop, partial, propOr, lensPath, pipe, equals, map, merge, values } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { ToolTip, FormField } from '@pure-escapes/webapp-ui-components';

import { MealPlanSelectTypes, RegionSelectTypes } from 'config/enums';

import { propTypes, defaultProps } from './SearchFilters.props';
import {
  MealPlanRadioButton,
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

const mapMealPlan = value => ({ label: value, value });
const mapMealPlans = map(mapMealPlan);
const mealPlanOptions = values(mapMealPlans(MealPlanSelectTypes));

const renderMealPlanTip = (t, value) => (
  <MealTypeTip key={value}>
    <MealTypeKey>{value}</MealTypeKey>
    {t(`mealTypes.${value}`)}
  </MealTypeTip>
);

const renderRegionCheckbox = ({ getSearchQueryData, setRegionsSelectedToSearchQuery }, region) =>
  region && (
    <RegionCheckbox
      key={region}
      name={`regions[selected][${region}]`}
      label={region}
      checked={prop(region, getSearchQueryData(filtersRegionSelectedLens))}
      onChange={(e, checked) => setRegionsSelectedToSearchQuery({ [region]: checked })}
    />
  );

const renderStarRatingsCheckbox = (t, { getSearchQueryData, setStarRatingsToSearchQuery }, rating) =>
  rating && (
    <RatingsCheckbox
      key={rating}
      name={`starRatings[${rating}]`}
      label={`${rating} ${t('star')}`}
      checked={propOr(true, rating, getSearchQueryData(filtersStarRatingsLens))}
      onChange={(e, checked) => setStarRatingsToSearchQuery({ [rating]: checked })}
    />
  );

const renderFeaturesCheckbox = ({ getSearchQueryData, setFeaturesToSearchQuery }, feature) =>
  feature && (
    <FilterCheckbox
      key={feature}
      name={`features[${feature}]`}
      label={feature}
      checked={propOr(false, feature, getSearchQueryData(filtersFeaturesLens))}
      onChange={(e, checked) => setFeaturesToSearchQuery({ [feature]: checked })}
    />
  );

export const SearchFilters = ({ onChange, onReset, searchQuery, starRatings, regions, features }) => {
  const { t } = useTranslation();
  const updateSearchQuery = useCallback(set(__, __, searchQuery), [searchQuery]);
  const getSearchQueryData = useCallback(view(__, searchQuery), [searchQuery]);
  const priceRange = getSearchQueryData(filtersPricesLens) || [];
  const [minPrice, setMinPrice] = useState(priceRange[0] || '');
  const [maxPrice, setMaxPrice] = useState(priceRange[1] || '');
  const [priceRangeError, setPriceRangeError] = useState(null);

  const updatePriceRange = (type, limit, newValue) => prevState => {
    if (newValue === '') {
      return '';
    }
    return isNaN(newValue) ? prevState : parseInt(newValue, 10);
  };

  useEffect(() => {
    if (parseInt(minPrice) >= parseInt(maxPrice)) {
      setPriceRangeError(t('labels.invalidPriceRange'));
    } else {
      setPriceRangeError(null);
    }

    setPriceRangeToSearchQuery([minPrice, maxPrice]);
  }, [minPrice, maxPrice, setPriceRangeError, setPriceRangeToSearchQuery, t]);

  const setRegionsTypeToSearchQuery = useCallback(
    pipe(path(['currentTarget', 'value']), updateSearchQuery(filtersRegionTypeLens), onChange),
    [updateSearchQuery, onChange]
  );

  const setRegionsSelectedToSearchQuery = useCallback(
    pipe(merge(getSearchQueryData(filtersRegionSelectedLens)), updateSearchQuery(filtersRegionSelectedLens), onChange),
    [updateSearchQuery, onChange]
  );

  const setPriceRangeToSearchQuery = useCallback(pipe(updateSearchQuery(filtersPricesLens), onChange), [
    updateSearchQuery,
    onChange,
  ]);

  const setStarRatingsToSearchQuery = useCallback(
    pipe(merge(getSearchQueryData(filtersStarRatingsLens)), updateSearchQuery(filtersStarRatingsLens), onChange),
    [updateSearchQuery, onChange]
  );

  const setFeaturesToSearchQuery = useCallback(
    pipe(merge(getSearchQueryData(filtersFeaturesLens)), updateSearchQuery(filtersFeaturesLens), onChange),
    [updateSearchQuery, onChange]
  );

  const setMealPlanToSearchQuery = useCallback(
    pipe(path(['currentTarget', 'value']), updateSearchQuery(filtersMealPlanLens), onChange),
    [updateSearchQuery, onChange]
  );

  const regionRadios = useMemo(
    () => [
      {
        label: t('labels.allRegions'),
        value: RegionSelectTypes.ALL,
      },
      {
        label: t('labels.specifyRegions'),
        value: RegionSelectTypes.SPECIFY,
      },
    ],
    [t]
  );

  const mealPlanRadios = useMemo(() => [{ label: 'Any', value: '' }, ...mealPlanOptions], []);

  const handleReset = useCallback(() => onReset(), [onReset]);

  return (
    <Fragment>
      <Title>{t('region')}</Title>
      <SectionField>
        <RegionRadioButton
          name="regions[type]"
          value={getSearchQueryData(filtersRegionTypeLens) || RegionSelectTypes.ALL}
          onChange={setRegionsTypeToSearchQuery}
          options={regionRadios}
        />
        {equals(RegionSelectTypes.SPECIFY, getSearchQueryData(filtersRegionTypeLens)) &&
          map(partial(renderRegionCheckbox, [{ getSearchQueryData, setRegionsSelectedToSearchQuery }]), regions)}
      </SectionField>

      <Title>{t('priceRange')}</Title>
      <SectionField>
        <FormField
          className="minMaxField"
          type="text"
          value={minPrice}
          onChange={e => {
            setMinPrice(updatePriceRange('min', maxPrice, e.target.value));
          }}
          label={t('labels.min')}
        />
        <FormField
          className="minMaxField"
          type="text"
          value={maxPrice}
          error={priceRangeError}
          onChange={e => {
            setMaxPrice(updatePriceRange('max', minPrice, e.target.value));
          }}
          label={t('labels.max')}
        />
      </SectionField>

      {!isNilOrEmpty(starRatings) && (
        <Fragment>
          <Title>{t('starRating')}</Title>
          <SectionField data-flex={true}>
            {map(
              partial(renderStarRatingsCheckbox, [t, { getSearchQueryData, setStarRatingsToSearchQuery }]),
              starRatings
            )}
          </SectionField>
        </Fragment>
      )}
      <Title>
        {t('mealPlan')}
        <ToolTip>{values(map(partial(renderMealPlanTip, [t]), MealPlanSelectTypes))}</ToolTip>
      </Title>
      <SectionField>
        <MealPlanRadioButton
          name="mealPlan"
          value={getSearchQueryData(filtersMealPlanLens) || ''}
          onChange={setMealPlanToSearchQuery}
          options={mealPlanRadios}
        />
      </SectionField>

      {!isNilOrEmpty(features) && (
        <Fragment>
          <Title>{t('feature_plural')}</Title>
          <SectionField>
            {map(partial(renderFeaturesCheckbox, [{ getSearchQueryData, setFeaturesToSearchQuery }]), features)}
          </SectionField>
        </Fragment>
      )}

      <SectionField>
        <SideBarButton onClick={handleReset}>{t('buttons.removeFilters')}</SideBarButton>
      </SectionField>
    </Fragment>
  );
};

SearchFilters.propTypes = propTypes;
SearchFilters.defaultProps = defaultProps;

export default SearchFilters;
