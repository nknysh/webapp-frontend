import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { __, pipe, compose, pathOr, path, isEmpty, prop, curry, map, set, lensProp, view } from 'ramda';
import hash from 'object-hash';

import uiConfig from 'config/ui';

import { Loader, DatePicker, LodgingSelect, Checkbox } from 'components';
import { useFetchData } from 'effects';
import { buildQueryString, mapWithIndex, noop } from 'utils';

import { DropDownContentContentContext } from 'components/DropDownContent/DropDownContent.context';

import { propTypes, defaultProps } from './SearchBar.props';
import {
  SearchBarHit,
  SearchBarHits,
  SearchBarIndexSearch,
  SearchBarResults,
  SearchBarSection,
  SearchBarButton,
  StyledSearchBar,
} from './SearchBar.styles';
import connect from './SearchBar.state';

const searchLens = lensProp('search');
const datesLens = lensProp('dates');
const lodgingLens = lensProp('lodging');
const honeymoonersLens = lensProp('honeymooners');

export const SearchBar = ({
  className,
  destinations,
  fetchDestinations,
  fetchHotels,
  getDestinationTitle,
  getHotelTitle,
  hotels,
  history,
  searchQuery,
  setSearchQuery,
}) => {
  const indexes = ['destinations', 'hotels'];
  const resultsMap = [{ selector: getDestinationTitle }, { selector: getHotelTitle }];

  const [currentContext, setCurrentContext] = useState(undefined);

  useFetchData(fetchHotels, hotels);
  useFetchData(fetchDestinations, destinations);

  // Sets current focused section, which will attempt to close the other sections
  const setContext = context => setCurrentContext(context);

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

  const submitSearch = () => history.push(`/search?${buildQueryString(searchQuery)}`);

  // eslint-disable-next-line
  const renderSearchBarResults = ({ results, onSelect = noop }) => {
    const renderResult = (index, hit) => {
      const ref = prop('ref', hit);

      const onClick = () => {
        const value = pathOr(noop, [index, 'selector'], resultsMap)(ref);

        setSearchQuery(
          updateSearchQuery(searchLens, {
            type: indexes[index],
            id: ref,
            value,
          })
        );
        onSelect(value);
      };

      return (
        !isEmpty(hit) && (
          <SearchBarHit data-search-hit={ref} key={hash(hit)} onMouseDown={onClick}>
            {pathOr(noop, [index, 'selector'], resultsMap)(prop('ref', hit))}
          </SearchBarHit>
        )
      );
    };

    const renderResults = (hits, i) =>
      !isEmpty(hits) && (
        <SearchBarHits data-search-hits={indexes[i]} key={hash(hits)}>
          {map(curry(renderResult)(i), hits)}
        </SearchBarHits>
      );

    return <SearchBarResults>{mapWithIndex(renderResults, results)}</SearchBarResults>;
  };

  return (
    <DropDownContentContentContext.Provider value={currentContext}>
      <StyledSearchBar className={className}>
        <Loader isLoading={!destinations || !hotels}>
          <SearchBarSection onClick={() => setContext('search')}>
            <SearchBarIndexSearch
              id="search"
              indexes={['destinations', 'hotels']}
              label={path(['labels', 'search'], uiConfig)}
              limit={5}
              placeholder={path(['placeholders', 'search'], uiConfig)}
              value={prop('value', getSearchQueryData(searchLens))}
            >
              {renderSearchBarResults}
            </SearchBarIndexSearch>
          </SearchBarSection>
          <SearchBarSection data-large={true} onClick={() => setContext('dates')}>
            <DatePicker
              id="dates"
              label={path(['labels', 'dates'], uiConfig)}
              onSelected={setSelectedDatesToSearchQuery}
              selectedValues={getSearchQueryData(datesLens)}
              showOverlay={true}
            />
          </SearchBarSection>
          <SearchBarSection onClick={() => setContext('lodging')}>
            <LodgingSelect
              id="lodging"
              label={path(['labels', 'lodging'], uiConfig)}
              onSelected={setLodgingsToSearchQuery}
              selectedValues={getSearchQueryData(lodgingLens)}
            />
          </SearchBarSection>
          <SearchBarSection data-constrain={true} onClick={() => setContext('honeymooners')}>
            <Checkbox
              label="Honeymooners"
              onSelected={setHoneymoonersToSearchQuery}
              checked={getSearchQueryData(honeymoonersLens)}
            />
          </SearchBarSection>
          <SearchBarSection onClick={() => setContext('search')}>
            <SearchBarButton onClick={submitSearch}>{path(['buttons', 'search'], uiConfig)}</SearchBarButton>
          </SearchBarSection>
        </Loader>
      </StyledSearchBar>
    </DropDownContentContentContext.Provider>
  );
};

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default compose(
  connect,
  withRouter
)(SearchBar);
