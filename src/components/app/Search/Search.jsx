import React, { Fragment, useCallback } from 'react';
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
const repeatGuestLens = lensProp('repeatGuest');

export const getMonthToDisplay = pipe(
  prop('startDate'),
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

  const updateSearchQuery = useCallback(set(__, __, searchQuery), [searchQuery]);
  const getSearchQueryData = useCallback(view(__, searchQuery), [searchQuery]);

  const setSelectedDatesToSearchQuery = useCallback(
    pipe(
      renameKeys({ from: 'startDate', to: 'endDate' }),
      updateSearchQuery(datesLens),
      onChange
    ),
    [updateSearchQuery, onChange]
  );

  const setLodgingsToSearchQuery = useCallback(
    pipe(
      updateSearchQuery(lodgingLens),
      onChange
    ),
    [updateSearchQuery, onChange]
  );

  const setRepeatGuest = useCallback(
    pipe(
      updateSearchQuery(repeatGuestLens),
      onChange
    ),
    [updateSearchQuery, onChange]
  );

  const onIndexSelect = useCallback(
    pipe(
      updateSearchQuery(destinationLens),
      onChange
    ),
    [updateSearchQuery, onChange]
  );

  const onRepeatGuestChange = useCallback((e, checked) => setRepeatGuest(checked), [setRepeatGuest]);

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
          label={t('labels.isRepeat')}
          onChange={onRepeatGuestChange}
          checked={defaultTo(false, getSearchQueryData(repeatGuestLens))}
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
