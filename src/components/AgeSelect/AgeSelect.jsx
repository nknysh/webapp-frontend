import React, { useState } from 'react';
import { path, prop, mergeDeepRight, curry, map, keys, ap } from 'ramda';

import { isEmptyOrNil } from 'utils';

import { propTypes, defaultProps } from './AgeSelect.props';
import { Section, Entry, EntryLabel, NumberSelect } from './AgeSelect.styles';

export const AgeSelect = ({ labels, values, onSelect, ageRanges, minMax }) => {
  const [selected, setSelected] = useState(values);

  const onChange = curry((type, number) => {
    const newValues = mergeDeepRight(selected, { [type]: number });
    ap([setSelected, onSelect], [newValues]);
  });

  const renderEntry = type => {
    const fromAge = path([type, 'from'], ageRanges);
    const toAge = path([type, 'to'], ageRanges);
    const fromToAges = !isEmptyOrNil(fromAge) && `(${fromAge}${toAge && ` - ${toAge}`})`;

    return (
      <Entry key={type}>
        <EntryLabel>
          {prop(type, labels)} {fromToAges}
        </EntryLabel>
        <NumberSelect value={prop(type, selected)} onChange={onChange(type)} {...prop(type, minMax)} />
      </Entry>
    );
  };

  return <Section>{map(renderEntry, keys(selected))}</Section>;
};

AgeSelect.propTypes = propTypes;
AgeSelect.defaultProps = defaultProps;

export default AgeSelect;
