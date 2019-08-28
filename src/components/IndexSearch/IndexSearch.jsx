import React, { useState, useCallback } from 'react';
import { isEmpty, map, repeat, length, take, compose, replace, propOr, prop, partial, flatten, equals } from 'ramda';
import hash from 'object-hash';
import { DropDownContent } from '@pure-escapes/webapp-ui-components';

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

const renderResult = ({ selectors, onHitClick }, index, hit) => {
  const ref = prop('ref', hit);

  return (
    !isEmpty(hit) && (
      <IndexSearchHit data-search-hit={ref} key={hash(hit)} onMouseDown={partial(onHitClick, [ref, index])}>
        <IndexSearchHitContent>{propOr(noop, index, selectors)(prop('ref', hit))}</IndexSearchHitContent>
      </IndexSearchHit>
    )
  );
};

const renderResults = ({ indexes, ...props }, hits, i) =>
  !isEmpty(hits) && (
    <IndexSearchHits data-search-hits={indexes[i]} key={hash(hits)}>
      {map(partial(renderResult, [props, i]), hits)}
    </IndexSearchHits>
  );

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
  onChange,
  indexStatus,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(isOpenProp);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(value);
  const [results, setResults] = useState(repeat([], length(indexes)));

  useEffectBoundary(() => {
    setIsOpen(true);
  }, [flatten(results)]);

  useEffectBoundary(() => {
    setSelected(value);
  }, [value]);

  const searchIndexes = () => {
    const indexResults = mapWithIndex(getResults, indexes);
    setResults(indexResults);
  };

  useEffectBoundary(searchIndexes, [value, isOpen, selected, search, indexStatus]);

  const onInputFocus = useCallback(() => setIsOpen(openOnFocus), [openOnFocus]);
  const onInputChange = useCallback(
    e => {
      const newValue = e.currentTarget.value;
      setSearch(newValue);
      setSelected('');
      setIsOpen(true);
      !equals(newValue, value) && onChange({ value: newValue });
    },
    [onChange, value]
  );
  const onSelect = useCallback((value, isOpen) => {
    setSearch('');
    setSelected(value);
    setIsOpen(isOpen);
  }, []);
  const onHitClick = useCallback(
    (ref, index) => {
      const value = propOr(noop, index, selectors)(ref);
      setSelected(value);
      setSearch(value);

      onClick({
        type: indexKeys[index],
        id: ref,
        value,
      });
    },
    [indexKeys, onClick, selectors]
  );

  const getResults = useCallback(
    (index, i) => {
      if (!index) return [];

      const searchString = `${propOr('', i, searchPatterns)}{search}*`;

      const results = index.search(replace('{search}', search, searchString));
      return limit ? take(limit, results) : results;
    },
    [limit, search, searchPatterns]
  );

  if (isEmpty(indexes)) return null;
  if (disabled) return renderInput({ disabled, ...props });

  const currentValue = search || selected;

  const inputProps = {
    value: currentValue,
    readOnly: false,
    onFocus: onInputFocus,
    onChange: onInputChange,
    placeholder,
  };

  const maskProps = {
    ['data-empty']: !currentValue || isEmpty(currentValue),
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
        {(children && isFunction(children) && isOpen && children({ search, results, onSelect })) ||
          (isOpen && (
            <IndexSearchResults>
              {mapWithIndex(partial(renderResults, [{ selectors, onHitClick, indexes }]), results)}
            </IndexSearchResults>
          ))}
      </DropDownContent>
    </StyledIndexSearch>
  );
};

IndexSearch.propTypes = propTypes;
IndexSearch.defaultProps = defaultProps;

export default compose(withSearchIndexes([]))(IndexSearch);
