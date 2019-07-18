import React, { useCallback, useState } from 'react';
import { append, mapObjIndexed, values, map, pipe } from 'ramda';

import { useBodyClass } from 'effects';
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

const mapOverSections = map(renderSection);

export const Select = ({ label, onSelected, options, className, onChange, onOpen, onClose, open, ...props }) => {
  const [isOpen, setIsOpen] = useState(open);
  const { setBodyClass, removeBodyClass } = useBodyClass();

  const onSelect = useCallback(e => {
    onSelected(e.target.value);
    onChange(e);
  });

  const onSelectOpen = useCallback(
    (...args) => {
      onOpen(...args);
      setIsOpen(true);
      setBodyClass('select-open');
    },
    [onOpen]
  );

  const onSelectClose = useCallback(
    (...args) => {
      onClose(...args);
      setIsOpen(false);
      removeBodyClass('select-open');
    },
    [onClose]
  );

  const renderedOptions = isArray(options) ? mapOverSections(options) : mapOverKeys(options);

  return (
    <StyledSelect className={className}>
      <StyledFormLabel
        control={
          <MaterialSelect
            classes={selectClasses}
            onChange={onSelect}
            onClose={onSelectClose}
            onOpen={onSelectOpen}
            open={isOpen}
            {...props}
          >
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
