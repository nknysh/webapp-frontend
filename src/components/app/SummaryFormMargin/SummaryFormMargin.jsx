import React, { Fragment } from 'react';
import { equals } from 'ramda';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();
  const typeIsPercent = equals('percentage', type);

  return (
    <Margin>
      {!summaryOnly && (
        <MarginCheckbox onChange={onChange} checked={checked} label={t('labels.applyMargin')} name="margin[applied]" />
      )}
      {checked && (
        <Fragment>
          <MarginInputs>
            <Select
              onChange={onChange}
              disabled={!checked}
              value={type}
              options={{
                percentage: t('percentage'),
                flat: t('flatRate'),
              }}
              name="margin[type]"
            />
            <Input type="number" name="margin[value]" value={value} min={0} onChange={onChange} disabled={!checked} />
          </MarginInputs>
        </Fragment>
      )}
      {(checked || summaryOnly) && (
        <MarginTotal>
          {t('labels.currentMargin')}{' '}
          <MarginTotalAmount>
            {formatPrice(typeIsPercent ? calculatePercentage(total, value) : value)}
          </MarginTotalAmount>
          {typeIsPercent && (
            <Fragment>
              {', '}
              <MarginPercentSuffix>{value}</MarginPercentSuffix> {t('labels.currentMarginPercentageSuffix')}
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
