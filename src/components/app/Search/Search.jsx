import React, { Fragment } from 'react';
import { __, path, lensProp, defaultTo, set, view, pipe, prop } from 'ramda';
import debounce from 'lodash.debounce';

import uiConfig from 'config/ui';
import { DatePicker, Checkbox } from 'components/elements';
import LodgingSelect from 'components/app/LodgingSelect';
import { isLoading } from 'store/common';

import { propTypes, defaultProps } from './Search.props';
import { SearchBarButton, SearchBarIndexSearch, SearchBarSection } from './Search.styles';

const destinationLens = lensProp('destination');
const datesLens = lensProp('dates');
const lodgingLens = lensProp('lodging');
const honeymoonersLens = lensProp('suitableForHoneymooners');

export const Search = ({
  indexes,
  searchStatus,
  searchQuery,
  onChange,
  onSearch,
  indexSelectors,
  onSubmit,
  showSubmit,
  vertical,
}) => {
  const updateSearchQuery = set(__, __, searchQuery);
  const getSearchQueryData = view(__, searchQuery);

  const setSelectedDatesToSearchQuery = pipe(
    updateSearchQuery(datesLens),
    onChange
  );

  const setLodgingsToSearchQuery = pipe(
    updateSearchQuery(lodgingLens),
    onChange
  );

  const setHoneymoonersToSearchQuery = pipe(
    updateSearchQuery(honeymoonersLens),
    onChange
  );

  const onIndexSelect = pipe(
    updateSearchQuery(destinationLens),
    onChange
  );

  return (
    <Fragment>
      <SearchBarSection data-vertical={vertical}>
        <SearchBarIndexSearch
          indexes={indexes}
          isLoading={isLoading(searchStatus)}
          label={path(['labels', 'search'], uiConfig)}
          limit={5}
          onChange={debounce(onSearch, 600)}
          onClick={onIndexSelect}
          openOnFocus={false}
          placeholder={path(['placeholders', 'search'], uiConfig)}
          selectors={indexSelectors}
          value={prop('value', getSearchQueryData(destinationLens))}
        />
      </SearchBarSection>
      <SearchBarSection data-vertical={vertical} data-large={true}>
        <DatePicker
          label={path(['labels', 'dates'], uiConfig)}
          onSelected={setSelectedDatesToSearchQuery}
          selectedValues={getSearchQueryData(datesLens)}
        />
      </SearchBarSection>
      <SearchBarSection data-vertical={vertical}>
        <LodgingSelect
          label={path(['labels', 'lodging'], uiConfig)}
          onSelected={setLodgingsToSearchQuery}
          selectedValues={getSearchQueryData(lodgingLens)}
        />
      </SearchBarSection>
      <SearchBarSection data-vertical={vertical} data-constrain={true}>
        <Checkbox
          label={path(['labels', 'honeymooners'], uiConfig)}
          onChange={(e, checked) => setHoneymoonersToSearchQuery(checked)}
          checked={defaultTo(false, getSearchQueryData(honeymoonersLens))}
        />
      </SearchBarSection>

      {showSubmit && (
        <SearchBarSection data-vertical={vertical}>
          <SearchBarButton onClick={onSubmit}>{path(['buttons', 'search'], uiConfig)}</SearchBarButton>
        </SearchBarSection>
      )}
    </Fragment>
  );
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
