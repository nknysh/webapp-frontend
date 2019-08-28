import React from 'react';
import { useTranslation } from 'react-i18next';
import { map, partial, prop } from 'ramda';

import { propTypes, defaultProps } from './OccasionsSelect.props';
import { Checkbox } from './OccasionsSelect.styles';

const renderCheckbox = (t, { onChange, selected }, value) => (
  <Checkbox
    checked={prop(value, selected)}
    key={value}
    label={t(`labels.occasions.${value}`)}
    value={value}
    name={`occasions[${value}]`}
    onChange={(e, checked) => onChange({ occasions: { [value]: checked } })}
  />
);

export const OccasionsSelect = ({ occasions, ...props }) => {
  const { t } = useTranslation();
  return map(partial(renderCheckbox, [t, props]), occasions);
};

OccasionsSelect.propTypes = propTypes;
OccasionsSelect.defaultProps = defaultProps;

export default OccasionsSelect;
