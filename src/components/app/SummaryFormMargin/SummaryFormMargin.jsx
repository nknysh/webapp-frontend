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
  MarginValue,
} from './SummaryFormMargin.styles';

export const SummaryFormMargin = ({ compact, className, onChange, checked, value, type, summaryOnly, total }) => {
  const { t } = useTranslation();
  const typeIsPercent = equals('percentage', type);

  return (
    <Margin className={className}>
      {!summaryOnly && !compact && (
        <MarginCheckbox onChange={onChange} checked={checked} label={t('labels.applyMargin')} name="marginApplied" />
      )}
      {checked && !summaryOnly && !compact && (
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
              name="taMarginType"
            />
            <Input type="number" name="taMarginAmount" value={value} min={0} onChange={onChange} disabled={!checked} />
          </MarginInputs>
        </Fragment>
      )}
      {(checked || summaryOnly) && (
        <MarginTotal data-compact={compact}>
          {!compact && t('labels.currentMargin')}{' '}
          <MarginTotalAmount>
            {formatPrice(typeIsPercent ? calculatePercentage(total, value) : value)}
          </MarginTotalAmount>
          {typeIsPercent && (
            <MarginValue data-compact={compact}>
              <MarginPercentSuffix>{value}</MarginPercentSuffix> {t('labels.currentMarginPercentageSuffix')}
            </MarginValue>
          )}
        </MarginTotal>
      )}
    </Margin>
  );
};

SummaryFormMargin.propTypes = propTypes;
SummaryFormMargin.defaultProps = defaultProps;

export default SummaryFormMargin;
