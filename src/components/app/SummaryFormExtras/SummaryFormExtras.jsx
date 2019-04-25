import React, { useState, Fragment } from 'react';

import { curry, defaultTo, path, gt, values, map, isEmpty, length, propOr } from 'ramda';

import { RadioButton } from 'components/elements';
import { SummaryFormMargin } from 'components/app';

import uiConfig, { getPlural } from 'config/ui';

import { propTypes, defaultProps } from './SummaryFormExtras.props';
import { Extra, OptionLabel, OptionPrice, OptionRate, Title } from './SummaryFormExtras.styles';

const getOption = ({ name, uuid: value, rate: { rates } }) => {
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

export const SummaryFormExtras = ({ total, booking, transfers, groundServices, onChange }) => {
  const [hasMargin, setHasMargin] = useState(true);

  const { margin, transfer, groundService } = booking;

  const marginType = propOr('percentage', 'type', margin);
  const marginValue = propOr(0, 'value', margin);

  const onExtraSelect = curry((type, e, value) => onChange({ [type]: value }));

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
      !isEmpty(productsArr) && (
        <Extra>
          <Title>{getPlural(type)}</Title>
          <RadioButton
            value={defaultTo('', value)}
            options={getOptions([{ name: 'None', uuid: '', rate: { rates: [] } }, ...productsArr])}
            onChange={onExtraSelect(type)}
          />
        </Extra>
      )
    );
  };

  return (
    <Fragment>
      {renderExtraOptions('transfer', transfers, transfer)}
      {renderExtraOptions('groundService', groundServices, groundService)}
      {renderMargin()}
    </Fragment>
  );
};

SummaryFormExtras.propTypes = propTypes;
SummaryFormExtras.defaultProps = defaultProps;

export default SummaryFormExtras;
