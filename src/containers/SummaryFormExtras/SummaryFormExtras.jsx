import React, { Fragment } from 'react';

import {
  prepend,
  append,
  pathOr,
  path,
  gt,
  reduce,
  values as Rvalues,
  map,
  isEmpty,
  length,
  propOr,
  prop,
  pipe,
  toPairs,
  includes,
  without,
  uniq,
  compose,
} from 'ramda';

import SummaryFormMargin from 'components/app/SummaryFormMargin';
import { RadioButton } from 'components/elements';

import uiConfig, { getPlural } from 'config/ui';

import connect from './SummaryFormExtras.state';
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
  AddonCheckbox,
  AddonSummary,
  AddonSummaries,
} from './SummaryFormExtras.styles';

// eslint-disable-next-line
const renderOptionRate = multiple => ({ rate, name }) => (
  <OptionRate key={rate}>
    (+ <OptionPrice>{rate}</OptionPrice>
    {multiple ? ` ${name}` : ''})
  </OptionRate>
);

export const SummaryFormExtras = ({
  addons,
  addonsTotals,
  getRate,
  groundServices,
  groundServicesTotal,
  onChange,
  onExtraChange,
  summaryOnly,
  total,
  transfers,
  transfersTotal,
  values,
}) => {
  const totals = { transfer: transfersTotal, groundService: groundServicesTotal, addon: addonsTotals };

  const getOption = (accum, { name, uuid: value, rate }) => {
    const rates = prop('rates', getRate(rate));

    if (!rates) return accum;

    const hasMultipleRates = gt(length(rates), 1);
    return append(
      {
        label: (
          <OptionLabel key={name}>
            {name}
            {map(renderOptionRate(hasMultipleRates), rates)}
          </OptionLabel>
        ),
        value,
      },
      accum
    );
  };

  const getOptions = pipe(
    reduce(getOption, []),
    prepend({ label: 'None', value: '' })
  );

  const renderMargin = () => (
    <Extra>
      <Title>{path(['labels', 'addCommission'], uiConfig)}</Title>
      <SummaryFormMargin
        checked={pathOr(true, ['margin', 'applied'], values)}
        onChange={onChange}
        total={total}
        type={pathOr('percentage', ['margin', 'type'], values)}
        value={pathOr(0, ['margin', 'value'], values)}
      />
    </Extra>
  );

  const renderExtraOptions = (type, products, value) => {
    const productsArr = Rvalues(products);

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
            name={type}
            onChange={onExtraChange}
            options={getOptions(productsArr)}
            value={prop(type, values)}
          />
        </Extra>
      ))
    );
  };

  const renderExtraSelects = (type, products, values) => {
    const renderSelect = (accum, [uuid, { name, rate }]) => {
      const rates = prop('rates', getRate(rate));

      if (!rates) return accum;

      const hasMultipleRates = gt(length(rates), 1);

      const onChecked = (e, checked) => {
        const newValues = checked ? append(e.target.value, values) : without(e.target.value, values);
        onExtraChange({ target: { type: 'array', name: e.target.name, value: uniq(newValues) } }, newValues);
      };

      const checked = includes(uuid, values);

      const select = summaryOnly ? (
        checked && (
          <AddonSummary key={uuid}>
            <ExtraSummaryProduct>{path([uuid, 'name'], products)}</ExtraSummaryProduct>
            <ExtraSummaryTotal>{pathOr(0, [type, uuid], totals)}</ExtraSummaryTotal>
          </AddonSummary>
        )
      ) : (
        <AddonCheckbox
          name="addons"
          checked={checked}
          onChange={onChecked}
          key={uuid}
          label={
            <OptionLabel>
              {name}
              {map(renderOptionRate(hasMultipleRates), rates)}
            </OptionLabel>
          }
          value={uuid}
        />
      );

      return select ? append(select, accum) : accum;
    };

    const selectElements = pipe(
      toPairs,
      reduce(renderSelect, [])
    )(products);

    return (
      !isEmpty(selectElements) &&
      (summaryOnly ? (
        <ExtraSummary>
          <ExtraSummaryTitle>{getPlural(type)}:</ExtraSummaryTitle>
          <AddonSummaries>{selectElements}</AddonSummaries>
        </ExtraSummary>
      ) : (
        <Extra>
          <Title>{getPlural(type)}</Title>
          {selectElements}
        </Extra>
      ))
    );
  };

  return (
    <Fragment>
      {renderExtraOptions('transfer', transfers, propOr('', 'transfer', values))}
      {renderExtraOptions('groundService', groundServices, propOr('', 'groundService', values))}
      {renderExtraSelects('addon', addons, propOr([], 'addons', values))}
      {!summaryOnly && renderMargin()}
    </Fragment>
  );
};

SummaryFormExtras.propTypes = propTypes;
SummaryFormExtras.defaultProps = defaultProps;

export default compose(connect)(SummaryFormExtras);
