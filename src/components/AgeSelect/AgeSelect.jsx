import React, { useState, Fragment, useCallback } from 'react';
import {
  __,
  ap,
  assocPath,
  defaultTo,
  flatten,
  gt,
  keys,
  length,
  lensProp,
  map,
  mapObjIndexed,
  mergeDeepRight,
  objOf,
  omit,
  partial,
  path,
  pathOr,
  pipe,
  prop,
  propOr,
  range,
  reduce,
  set,
  times,
  update,
  values as Rvalues,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import { isAdult } from 'utils';

import { getAgeSplits } from 'containers/SummaryRoom/SummaryRoom.utils';

import { propTypes, defaultProps } from './AgeSelect.props';
import {
  AgeDropDown,
  AgeDropDownSelect,
  AgeDropDownTitle,
  Entry,
  EntryLabel,
  NumberSelect,
  Section,
} from './AgeSelect.styles';

const DEFAULT_MAX = 99;

/**
 * Get age ranges for splits
 *
 * Function to extract age ranges inside age splits
 *
 * @param {object}
 * @returns {object}
 */
const getAgeRangesForSplits = pipe(
  omit(['adult']),
  mapObjIndexed((data, name) => ({ name, ...data })),
  Rvalues,
  assocPath(['options', 'ages'], __, {}),
  omit(['adult'])
);

/**
 * Reduce range
 *
 * @param {object} accum
 * @param {string} value
 * @returns {object}
 */
const reduceRange = (accum, value) => ({ ...accum, [value]: value });

const renderDropDown = ({ fromAge, toAge, type, splits, onAgeSelectChange, onAgeSelectOpen, onAgeSelectClose }, i) => (
  <AgeDropDownSelect
    key={i}
    options={reduce(reduceRange, {}, range(fromAge, toAge + 1))}
    value={pathOr(fromAge, [type, i], splits)}
    onChange={partial(onAgeSelectChange, [type, i])}
    onOpen={onAgeSelectOpen}
    onClose={onAgeSelectClose}
  />
);

const renderEntry = (
  t,
  {
    ageRanges,
    onAgeSelectChange,
    onAgeSelectOpen,
    onAgeSelectClose,
    onChange,
    showAgeDropDown,
    selected,
    splits,
    minMax,
  },
  type
) => {
  const typeIsAdult = isAdult(type);
  const fromAge = path([type, 'ageFrom'], ageRanges);
  const toAge = path([type, 'ageTo'], ageRanges);
  const fromToAges = !isNilOrEmpty(fromAge) && `(${fromAge}${toAge && ` - ${toAge}`})`;
  const values = propOr([], type, splits);
  const value = typeIsAdult ? prop('numberOfAdults', selected) : length(values);
  const limits = prop(type, minMax) || { min: 0, max: DEFAULT_MAX };

  return (
    <Fragment key={type}>
      <Entry>
        <EntryLabel>
          {type} {fromToAges}
        </EntryLabel>
        <NumberSelect value={value} onChange={partial(onChange, [type, fromAge])} {...limits} />
      </Entry>
      {propOr(true, type, showAgeDropDown) && gt(value, 0) && (
        <AgeDropDown>
          <AgeDropDownTitle>{t('labels.specifyAges')}</AgeDropDownTitle>
          {times(
            partial(renderDropDown, [
              { fromAge, toAge, type, splits, onAgeSelectChange, onAgeSelectOpen, onAgeSelectClose },
            ]),
            value
          )}
        </AgeDropDown>
      )}
    </Fragment>
  );
};

const renderEntries = (t, { ageRanges, ...props }) =>
  map(partial(renderEntry, [t, { ageRanges, ...props }]), keys(ageRanges));

export const AgeSelect = ({ values, onSelect, ageRanges, ...props }) => {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(values);

  const ageSplits = getAgeSplits(getAgeRangesForSplits(ageRanges), [objOf('guestAges', selected)], true);

  const [splits, setSplits] = useState(ageSplits);

  const onChange = useCallback(
    (type, defaultVal, number) => {
      const typeIsAdult = isAdult(type);

      const typeArray = propOr([], type, splits);

      // If this is not adult, then we make the child array the lenght it should be
      if (!typeIsAdult) typeArray.length = number;

      // Don't add adults to the splits object
      const newSplits = omit(
        ['adult'],
        typeIsAdult
          ? splits
          : mergeDeepRight(splits, { [type]: map(defaultTo(defaultTo(true, defaultVal)), typeArray) })
      );

      const newSelected = typeIsAdult
        ? set(lensProp('numberOfAdults'), number, selected)
        : set(lensProp('agesOfAllChildren'), flatten(Rvalues(newSplits)), selected);

      setSplits(newSplits);
      ap([setSelected, onSelect], [newSelected]);
    },
    [splits, selected, onSelect]
  );

  const onAgeSelectChange = useCallback(
    (type, index, e) => {
      const newSplits = omit(
        ['adult'],
        mergeDeepRight(splits, {
          [type]: update(index, Number(path(['target', 'value'], e)), prop(type, splits)),
        })
      );

      const newSelected = set(lensProp('agesOfAllChildren'), flatten(Rvalues(newSplits)), selected);

      setSplits(newSplits);
      ap([setSelected, onSelect], [newSelected]);
    },
    [splits, selected, onSelect]
  );

  return <Section>{renderEntries(t, { ageRanges, splits, onAgeSelectChange, onChange, selected, ...props })}</Section>;
};

AgeSelect.propTypes = propTypes;
AgeSelect.defaultProps = defaultProps;

export default AgeSelect;
