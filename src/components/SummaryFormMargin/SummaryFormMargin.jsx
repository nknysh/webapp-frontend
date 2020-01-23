import React, { Fragment } from 'react';
import { equals } from 'ramda';
import { useTranslation } from 'react-i18next';
import { Input, Select } from '@pure-escapes/webapp-ui-components';

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
  MarginWrapper,
} from './SummaryFormMargin.styles';

export const SummaryFormMargin = ({ className, onChange, checked, value, type, total, currencyCode }) => {
  const { t } = useTranslation();
  const typeIsPercent = equals('percentage', type);

  const isChecked = checked;
  // const checkedOrSummaryOrCompactEdit = checked || summaryOnly || compactEdit;

  const handleChange = e => {
    if (e.target.name === 'taMarginAmount') {
      onChange(e, type, e.target.value);
    } else if (e.target.name === 'taMarginType') {
      onChange(e, e.target.value, value);
    }
  };

  const handleCheckboxChange = isCurrentlyChecked => {
    onChange(null, null, null, !isCurrentlyChecked);
  };

  return (
    <Margin className={className}>
      <MarginCheckbox
        onChange={() => handleCheckboxChange(checked)}
        checked={checked}
        label={t('labels.applyMargin')}
        name="marginApplied"
      />
      {isChecked && (
        <Fragment>
          <MarginInputs>
            <Select
              onChange={handleChange}
              disabled={!checked}
              value={type}
              options={{
                percentage: t('percentage'),
                flat: t('flatRate'),
              }}
              name="taMarginType"
            />
            <Input
              type="number"
              name="taMarginAmount"
              value={value}
              min={0}
              onChange={handleChange}
              disabled={!checked}
            />
          </MarginInputs>
        </Fragment>
      )}
      {isChecked && (
        <MarginTotal>
          <MarginWrapper>
            {t('labels.currentMargin')}{' '}
            {!checked ? (
              t('labels.notApplied')
            ) : (
              <MarginTotalAmount>
                {`${currencyCode}${formatPrice(typeIsPercent ? calculatePercentage(total, value) : value)}`}
              </MarginTotalAmount>
            )}
            {typeIsPercent && (
              <MarginValue>
                <MarginPercentSuffix>{value}</MarginPercentSuffix> {t('labels.currentMarginPercentageSuffix')}
              </MarginValue>
            )}
          </MarginWrapper>
        </MarginTotal>
      )}
    </Margin>
  );
};

SummaryFormMargin.propTypes = propTypes;
SummaryFormMargin.defaultProps = defaultProps;

export default SummaryFormMargin;
