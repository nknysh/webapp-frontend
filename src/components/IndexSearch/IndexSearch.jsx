import React, { useState } from 'react';
import { isEmpty, map, repeat, length, take, compose, replace, propOr, prop, curry } from 'ramda';
import hash from 'object-hash';

import { DropDownContent } from 'components';
import { useEffectBoundary } from 'effects';
import { withSearchIndexes } from 'hoc';
import { isFunction, noop, mapWithIndex } from 'utils';

import { propTypes, defaultProps } from './IndexSearch.props';
import {
  StyledIndexSearch,
  IndexSearchLabel,
  IndexSearchInput,
  IndexSearchHit,
  IndexSearchHitContent,
  IndexSearchHits,
  IndexSearchResults,
} from './IndexSearch.styles';

const renderLabel = label => label && <IndexSearchLabel>{label}</IndexSearchLabel>;
const renderInput = props => <IndexSearchInput {...props} />;

export const IndexSearch = ({
  children,
  className,
  disabled,
  indexes,
  indexKeys,
  isOpen: isOpenProp,
  label,
  limit,
  onClick,
  openOnFocus,
  placeholder,
  searchPatterns,
  selectors,
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

  useEffectBoundary(searchIndexes, [value, isOpen, selected, search]);

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

  const renderResult = (index, hit) => {
    const ref = prop('ref', hit);

    const onHitClick = () => {
      const value = propOr(noop, index, selectors)(ref);
      setSelected(value);
      setSearch(value);

      onClick({
        type: indexKeys[index],
        id: ref,
        value,
      });
    };

    return (
      !isEmpty(hit) && (
        <IndexSearchHit data-search-hit={ref} key={hash(hit)} onMouseDown={onHitClick}>
          <IndexSearchHitContent>{propOr(noop, index, selectors)(prop('ref', hit))}</IndexSearchHitContent>
        </IndexSearchHit>
      )
    );
  };

  const renderResults = (hits, i) =>
    !isEmpty(hits) && (
      <IndexSearchHits data-search-hits={indexes[i]} key={hash(hits)}>
        {map(curry(renderResult)(i), hits)}
      </IndexSearchHits>
    );

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
        {(children && isFunction(children) && isOpen && children({ search, results, onSelect })) ||
          (isOpen && <IndexSearchResults>{mapWithIndex(renderResults, results)}</IndexSearchResults>)}
      </DropDownContent>
    </StyledIndexSearch>
  );
};

IndexSearch.propTypes = propTypes;
IndexSearch.defaultProps = defaultProps;

export default compose(withSearchIndexes([]))(IndexSearch);
