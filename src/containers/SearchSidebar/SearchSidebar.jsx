import React, { useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import {
  __,
  set,
  view,
  path,
  prop,
  propOr,
  compose,
  lensProp,
  lensPath,
  pipe,
  equals,
  map,
  merge,
  head,
  tail,
  values,
} from 'ramda';

import { IndexSearch, Loader, DatePicker, LodgingSelect, Checkbox, ToolTip } from 'components';
import { useFetchData } from 'effects';
import { buildQueryString, RegionSelectTypes, IndexTypes, MealPlanSelectTypes } from 'utils';

import uiConfig, { getSingular, getPlural } from 'config/ui';

import connect from './SearchSidebar.state';
import { propTypes, defaultProps } from './SearchSidebar.props';
import {
  MealPlanRadioButton,
  PriceRange,
  PriceRangeLabel,
  PriceRangeLabelPrice,
  PriceRangeLabels,
  RegionCheckbox,
  RegionRadioButton,
  Section,
  SectionField,
  SideBarButton,
  Title,
  MealTypeTip,
  MealTypeKey,
} from './SearchSidebar.styles';

const indexes = ['countries', 'hotels'];

const searchLens = lensProp('search');
const datesLens = lensProp('dates');
const lodgingLens = lensProp('lodging');
const honeymoonersLens = lensProp('honeymooners');
const filtersRegionTypeLens = lensPath(['filters', 'regions', 'type']);
const filtersRegionSelectedLens = lensPath(['filters', 'regions', 'selected']);
const filtersPricesLens = lensPath(['filters', 'prices']);
const filtersStarRatingsLens = lensPath(['filters', 'starRatings']);
const filtersAmenitiesLens = lensPath(['filters', 'amenities']);
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

export const SearchSidebar = ({
  countries,
  fetchHotels,
  getCountryName,
  getHotelName,
  hotels,
  searchQuery,
  setSearchQuery,
  resetFilters,
  history,
  regions,
  starRatings,
  amenities,
}) => {
  useFetchData(fetchHotels, hotels);

  useEffect(() => {
    history.push(`/search?${buildQueryString(searchQuery)}`);
  }, [searchQuery]);

  const updateSearchQuery = set(__, __, searchQuery);
  const getSearchQueryData = view(__, searchQuery);

  const setSelectedDatesToSearchQuery = pipe(
    updateSearchQuery(datesLens),
    setSearchQuery
  );
  const setLodgingsToSearchQuery = pipe(
    updateSearchQuery(lodgingLens),
    setSearchQuery
  );
  const setHoneymoonersToSearchQuery = pipe(
    updateSearchQuery(honeymoonersLens),
    setSearchQuery
  );
  const setRegionsTypeToSearchQuery = pipe(
    path(['currentTarget', 'value']),
    updateSearchQuery(filtersRegionTypeLens),
    setSearchQuery
  );
  const setRegionsSelectedToSearchQuery = pipe(
    merge(getSearchQueryData(filtersRegionSelectedLens)),
    updateSearchQuery(filtersRegionSelectedLens),
    setSearchQuery
  );
  const setPriceRangeToSearchQuery = pipe(
    updateSearchQuery(filtersPricesLens),
    setSearchQuery
  );
  const setStarRatingsToSearchQuery = pipe(
    merge(getSearchQueryData(filtersStarRatingsLens)),
    updateSearchQuery(filtersStarRatingsLens),
    setSearchQuery
  );
  const setAmenitiesToSearchQuery = pipe(
    merge(getSearchQueryData(filtersAmenitiesLens)),
    updateSearchQuery(filtersAmenitiesLens),
    setSearchQuery
  );
  const setMealPlanToSearchQuery = pipe(
    path(['currentTarget', 'value']),
    updateSearchQuery(filtersMealPlanLens),
    setSearchQuery
  );

  const onIndexSearchClick = pipe(
    updateSearchQuery(searchLens),
    setSearchQuery
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
      <Checkbox
        key={rating}
        name={`starRatings[${rating}]`}
        label={`${rating} ${getSingular('star')}`}
        checked={propOr(true, rating, getSearchQueryData(filtersStarRatingsLens))}
        onChange={(e, checked) => setStarRatingsToSearchQuery({ [rating]: checked })}
      />
    );

  const renderAmenitiesCheckbox = amenity =>
    amenity && (
      <Checkbox
        key={amenity}
        name={`amenities[${amenity}]`}
        label={amenity}
        checked={propOr(false, amenity, getSearchQueryData(filtersAmenitiesLens))}
        onChange={(e, checked) => setAmenitiesToSearchQuery({ [amenity]: checked })}
      />
    );

  return (
    <Loader isLoading={!hotels || !countries}>
      <Section>
        <Title>{path(['labels', 'searching'], uiConfig)}</Title>
        <SectionField>
          <IndexSearch
            indexes={indexes}
            label={path(['labels', 'search'], uiConfig)}
            limit={5}
            openOnFocus={false}
            placeholder={path(['placeholders', 'search'], uiConfig)}
            selectors={[getCountryName, getHotelName]}
            value={prop('value', getSearchQueryData(searchLens))}
            onClick={onIndexSearchClick}
          />
        </SectionField>
        <SectionField>
          <DatePicker
            label={path(['labels', 'dates'], uiConfig)}
            onSelected={setSelectedDatesToSearchQuery}
            selectedValues={getSearchQueryData(datesLens)}
          />
        </SectionField>
        <SectionField>
          <LodgingSelect
            id="lodging"
            label={path(['labels', 'lodging'], uiConfig)}
            onSelected={setLodgingsToSearchQuery}
            selectedValues={getSearchQueryData(lodgingLens)}
          />
        </SectionField>
        <SectionField>
          <Checkbox
            label={path(['labels', 'honeymooners'], uiConfig)}
            onChange={(e, checked) => setHoneymoonersToSearchQuery(checked)}
            checked={getSearchQueryData(honeymoonersLens)}
          />
        </SectionField>
      </Section>

      <Section>
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
              {path(['labels', 'from'], uiConfig)}{' '}
              <PriceRangeLabelPrice>{head(defaultPriceRange)}</PriceRangeLabelPrice>
            </PriceRangeLabel>
            <PriceRangeLabel data-align="right">
              {path(['labels', 'to'], uiConfig)}{' '}
              <PriceRangeLabelPrice>{head(tail(defaultPriceRange))}</PriceRangeLabelPrice>
            </PriceRangeLabel>
          </PriceRangeLabels>
          <PriceRange
            value={getSearchQueryData(filtersPricesLens) || defaultPriceRange}
            onAfterChange={setPriceRangeToSearchQuery}
            min={head(defaultPriceRange)}
            max={head(tail(defaultPriceRange))}
          />
        </SectionField>

        {starRatings && (
          <Fragment>
            <Title>{getSingular('starRating')}</Title>
            <SectionField>{map(renderStarRatingsCheckbox, starRatings)}</SectionField>
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

        {amenities && (
          <Fragment>
            <Title>{getPlural('amenity')}</Title>
            <SectionField>{map(renderAmenitiesCheckbox, amenities)}</SectionField>
          </Fragment>
        )}

        <SectionField>
          <SideBarButton onClick={() => resetFilters({ index: IndexTypes.HOTELS })}>
            {path(['buttons', 'removeFilters'], uiConfig)}
          </SideBarButton>
        </SectionField>
      </Section>
    </Loader>
  );
};

SearchSidebar.propTypes = propTypes;
SearchSidebar.defaultProps = defaultProps;

export default compose(
  withRouter,
  connect
)(SearchSidebar);
