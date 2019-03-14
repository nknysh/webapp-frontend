import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { __, set, view, path, prop, compose, lensProp, lensPath, pipe, equals, map, merge, head, tail } from 'ramda';

import { IndexSearch, Loader, DatePicker, LodgingSelect, Checkbox } from 'components';
import { useFetchData } from 'effects';
import { buildQueryString, RegionSelectTypes } from 'utils';

import uiConfig, { getSingular } from 'config/ui';

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

const indexes = ['destinations', 'hotels'];

const searchLens = lensProp('search');
const datesLens = lensProp('dates');
const lodgingLens = lensProp('lodging');
const honeymoonersLens = lensProp('honeymooners');
const filtersRegionTypeLens = lensPath(['filters', 'regions', 'type']);
const filtersRegionSelectedLens = lensPath(['filters', 'regions', 'selected']);
const filtersPricesLens = lensPath(['filters', 'prices']);

const DefaultPriceRange = path(['defaults', 'priceRange'], uiConfig);

export const SearchSidebar = ({
  destinations,
  fetchDestinations,
  fetchHotels,
  getDestinationTitle,
  getHotelName,
  hotels,
  searchQuery,
  setSearchQuery,
  resetFilters,
  history,
  regions,
}) => {
  useFetchData(fetchHotels, hotels);
  useFetchData(fetchDestinations, destinations);

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

  const onIndexSearchClick = pipe(
    updateSearchQuery(searchLens),
    setSearchQuery
  );

  const renderRegionCheckbox = region => (
    <RegionCheckbox
      key={region}
      name={`regions[selected][${region}]`}
      label={region}
      checked={prop(region, getSearchQueryData(filtersRegionSelectedLens))}
      onChange={(e, checked) => setRegionsSelectedToSearchQuery({ [region]: checked })}
    />
  );

  return (
    <Loader isLoading={!hotels || !destinations}>
      <Section>
        <Title>{path(['labels', 'searching'], uiConfig)}</Title>
        <SectionField>
          <IndexSearch
            indexes={indexes}
            label={path(['labels', 'search'], uiConfig)}
            limit={5}
            openOnFocus={false}
            placeholder={path(['placeholders', 'search'], uiConfig)}
            selectors={[getDestinationTitle, getHotelName]}
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
        <SectionField>
          <SideBarButton onClick={resetFilters}>{path(['buttons', 'removeFilters'], uiConfig)}</SideBarButton>
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
