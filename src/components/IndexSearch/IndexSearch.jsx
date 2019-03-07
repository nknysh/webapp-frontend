import React, { useState, useEffect } from 'react';
import { isEmpty, map, repeat, length, take, compose, replace, propOr } from 'ramda';

import { DropDownContent } from 'components';
import { withSearchIndexes } from 'hoc';
import { isFunction } from 'utils';

import { propTypes, defaultProps } from './IndexSearch.props';
import { StyledIndexSearch, IndexSearchLabel, IndexSearchInput } from './IndexSearch.styles';

const renderLabel = label => label && <IndexSearchLabel>{label}</IndexSearchLabel>;
const renderInput = props => <IndexSearchInput {...props} />;

export const IndexSearch = ({
  children,
  className,
  disabled,
  indexes,
  isOpen: isOpenProp,
  label,
  limit,
  openOnFocus,
  searchPatterns,
  placeholder,
  value,
  ...props
}) => {
  if (isEmpty(indexes)) return null;

  if (disabled) return renderInput({ disabled, ...props });

  const [isOpen, setIsOpen] = useState(isOpenProp);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(value);
  const [results, setResults] = useState(repeat([], length(indexes)));

  const getResults = index => {
    const searchString =
      (!isEmpty(search) && replace('{search}', search, propOr('{search}*', index, searchPatterns))) || '';
    const results = index.search(searchString);
    return limit ? take(limit, results) : results;
  };

  const searchIndexes = () => {
    const indexResults = map(getResults, indexes);
    setResults(indexResults);
  };

  useEffect(searchIndexes, [value, isOpen, selected, search]);

  const currentValue = search || selected;

  const inputProps = {
    value: currentValue,
    onFocus: () => setIsOpen(openOnFocus),
    onBlur: () => setIsOpen(false),
    onChange: e => {
      setSearch(e.currentTarget.value);
      setSelected('');
      setIsOpen(true);
    },
    placeholder,
  };

  const maskProps = {
    ['data-empty']: !currentValue || isEmpty(currentValue),
  };

  const onSelect = (value, isOpen) => {
    setSearch('');
    setSelected(value);
    setIsOpen(isOpen);
  };

  return (
    <StyledIndexSearch className={className}>
      {renderLabel(label)}
      <DropDownContent
        inputProps={inputProps}
        maskProps={maskProps}
        inputContent={currentValue || ''}
        showArrow={false}
        showRawInput={true}
        showContent={isOpen}
      >
        {children && isFunction(children) && isOpen && children({ search, results, onSelect })}
      </DropDownContent>
    </StyledIndexSearch>
  );
};

IndexSearch.propTypes = propTypes;
IndexSearch.defaultProps = defaultProps;

export default compose(withSearchIndexes([]))(IndexSearch);
