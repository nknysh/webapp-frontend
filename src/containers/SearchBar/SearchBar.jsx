import React from 'react';
import { withRouter } from 'react-router-dom';
import { __, pipe, compose, path, prop, set, lensProp, view } from 'ramda';
import debounce from 'lodash.debounce';

import uiConfig from 'config/ui';

import { Loader, DatePicker, LodgingSelect, Checkbox } from 'components';
import { useFetchData } from 'effects';
import { buildQueryString } from 'utils';

import { propTypes, defaultProps } from './SearchBar.props';
import { SearchBarButton, SearchBarIndexSearch, SearchBarSection, StyledSearchBar } from './SearchBar.styles';
import connect from './SearchBar.state';

const searchLens = lensProp('search');
const datesLens = lensProp('dates');
const lodgingLens = lensProp('lodging');
const honeymoonersLens = lensProp('honeymooners');

export const SearchBar = ({
  className,
  fetchSearch,
  getCountryName,
  getHotelName,
  history,
  searchQuery,
  setSearchQuery,
  searchStatus,
}) => {
  useFetchData(searchStatus, fetchSearch);

  const indexes = ['countries', 'hotels'];
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

  const onIndexSearch = pipe(
    updateSearchQuery(searchLens),
    setSearchQuery
  );

  const submitSearch = () => history.push(`/search?${buildQueryString(searchQuery)}`);

  return (
    <StyledSearchBar className={className}>
      <Loader isLoading={false} showSpinner={false}>
        <SearchBarSection>
          <SearchBarIndexSearch
            indexes={indexes}
            label={path(['labels', 'search'], uiConfig)}
            limit={5}
            onClick={onIndexSearch}
            openOnFocus={false}
            placeholder={path(['placeholders', 'search'], uiConfig)}
            selectors={[getCountryName, getHotelName]}
            value={prop('value', getSearchQueryData(searchLens))}
            onChange={debounce(onIndexSearch, 600)}
          />
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
            onChange={(e, checked) => setHoneymoonersToSearchQuery(checked)}
            checked={getSearchQueryData(honeymoonersLens)}
            value={true}
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
