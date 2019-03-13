import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { __, set, view, path, prop, compose, lensProp, lensPath, pipe, equals, map, merge } from 'ramda';

import { IndexSearch, Loader, DatePicker, LodgingSelect, Checkbox } from 'components';
import { useFetchData } from 'effects';
import { buildQueryString } from 'utils';

import uiConfig, { getSingular } from 'config/ui';

import connect from './SearchSidebar.state';
import { propTypes, defaultProps } from './SearchSidebar.props';
import { Section, Title, SectionField, RegionRadioButton, SideBarButton, RegionCheckbox } from './SearchSidebar.styles';

const indexes = ['destinations', 'hotels'];

const searchLens = lensProp('search');
const datesLens = lensProp('dates');
const lodgingLens = lensProp('lodging');
const honeymoonersLens = lensProp('honeymooners');
const filtersRegionTypeLens = lensPath(['filters', 'regions', 'type']);
const filtersRegionSelectedLens = lensPath(['filters', 'regions', 'selected']);

export const RegionType = {
  ALL: 'all',
  SPECIFY: 'specify',
};

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
            value={getSearchQueryData(filtersRegionTypeLens) || RegionType.ALL}
            onChange={setRegionsTypeToSearchQuery}
            options={[
              {
                label: path(['labels', 'allRegions'], uiConfig),
                value: RegionType.ALL,
              },
              {
                label: path(['labels', 'specifyRegions'], uiConfig),
                value: RegionType.SPECIFY,
              },
            ]}
          />
          {equals(RegionType.SPECIFY, getSearchQueryData(filtersRegionTypeLens)) && map(renderRegionCheckbox, regions)}
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
