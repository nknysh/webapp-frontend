import React from 'react';
import { withRouter } from 'react-router-dom';
import { __, pipe, compose, pathOr, path, isEmpty, prop, curry, map, set, lensProp, view } from 'ramda';
import hash from 'object-hash';

import uiConfig from 'config/ui';

import { Loader, DatePicker, LodgingSelect, Checkbox } from 'components';
import { useFetchData } from 'effects';
import { buildQueryString, mapWithIndex, noop } from 'utils';

import { propTypes, defaultProps } from './SearchBar.props';
import {
  SearchBarButton,
  SearchBarHit,
  SearchBarHitContent,
  SearchBarHits,
  SearchBarIndexSearch,
  SearchBarResults,
  SearchBarSection,
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
  useFetchData(fetchHotels, hotels);
  useFetchData(fetchDestinations, destinations);

  const indexes = ['destinations', 'hotels'];
  const resultsMap = [{ selector: getDestinationTitle }, { selector: getHotelTitle }];
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
            <SearchBarHitContent>{pathOr(noop, [index, 'selector'], resultsMap)(prop('ref', hit))}</SearchBarHitContent>
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
    <StyledSearchBar className={className}>
      <Loader isLoading={!destinations || !hotels} showSpinner={false}>
        <SearchBarSection>
          <SearchBarIndexSearch
            indexes={indexes}
            label={path(['labels', 'search'], uiConfig)}
            limit={5}
            openOnFocus={false}
            placeholder={path(['placeholders', 'search'], uiConfig)}
            value={prop('value', getSearchQueryData(searchLens))}
          >
            {renderSearchBarResults}
          </SearchBarIndexSearch>
        </SearchBarSection>
        <SearchBarSection data-large={true}>
          <DatePicker
            label={path(['labels', 'dates'], uiConfig)}
            onSelected={setSelectedDatesToSearchQuery}
            selectedValues={getSearchQueryData(datesLens)}
          />
        </SearchBarSection>
        <SearchBarSection>
          <LodgingSelect
            id="lodging"
            label={path(['labels', 'lodging'], uiConfig)}
            onSelected={setLodgingsToSearchQuery}
            selectedValues={getSearchQueryData(lodgingLens)}
          />
        </SearchBarSection>
        <SearchBarSection data-constrain={true}>
          <Checkbox
            label={path(['labels', 'honeymooners'], uiConfig)}
            onSelected={setHoneymoonersToSearchQuery}
            checked={getSearchQueryData(honeymoonersLens)}
          />
        </SearchBarSection>
        <SearchBarSection>
          <SearchBarButton onClick={submitSearch}>{path(['buttons', 'search'], uiConfig)}</SearchBarButton>
        </SearchBarSection>
      </Loader>
    </StyledSearchBar>
  );
};

SearchBar.propTypes = propTypes;
SearchBar.defaultProps = defaultProps;

export default compose(
  connect,
  withRouter
)(SearchBar);
