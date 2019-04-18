import React, { useState } from 'react';
import { path, prop, mergeDeepRight, curry, map, keys, ap } from 'ramda';

import { getPlural } from 'config/ui';
import { isEmptyOrNil } from 'utils';

import { propTypes, defaultProps } from './AgeSelect.props';
import { Section, Entry, EntryLabel, NumberSelect } from './AgeSelect.styles';

export const AgeSelect = ({ values, onSelect, ageRanges, minMax }) => {
  const [selected, setSelected] = useState(values);

  const onChange = curry((type, number) => {
    const newValues = mergeDeepRight(selected, { [type]: number });
    ap([setSelected, onSelect], [newValues]);
  });

  const renderEntry = type => {
    const fromAge = path([type, 'ageFrom'], ageRanges);
    const toAge = path([type, 'ageTo'], ageRanges);
    const fromToAges = !isEmptyOrNil(fromAge) && `(${fromAge}${toAge && ` - ${toAge}`})`;

    return (
      <Entry key={type}>
        <EntryLabel>
          {getPlural(type)} {fromToAges}
        </EntryLabel>
        <NumberSelect value={prop(type, selected)} onChange={onChange(type)} {...prop(type, minMax)} />
      </Entry>
    );
  };

  return <Section>{map(renderEntry, keys(ageRanges))}</Section>;
};

AgeSelect.propTypes = propTypes;
AgeSelect.defaultProps = defaultProps;

export default AgeSelect;
