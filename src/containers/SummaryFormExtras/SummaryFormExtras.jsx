import React, { Fragment } from 'react';

import {
  append,
  compose,
  filter,
  groupBy,
  gt,
  hasPath,
  isEmpty,
  join,
  map,
  mapObjIndexed,
  partialRight,
  path,
  pathOr,
  pipe,
  prop,
  propEq,
  propOr,
  reduce,
  reject,
  values as Rvalues,
} from 'ramda';

import SummaryFormMargin from 'components/app/SummaryFormMargin';
import { RadioButton } from 'components/elements';

import { ProductTypes } from 'config/enums';
import uiConfig, { getPlural } from 'config/ui';
import { isEmptyOrNil, isString } from 'utils';

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

const hasDirection = hasPath(['meta', 'direction']);
const productsBothWays = reject(hasDirection);
const productsOneWay = filter(hasDirection);

// eslint-disable-next-line
const renderOption = ({ total, title, quantity = 0 }) => (
  <OptionRate key={total}>
    {gt(quantity, 1) && `${quantity} x`} {title} (+ <OptionPrice>{total}</OptionPrice>)
  </OptionRate>
);

const renderOptionSummary = (accum, { total, products, breakdown, selected, ...rest }) =>
  selected
    ? append(
        <AddonSummary key={join(',', products)}>
          <ExtraSummaryProduct>
            {map(
              ({ product, title }) => (
                <span key={product}>
                  {title}{' '}
                  {path(['meta', 'direction'], rest) &&
                    `- ${path(['labels', path(['meta', 'direction'], rest)], uiConfig)}`}
                </span>
              ),
              breakdown
            )}
          </ExtraSummaryProduct>
          <ExtraSummaryTotal>{total}</ExtraSummaryTotal>
        </AddonSummary>,
        accum
      )
    : accum;

export const SummaryFormExtras = ({
  addons,
  onChange,
  onExtraChange,
  summaryOnly,
  grandTotal,
  transfers,
  groundServices,
  values,
}) => {
  const renderExtraOptions = (type, productType, products) => {
    if (summaryOnly) {
      const summaries = reduce(renderOptionSummary, [], products);

      return (
        !isEmptyOrNil(summaries) && (
          <ExtraSummary>
            <ExtraSummaryTitle>{getPlural(type)}:</ExtraSummaryTitle>
            <AddonSummaries>{summaries}</AddonSummaries>
          </ExtraSummary>
        )
      );
    }

    const getOption = ({ products, breakdown }) => {
      const value = join(',', products);
      const label = map(renderOption, breakdown);

      return { label, value };
    };

    const options = map(getOption, products);

    return (
      !isEmptyOrNil(options) && (
        <Extra>
          <Title>{getPlural(type)}</Title>
          <RadioButton
            name={productType}
            onChange={partialRight(onChange, [true])}
            options={[{ label: 'None', value: '' }, ...options]}
            value={isString(propOr('', productType, values)) && propOr('', productType, values)}
          />
        </Extra>
      )
    );
  };

  const renderExtraSelects = (type, products, values) => {
    // eslint-disable-next-line react/prop-types
    const renderSelect = ({ products, breakdown, selected, total }) => {
      const uuids = join(',', products);
      const checked = propOr(false, uuids, values);

      return summaryOnly ? (
        selected && (
          <AddonSummary key={uuids}>
            <ExtraSummaryProduct>
              {map(
                ({ uuid, title }) => (
                  <ExtraSummaryProduct key={uuid}>{title}</ExtraSummaryProduct>
                ),
                breakdown
              )}
            </ExtraSummaryProduct>
            <ExtraSummaryTotal>{total}</ExtraSummaryTotal>
          </AddonSummary>
        )
      ) : (
        <AddonCheckbox
          name={uuids}
          checked={selected || checked}
          onChange={onExtraChange}
          key={uuids}
          label={<OptionLabel>{map(renderOption, breakdown)}</OptionLabel>}
          value={uuids}
        />
      );
    };

    const selectElements = map(renderSelect, products);

    return (
      !isEmpty(selectElements) &&
      (summaryOnly ? (
        !isEmptyOrNil(filter(propEq('selected', true), products)) && (
          <ExtraSummary>
            <ExtraSummaryTitle>{getPlural(type)}:</ExtraSummaryTitle>
            <AddonSummaries>{selectElements}</AddonSummaries>
          </ExtraSummary>
        )
      ) : (
        <Extra>
          <Title>{getPlural(type)}</Title>
          {selectElements}
        </Extra>
      ))
    );
  };

  const renderOneWayProduct = (products, uuids) =>
    map(({ breakdown, meta: { direction }, selected }) => {
      const identifier = join('|', [uuids, direction]);

      const renderOneWayOption = breakdownData => (
        <Fragment key={prop('uuid', breakdownData)}>
          {renderOption(breakdownData)} - {path(['labels', direction], uiConfig)}
        </Fragment>
      );

      return (
        <AddonCheckbox
          name={identifier}
          checked={selected}
          onChange={onExtraChange}
          key={identifier}
          label={map(renderOneWayOption, breakdown)}
          value={identifier}
        />
      );
    }, products);

  const renderOneWayProducts = pipe(
    productsOneWay,
    groupBy(prop('products')),
    mapObjIndexed(renderOneWayProduct),
    Rvalues
  );

  const renderMargin = () => (
    <Extra>
      <Title>{path(['labels', 'addCommission'], uiConfig)}</Title>
      <SummaryFormMargin
        checked={pathOr(true, ['margin', 'applied'], values)}
        onChange={onChange}
        total={grandTotal}
        type={pathOr('percentage', ['margin', 'type'], values)}
        value={pathOr(0, ['margin', 'value'], values)}
      />
    </Extra>
  );

  return (
    <Fragment>
      {renderExtraOptions('transfer', ProductTypes.TRANSFER, summaryOnly ? transfers : productsBothWays(transfers))}
      {!summaryOnly && renderOneWayProducts(transfers)}
      {renderExtraOptions(
        'groundService',
        ProductTypes.GROUND_SERVICE,
        summaryOnly ? groundServices : productsBothWays(groundServices)
      )}
      {!summaryOnly && renderOneWayProducts(groundServices)}
      {renderExtraSelects('addon', addons)}
      {!summaryOnly && renderMargin()}
    </Fragment>
  );
};

SummaryFormExtras.propTypes = propTypes;
SummaryFormExtras.defaultProps = defaultProps;

export default compose(connect)(SummaryFormExtras);
