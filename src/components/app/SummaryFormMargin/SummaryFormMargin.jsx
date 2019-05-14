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

export const SummaryFormMargin = ({ onChange, checked, value, type, summaryOnly, total }) => {
  const typeIsPercent = equals('percentage', type);

  return (
    <Margin>
      {!summaryOnly && (
        <MarginCheckbox
          onChange={onChange}
          checked={checked}
          label={path(['labels', 'applyMargin'], uiConfig)}
          name="margin[applied]"
        />
      )}
      {checked && (
        <Fragment>
          <MarginInputs>
            <Select
              onChange={onChange}
              disabled={!checked}
              value={type}
              options={prop('marginOptions', uiConfig)}
              name="margin[type]"
            />
            <Input type="number" name="margin[value]" value={value} min={0} onChange={onChange} disabled={!checked} />
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
