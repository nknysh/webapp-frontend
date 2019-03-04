import React from 'react';
import { mapObjIndexed, values } from 'ramda';

import { propTypes, defaultProps } from './Select.props';
import { StyledSelect, StyledFormLabel, MaterialSelect, SelectMenuItem, selectClasses } from './Select.styles';

const renderItems = (value, key) => (
  <SelectMenuItem key={key} value={key}>
    {value}
  </SelectMenuItem>
);

export const Select = ({ label, onSelected, options, className, onChange, ...props }) => {
  const onSelect = e => {
    onSelected(e.target.value);
    onChange(e);
  };

  return (
    <StyledSelect className={className}>
      <StyledFormLabel
        control={
          <MaterialSelect classes={selectClasses} onChange={onSelect} {...props}>
            {values(mapObjIndexed(renderItems, options))}
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
