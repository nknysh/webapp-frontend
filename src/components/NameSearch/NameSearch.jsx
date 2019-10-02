import React, { useCallback, useState, useMemo, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { path, map, propOr, partial } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { DropDownContent } from '@pure-escapes/webapp-ui-components';

import { useEffectBoundary } from 'effects';

import { propTypes, defaultProps } from './NameSearch.props';
import { Label, Searching, ResultsSet, Results, Result } from './NameSearch.styles';

const renderResult = (id, label, onClick) => (
  <Result key={id} onClick={() => onClick({ id, value: label })}>
    {label}
  </Result>
);

const renderAdmin = ({ onClick }, { id, name }) => renderResult(id, name, onClick);
const renderCountry = ({ onClick }, { code, name }) => renderResult(code, name, onClick);
const renderHotel = ({ onClick }, { uuid, name }) => renderResult(uuid, name, onClick);

const renderResults = (t, { results, ...props }) => (
  <ResultsSet>
    <Results id="admins">{map(partial(renderAdmin, [props]), propOr([], 'admins', results))}</Results>
    <Results id="countries">{map(partial(renderCountry, [props]), propOr([], 'countries', results))}</Results>
    <Results id="hotels">{map(partial(renderHotel, [props]), propOr([], 'hotels', results))}</Results>
  </ResultsSet>
);

/**
 * `NameSearch` wraps a auto-complete text box to allow searching for countries and hotels
 * to filter a search
 *
 * `doSearch` is set and passed as part of `onChange` based on if we want to re-fill the dropdown,
 * or actually perform a search
 * @see https://pureescapes.atlassian.net/browse/OWA-628 for further details
 */
export const NameSearch = ({ label, onChange, value, results, isLoading, onClick, placeholder }) => {
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const onSearchChange = useCallback(
    e => {
      const value = path(['currentTarget', 'value'], e);
      setIsOpen(true);
      setSearchValue(value);
      onChange({ value });
    },
    [onChange]
  );

  const onResultClick = useCallback(
    result => {
      onClick(result);
      setIsOpen(false);

      // special scenario for clicking the admin "ALL COUNTRIES AND RESORTS" option
      // in this case, do a special onChange with a blank value (so searches for all names)
      // @see https://pureescapes.atlassian.net/browse/OWA-628
      const value = result.id === 'CLEAR' ? '' : result.value;
      setSearchValue(value);
      onChange({ value });
    },
    [onClick, onChange]
  );

  const onFocus = useCallback(() => setIsOpen(true), [setIsOpen]);
  const onVisibilityChange = useCallback(setIsOpen);

  const inputProps = useMemo(
    () => ({ onFocus, placeholder, value: searchValue, onChange: onSearchChange, readOnly: false }),
    [onSearchChange, searchValue, placeholder, onFocus]
  );

  // If the value is changed externally, reflect that here
  useEffectBoundary(() => {
    setSearchValue(value);
  }, [value]);

  return (
    <Fragment>
      {label && <Label>{label}</Label>}
      <DropDownContent
        inputProps={inputProps}
        showRawInput={true}
        showContent={isOpen}
        onVisibilityChange={onVisibilityChange}
      >
        {isLoading && <Searching>{t('messages.searching')}</Searching>}
        {!isNilOrEmpty(results) ? (
          renderResults(t, { results, onClick: onResultClick })
        ) : (
          <Searching>{t('labels.noResults')}</Searching>
        )}
      </DropDownContent>
    </Fragment>
  );
};

NameSearch.propTypes = propTypes;
NameSearch.defaultProps = defaultProps;

export default NameSearch;
