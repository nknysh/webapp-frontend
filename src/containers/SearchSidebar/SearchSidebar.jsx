import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { __, set, view, path, prop, compose, lensProp, pipe } from 'ramda';

import { IndexSearch, Loader, DatePicker, LodgingSelect, Checkbox } from 'components';
import { useFetchData } from 'effects';
import { buildQueryString } from 'utils';

import uiConfig from 'config/ui';

import connect from './SearchSidebar.state';
import { propTypes, defaultProps } from './SearchSidebar.props';
import { Section, Title, SectionField } from './SearchSidebar.styles';

const indexes = ['destinations', 'hotels'];

const searchLens = lensProp('search');
const datesLens = lensProp('dates');
const lodgingLens = lensProp('lodging');
const honeymoonersLens = lensProp('honeymooners');

export const SearchSidebar = ({
  destinations,
  fetchDestinations,
  fetchHotels,
  getDestinationTitle,
  getHotelName,
  hotels,
  searchQuery,
  setSearchQuery,
  history,
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

  const onIndexSearchClick = pipe(
    updateSearchQuery(searchLens),
    setSearchQuery
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
    </Loader>
  );
};

SearchSidebar.propTypes = propTypes;
SearchSidebar.defaultProps = defaultProps;

export default compose(
  withRouter,
  connect
)(SearchSidebar);
