import React, { Fragment } from 'react';
import { equals, path, prop } from 'ramda';

import uiConfig from 'config/ui';
import { Input, Select } from 'components/elements';
import { formatPrice, calculatePercentage } from 'utils';

import { propTypes, defaultProps } from './SummaryFormMargin.props';
import {
  Margin,
  MarginCheckbox,
  MarginInputs,
  MarginPercentSuffix,
  MarginTotal,
  MarginTotalAmount,
} from './SummaryFormMargin.styles';

export const SummaryFormMargin = ({ onChange, onApply, checked, value, type, summaryOnly, total }) => {
  const typeIsPercent = equals('percentage', type);

  const onMarginChecked = (e, checked) => {
    onChange({ margin: { applied: checked } });
    onApply(checked);
  };

  const onMarginTypeChange = e => {
    const type = path(['target', 'value'], e);
    onChange({ margin: { type } });
  };

  const onMarginValueChange = e => {
    const value = Number(path(['target', 'value'], e));
    onChange({ margin: { type: type, value } });
  };

  return (
    <Margin>
      {!summaryOnly && (
        <MarginCheckbox
          onChange={onMarginChecked}
          checked={checked}
          label={path(['labels', 'applyMargin'], uiConfig)}
        />
      )}
      {checked && (
        <Fragment>
          <MarginInputs>
            <Select
              onChange={onMarginTypeChange}
              disabled={!checked}
              value={type}
              options={prop('marginOptions', uiConfig)}
            />
            <Input type="number" value={value} onChange={onMarginValueChange} disabled={!checked} />
          </MarginInputs>
        </Fragment>
      )}
      {(checked || summaryOnly) && (
        <MarginTotal>
          {path(['labels', 'currentMargin'], uiConfig)}{' '}
          <MarginTotalAmount>
            {formatPrice(typeIsPercent ? calculatePercentage(total, value) : value)}
          </MarginTotalAmount>
          {typeIsPercent && (
            <Fragment>
              {', '}
              <MarginPercentSuffix>{value}</MarginPercentSuffix>{' '}
              {path(['labels', 'currentMarginPercentageSuffix'], uiConfig)}
            </Fragment>
          )}
        </MarginTotal>
      )}
    </Margin>
  );
};

SummaryFormMargin.propTypes = propTypes;
SummaryFormMargin.defaultProps = defaultProps;

export default SummaryFormMargin;
