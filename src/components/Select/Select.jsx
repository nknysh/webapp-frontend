import React from 'react';
import { append, mapObjIndexed, values, map, pipe } from 'ramda';

import { isArray } from 'utils';

import { propTypes, defaultProps } from './Select.props';
import {
  StyledSelect,
  StyledFormLabel,
  MaterialSelect,
  SelectMenuItem,
  selectClasses,
  SectionDivider,
} from './Select.styles';

const renderItem = (value, key) => (
  <SelectMenuItem key={key} value={key}>
    {value}
  </SelectMenuItem>
);

const renderItems = mapObjIndexed(renderItem);

const mapOverKeys = pipe(
  renderItems,
  values
);

const renderSection = pipe(
  mapOverKeys,
  append(<SectionDivider />)
);

const mapOverSections = pipe(map(renderSection));

export const Select = ({ label, onSelected, options, className, onChange, ...props }) => {
  const onSelect = e => {
    onSelected(e.target.value);
    onChange(e);
  };

  const renderedOptions = isArray(options) ? mapOverSections(options) : mapOverKeys(options);

  return (
    <StyledSelect className={className}>
      <StyledFormLabel
        control={
          <MaterialSelect classes={selectClasses} onChange={onSelect} {...props}>
            {renderedOptions}
          </MaterialSelect>
        }
        label={label}
      />
    </StyledSelect>
  );
};

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
