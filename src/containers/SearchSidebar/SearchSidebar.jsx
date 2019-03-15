import React, { Fragment } from 'react';
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
} from 'ramda';

import { IndexSearch, Loader, DatePicker, LodgingSelect, Checkbox } from 'components';
import { useFetchData, useEffectBoundary } from 'effects';
import { buildQueryString, RegionSelectTypes, IndexTypes } from 'utils';

import uiConfig, { getSingular, getPlural } from 'config/ui';

import connect from './SearchSidebar.state';
import { propTypes, defaultProps } from './SearchSidebar.props';
import {
  Section,
  Title,
  SectionField,
  RegionRadioButton,
  SideBarButton,
  RegionCheckbox,
  PriceRange,
  PriceRangeLabels,
  PriceRangeLabel,
  PriceRangeLabelPrice,
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
const filtersFeaturesLens = lensPath(['filters', 'features']);

const DefaultPriceRange = path(['defaults', 'priceRange'], uiConfig);

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
  features,
}) => {
  useFetchData(fetchHotels, hotels);

  useEffectBoundary(() => {
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
  const setFeaturesToSearchQuery = pipe(
    merge(getSearchQueryData(filtersFeaturesLens)),
    updateSearchQuery(filtersFeaturesLens),
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

  const renderFeaturesCheckbox = feature =>
    feature && (
      <Checkbox
        key={feature}
        name={`features[${feature}]`}
        label={feature}
        checked={propOr(false, feature, getSearchQueryData(filtersFeaturesLens))}
        onChange={(e, checked) => setFeaturesToSearchQuery({ [feature]: checked })}
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
              <PriceRangeLabelPrice>{head(DefaultPriceRange)}</PriceRangeLabelPrice>
            </PriceRangeLabel>
            <PriceRangeLabel data-align="right">
              {path(['labels', 'to'], uiConfig)}{' '}
              <PriceRangeLabelPrice>{head(tail(DefaultPriceRange))}</PriceRangeLabelPrice>
            </PriceRangeLabel>
          </PriceRangeLabels>
          <PriceRange
            value={getSearchQueryData(filtersPricesLens) || DefaultPriceRange}
            onAfterChange={setPriceRangeToSearchQuery}
            min={head(DefaultPriceRange)}
            max={head(tail(DefaultPriceRange))}
          />
        </SectionField>

        {starRatings && (
          <Fragment>
            <Title>{getSingular('starRating')}</Title>
            <SectionField>{map(renderStarRatingsCheckbox, starRatings)}</SectionField>
          </Fragment>
        )}

        {features && (
          <Fragment>
            <Title>{getPlural('feature')}</Title>
            <SectionField>{map(renderFeaturesCheckbox, features)}</SectionField>
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
