import React, { useState, Fragment } from 'react';

import { curry, defaultTo, path, gt, values, map, isEmpty, length, propOr, prop } from 'ramda';

import { RadioButton } from 'components/elements';
import { SummaryFormMargin } from 'components/app';

import uiConfig, { getPlural } from 'config/ui';

import { propTypes, defaultProps } from './SummaryFormExtras.props';
import {
  Extra,
  OptionLabel,
  OptionPrice,
  OptionRate,
  Title,
  ExtraSummary,
  ExtraSummaryTitle,
  ExtraSummaryProduct,
  ExtraSummaryTotal,
} from './SummaryFormExtras.styles';

export const SummaryFormExtras = ({
  total,
  booking,
  transfers,
  groundServices,
  onChange,
  summaryOnly,
  totals,
  getRate,
}) => {
  const [hasMargin, setHasMargin] = useState(true);

  const { margin, products } = booking;

  const transfer = propOr('', 'Transfer', products);
  const groundService = propOr('', 'Ground Service', products);

  const marginType = propOr('percentage', 'type', margin);
  const marginValue = propOr(0, 'value', margin);

  const onExtraSelect = curry((type, prevValue, e, value) => onChange(prevValue, value));

  const getOption = ({ name, uuid: value, rate: rateUuid }) => {
    const rates = propOr([], 'rates', getRate(rateUuid));

    const hasMultipleRates = gt(length(rates), 1);
    return {
      label: (
        <OptionLabel key={name}>
          {name}
          {map(
            ({ rate, name }) => (
              <OptionRate key={rate}>
                (+ <OptionPrice>{rate}</OptionPrice>
                {hasMultipleRates ? ` ${name}` : ''})
              </OptionRate>
            ),
            rates
          )}
        </OptionLabel>
      ),
      value,
    };
  };

  const getOptions = map(getOption);

  const renderMargin = () => (
    <Extra>
      <Title>{path(['labels', 'addCommission'], uiConfig)}</Title>
      <SummaryFormMargin
        type={marginType}
        value={marginValue}
        total={total}
        checked={hasMargin}
        onApply={setHasMargin}
        onChange={onChange}
      />
    </Extra>
  );

  const renderExtraOptions = (type, products, value) => {
    const productsArr = values(products);

    return (
      !isEmpty(productsArr) &&
      (summaryOnly ? (
        path([value, 'name'], products) && (
          <ExtraSummary>
            <ExtraSummaryTitle>{getPlural(type)}:</ExtraSummaryTitle>
            <ExtraSummaryProduct>{path([value, 'name'], products)}</ExtraSummaryProduct>
            <ExtraSummaryTotal>{prop(type, totals)}</ExtraSummaryTotal>
          </ExtraSummary>
        )
      ) : (
        <Extra>
          <Title>{getPlural(type)}</Title>
          <RadioButton
            value={defaultTo('', value)}
            options={getOptions([{ name: 'None', uuid: '', rate: { rates: [] } }, ...productsArr])}
            onChange={onExtraSelect(type, defaultTo('', value))}
          />
        </Extra>
      ))
    );
  };

  return (
    <Fragment>
      {renderExtraOptions('transfer', transfers, transfer)}
      {renderExtraOptions('groundService', groundServices, groundService)}
      {!summaryOnly && renderMargin()}
    </Fragment>
  );
};

SummaryFormExtras.propTypes = propTypes;
SummaryFormExtras.defaultProps = defaultProps;

export default SummaryFormExtras;
