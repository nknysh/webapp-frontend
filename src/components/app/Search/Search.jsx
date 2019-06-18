import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { __, lensProp, defaultTo, set, view, pipe, prop } from 'ramda';
import { renameKeys } from 'ramda-adjunct';
import debounce from 'lodash.debounce';

import { DatePicker, Checkbox } from 'components/elements';
import LodgingSelect from 'components/app/LodgingSelect';
import { isLoading } from 'store/common';
import { toDate } from 'utils';

import { propTypes, defaultProps } from './Search.props';
import { SearchBarButton, SearchBarIndexSearch, SearchBarSection } from './Search.styles';

const destinationLens = lensProp('destination');
const datesLens = lensProp('dates');
const lodgingLens = lensProp('lodging');
const honeymoonersLens = lensProp('suitableForHoneymooners');

export const getMonthToDisplay = pipe(
  prop('endDate'),
  toDate
);

const renderSearchButton = (t, { canSearch, onSubmit }) => (
  <SearchBarButton disabled={!canSearch} onClick={onSubmit}>
    {t('buttons.search')}
  </SearchBarButton>
);

export const Search = ({
  canSearch,
  indexes,
  indexSelectors,
  onChange,
  onSearch,
  onSubmit,
  searchPatterns,
  searchQuery,
  searchStatus,
  showSubmit,
  vertical,
}) => {
  const { t } = useTranslation();

  const updateSearchQuery = set(__, __, searchQuery);
  const getSearchQueryData = view(__, searchQuery);

  const setSelectedDatesToSearchQuery = pipe(
    renameKeys({ from: 'startDate', to: 'endDate' }),
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
          label={t('labels.search')}
          limit={5}
          onChange={debounce(onSearch, 600)}
          onClick={onIndexSelect}
          openOnFocus={false}
          placeholder={t('form.placeholders.search')}
          selectors={indexSelectors}
          searchPatterns={searchPatterns}
          value={prop('value', getSearchQueryData(destinationLens))}
        />
      </SearchBarSection>
      <SearchBarSection data-vertical={vertical} data-large={true}>
        <DatePicker
          dayPickerProps={{
            month: getMonthToDisplay(getSearchQueryData(datesLens)),
          }}
          label={`${t('labels.dates')} *`}
          onSelected={setSelectedDatesToSearchQuery}
          selectedValues={getSearchQueryData(datesLens)}
        />
      </SearchBarSection>
      <SearchBarSection data-vertical={vertical}>
        <LodgingSelect
          label={`${t('labels.lodging')} *`}
          onSelected={setLodgingsToSearchQuery}
          rooms={getSearchQueryData(lodgingLens)}
        />
      </SearchBarSection>
      <SearchBarSection data-vertical={vertical} data-constrain={true}>
        <Checkbox
          label={t('labels.honeymooners')}
          onChange={(e, checked) => setHoneymoonersToSearchQuery(checked)}
          checked={defaultTo(false, getSearchQueryData(honeymoonersLens))}
        />
      </SearchBarSection>

      {showSubmit && (
        <SearchBarSection data-vertical={vertical}>{renderSearchButton(t, { onSubmit, canSearch })}</SearchBarSection>
      )}
    </Fragment>
  );
};

Search.propTypes = propTypes;
Search.defaultProps = defaultProps;

export default Search;
