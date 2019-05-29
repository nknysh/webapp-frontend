import React, { useState, Fragment } from 'react';
import {
  path,
  prop,
  mergeDeepRight,
  curry,
  reduce,
  map,
  keys,
  ap,
  times,
  propOr,
  gt,
  range,
  update,
  length,
  defaultTo,
  pathOr,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';

import { propTypes, defaultProps } from './AgeSelect.props';
import {
  Section,
  Entry,
  EntryLabel,
  NumberSelect,
  AgeDropDown,
  AgeDropDownTitle,
  AgeDropDownSelect,
} from './AgeSelect.styles';

const reduceRange = (accum, value) => ({ ...accum, [value]: value });

export const AgeSelect = ({ values, onSelect, ageRanges, minMax, showAgeDropDown }) => {
  const [selected, setSelected] = useState(values);

  const renderEntry = type => {
    const fromAge = path([type, 'ageFrom'], ageRanges);
    const toAge = path([type, 'ageTo'], ageRanges);
    const fromToAges = !isNilOrEmpty(fromAge) && `(${fromAge}${toAge && ` - ${toAge}`})`;
    const values = propOr([], type, selected);
    const value = length(values);

    const onChange = curry((type, number) => {
      const typeArray = propOr([], type, selected);
      typeArray.length = number;
      const newValues = mergeDeepRight(selected, { [type]: map(defaultTo(defaultTo(true, fromAge)), typeArray) });
      ap([setSelected, onSelect], [newValues]);
    });

    const onAgeSelectChange = curry((type, index, e) => {
      const newValues = mergeDeepRight(selected, {
        [type]: update(index, Number(path(['target', 'value'], e)), prop(type, selected)),
      });
      ap([setSelected, onSelect], [newValues]);
    });

    const renderDropDown = i => (
      <AgeDropDownSelect
        key={i}
        options={reduce(reduceRange, {}, range(fromAge, toAge))}
        value={pathOr(fromAge, [type, i], selected)}
        onChange={onAgeSelectChange(type, i)}
      />
    );

    return (
      <Fragment key={type}>
        <Entry>
          <EntryLabel>
            {type} {fromToAges}
          </EntryLabel>
          <NumberSelect value={value} onChange={onChange(type)} {...prop(type, minMax)} />
        </Entry>
        {propOr(true, type, showAgeDropDown) && gt(value, 0) && (
          <AgeDropDown>
            <AgeDropDownTitle>Please specifiy ages:</AgeDropDownTitle>
            {times(renderDropDown, value)}
          </AgeDropDown>
        )}
      </Fragment>
    );
  };

  return <Section>{map(renderEntry, keys(ageRanges))}</Section>;
};

AgeSelect.propTypes = propTypes;
AgeSelect.defaultProps = defaultProps;

export default AgeSelect;
