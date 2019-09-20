import React, { useCallback, useState, useMemo, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { path, map, propOr, partial } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { DropDownContent } from '@pure-escapes/webapp-ui-components';

import { useEffectBoundary } from 'effects';

import { propTypes, defaultProps } from './NameSearch.props';
import { Label, Searching, ResultsSet, Results, Result } from './NameSearch.styles';

const renderResult = (id, label, onClick) => <Result onClick={() => onClick({ id, value: label })}>{label}</Result>;

const renderCountry = ({ onClick }, { code, name }) => renderResult(code, name, onClick);
const renderHotel = ({ onClick }, { uuid, name }) => renderResult(uuid, name, onClick);

const renderResults = (t, { results, ...props }) => (
  <ResultsSet>
    <Results id="countries">{map(partial(renderCountry, [props]), propOr([], 'countries', results))}</Results>
    <Results id="hotels">{map(partial(renderHotel, [props]), propOr([], 'hotels', results))}</Results>
  </ResultsSet>
);

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
    },
    [onClick]
  );

  const onFocus = useCallback(() => setIsOpen(true), [setIsOpen]);

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
      <DropDownContent inputProps={inputProps} showRawInput={true} showContent={isOpen}>
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
