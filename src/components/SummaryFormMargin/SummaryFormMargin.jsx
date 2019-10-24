import React, { Fragment, useEffect, useCallback } from 'react';
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
  ContextMenu,
  MarginWrapper,
} from './SummaryFormMargin.styles';

export const SummaryFormMargin = ({
  compact,
  className,
  onChange,
  checked,
  value,
  type,
  summaryOnly,
  total,
  compactEdit,
  onEditClick,
  currencyCode,
}) => {
  const { t } = useTranslation();
  const typeIsPercent = equals('percentage', type);

  const notSummaryAndNotCompact = !summaryOnly && !compact;
  const checkedAndNotSummaryAndNotCompact = checked && notSummaryAndNotCompact;
  const checkedOrSummaryOrCompactEdit = checked || summaryOnly || compactEdit;

  const handleChange = e => {
    const updateValue = e.target.name === 'taMarginAmount' ? e.target.value : value;
    onChange(e, type, updateValue);
  };

  return (
    <Margin className={className}>
      {notSummaryAndNotCompact && (
        <MarginCheckbox onChange={onChange} checked={checked} label={t('labels.applyMargin')} name="marginApplied" />
      )}
      {checkedAndNotSummaryAndNotCompact && (
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
      {checkedOrSummaryOrCompactEdit && (
        <MarginTotal data-compact={checkedOrSummaryOrCompactEdit}>
          <MarginWrapper>
            {!compact && t('labels.currentMargin')}{' '}
            {!checked && compactEdit ? (
              t('labels.notApplied')
            ) : (
              <MarginTotalAmount>
                {`${currencyCode}${formatPrice(typeIsPercent ? calculatePercentage(total, value) : value)}`}
              </MarginTotalAmount>
            )}
            {typeIsPercent && (
              <MarginValue data-compact={compact}>
                <MarginPercentSuffix>{value}</MarginPercentSuffix> {t('labels.currentMarginPercentageSuffix')}
              </MarginValue>
            )}
          </MarginWrapper>
          {compactEdit && (
            <ContextMenu>
              <span onClick={() => onEditClick('margin')}>{t('buttons.edit')}</span>
            </ContextMenu>
          )}
        </MarginTotal>
      )}
    </Margin>
  );
};

SummaryFormMargin.propTypes = propTypes;
SummaryFormMargin.defaultProps = defaultProps;

export default SummaryFormMargin;