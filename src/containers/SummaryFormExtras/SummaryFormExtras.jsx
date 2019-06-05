import React, { Fragment, useState } from 'react';

import {
  append,
  compose,
  equals,
  filter,
  flatten,
  groupBy,
  gt,
  has,
  hasPath,
  head,
  isEmpty,
  join,
  map,
  mapObjIndexed,
  mergeDeepRight,
  objOf,
  partial,
  path,
  pipe,
  prop,
  propEq,
  propOr,
  reduce,
  reject,
  split,
  toPairs,
  values as Rvalues,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import SummaryFormMargin from 'components/app/SummaryFormMargin';
import { RadioButton } from 'components/elements';

import { ProductTypes } from 'config/enums';
import { isString } from 'utils';

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

const fromOneWayProducts = (type, data) => {
  const products = propOr({}, type, data);

  const reduced = pipe(
    mapObjIndexed((uuids, direction) => map(uuid => ({ uuid, direction }), uuids)),
    reject(propEq('uuid', '')),
    Rvalues,
    flatten
  )(products);

  return reduced;
};

const toOneWayProducts = pipe(
  filter(has('direction')),
  groupBy(prop('direction')),
  map(map(prop('uuid')))
);

const extractChosenAddons = (type, data) =>
  pipe(
    prop(type),
    toPairs,
    // eslint-disable-next-line
    reduce((accum, [uuid, checked]) => (checked ? append(objOf('uuid', uuid), accum) : accum), [])
  )(data);

const toSelectedAddon = reduce((accum, { uuid }) => mergeDeepRight({ [uuid]: true }, accum), {});

// eslint-disable-next-line
const renderOption = ({ total, title, quantity = 0 }) => (
  <OptionRate key={total}>
    {gt(quantity, 1) && `${quantity} x`} {title} (+ <OptionPrice>{total}</OptionPrice>)
  </OptionRate>
);

const renderOptionSummary = (t, accum, { total, products, breakdown, selected, ...rest }) =>
  selected
    ? append(
        <AddonSummary key={join(',', products)}>
          <ExtraSummaryProduct>
            {map(
              ({ product, title }) => (
                <span key={product}>
                  {title} {path(['meta', 'direction'], rest) && `- ${t(`labels.${path(['meta', 'direction'], rest)}`)}`}
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

const renderExtraOptions = (t, type, productType, products, { onSingleChange, summaryOnly, values }) => {
  if (summaryOnly) {
    const summaries = reduce(partial(renderOptionSummary, [t]), [], products);

    return (
      !isNilOrEmpty(summaries) && (
        <ExtraSummary>
          <ExtraSummaryTitle>{t(`${type}_plural`)}:</ExtraSummaryTitle>
          <AddonSummaries>{summaries}</AddonSummaries>
        </ExtraSummary>
      )
    );
  }

  const getOption = ({ products, breakdown }) => {
    const value = join(',', map(prop('uuid'), products));
    const label = map(renderOption, breakdown);

    return { label, value };
  };

  const options = map(getOption, products);

  return (
    !isNilOrEmpty(options) && (
      <Extra>
        <Title>{t(`${type}_plural`)}</Title>
        <RadioButton
          name={productType}
          onChange={partial(onSingleChange, [productType])}
          options={[{ label: 'None', value: '' }, ...options]}
          value={isString(propOr('', productType, values)) && propOr('', productType, values)}
        />
      </Extra>
    )
  );
};

const renderMargin = (t, { onMarginChange, grandTotal, values, summaryOnly, compact }) =>
  compact
    ? propOr(true, 'marginApplied', values) && (
        <ExtraSummary>
          <ExtraSummaryTitle>{t('labels.commission')}:</ExtraSummaryTitle>
          <AddonSummaries>
            <SummaryFormMargin
              checked={propOr(true, 'marginApplied', values)}
              onChange={onMarginChange}
              total={grandTotal}
              type={propOr('percentage', 'taMarginType', values)}
              value={propOr(0, 'taMarginAmount', values)}
              summaryOnly={summaryOnly}
              compact={compact}
            />
          </AddonSummaries>
        </ExtraSummary>
      )
    : !summaryOnly && (
        <Extra>
          <Title>{t('labels.addCommission')}</Title>
          <SummaryFormMargin
            checked={propOr(true, 'marginApplied', values)}
            onChange={onMarginChange}
            total={grandTotal}
            type={propOr('percentage', 'taMarginType', values)}
            value={propOr(0, 'taMarginAmount', values)}
            summaryOnly={summaryOnly}
          />
        </Extra>
      );
const renderSelect = (t, { onMultipleChange, summaryOnly, values }, { products, breakdown, selected, total }) => {
  const uuids = join(',', map(prop('uuid'), products));
  const checked = propOr(false, uuids, values);

  const productType = pipe(
    head,
    prop('type')
  )(products);

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
      onChange={partial(onMultipleChange, [productType])}
      key={uuids}
      label={<OptionLabel>{map(renderOption, breakdown)}</OptionLabel>}
      value={uuids}
    />
  );
};

const renderExtraSelects = (t, type, products, { summaryOnly, ...props }) => {
  const selectElements = map(partial(renderSelect, [t, { summaryOnly, ...props }]), products);

  return (
    !isEmpty(selectElements) &&
    (summaryOnly ? (
      !isNilOrEmpty(filter(propEq('selected', true), products)) && (
        <ExtraSummary>
          <ExtraSummaryTitle>{t(`${type}_plural`)}:</ExtraSummaryTitle>
          <AddonSummaries>{selectElements}</AddonSummaries>
        </ExtraSummary>
      )
    ) : (
      <Extra>
        <Title>{t(`${type}_plural`)}</Title>
        {selectElements}
      </Extra>
    ))
  );
};

const renderOneWayOption = (t, direction, breakdownData) => (
  <Fragment key={prop('uuid', breakdownData)}>
    {renderOption(breakdownData)} - {t(`labels.${direction}`)}
  </Fragment>
);

const renderOneWayProduct = (t, productType, { onOneWayChange }, products, uuids) =>
  map(({ breakdown, meta: { direction }, selected }) => {
    const identifier = join('|', [uuids, direction]);

    return (
      <AddonCheckbox
        name={productType}
        checked={selected}
        onChange={partial(onOneWayChange, [productType])}
        key={identifier}
        label={map(partial(renderOneWayOption, [t, direction]), breakdown)}
        value={identifier}
      />
    );
  }, products);

const renderOneWayProducts = (t, productType, products, props) =>
  pipe(
    productsOneWay,
    groupBy(
      pipe(
        prop('products'),
        map(prop('uuid'))
      )
    ),
    mapObjIndexed(partial(renderOneWayProduct, [t, productType, props])),
    Rvalues
  )(products);

export const SummaryFormExtras = ({
  addons,
  grandTotal,
  groundServices,
  replaceProducts,
  selectedFines,
  selectedGroundServices,
  selectedSupplements,
  selectedTransfers,
  summaryOnly,
  transfers,
  updateBooking,
  values,
  compact,
  id,
}) => {
  const { t } = useTranslation();

  const [oneWayProducts, setOneWayProducts] = useState({
    [ProductTypes.TRANSFER]: toOneWayProducts(selectedTransfers),
    [ProductTypes.GROUND_SERVICE]: toOneWayProducts(selectedGroundServices),
  });

  const [chosenAddons, setChosenAddons] = useState({
    [ProductTypes.SUPPLEMENT]: toSelectedAddon(selectedSupplements),
    [ProductTypes.FINE]: toSelectedAddon(selectedFines),
  });

  const onSingleChange = (type, e, value) => {
    const next = isNilOrEmpty(value) ? [] : [objOf('uuid', value)];
    replaceProducts(id, type, next);
  };

  const onOneWayChange = (type, e) => {
    const value = path(['target', 'value'], e);

    const [rawUuids, direction] = split('|', value);
    const uuids = split(',', rawUuids);

    const next = mergeDeepRight(oneWayProducts, { [type]: { [direction]: uuids } });

    setOneWayProducts(next);
    replaceProducts(id, type, fromOneWayProducts(type, next));
  };

  const onMarginChange = e => {
    const name = path(['target', 'name'], e);
    const value = path(['target', 'value'], e);
    const type = path(['target', 'type'], e);
    const checked = path(['target', 'checked'], e);

    updateBooking(id, { [name]: equals('checkbox', type) ? checked : value });
  };

  const onMultipleChange = (type, e) => {
    const checked = path(['target', 'checked'], e);
    const value = path(['target', 'value'], e);

    const next = mergeDeepRight(chosenAddons, { [type]: { [value]: checked } });

    setChosenAddons(next);
    replaceProducts(id, type, extractChosenAddons(type, next));
  };

  return (
    <Fragment>
      {renderExtraOptions(t, 'transfer', ProductTypes.TRANSFER, summaryOnly ? transfers : productsBothWays(transfers), {
        onSingleChange,
        summaryOnly,
        values,
      })}
      {!summaryOnly && renderOneWayProducts(t, ProductTypes.TRANSFER, transfers, { onOneWayChange })}
      {renderExtraOptions(
        t,
        'groundService',
        ProductTypes.GROUND_SERVICE,
        summaryOnly ? groundServices : productsBothWays(groundServices),
        { onSingleChange, summaryOnly, values }
      )}
      {!summaryOnly && renderOneWayProducts(t, ProductTypes.GROUND_SERVICE, groundServices, { onOneWayChange })}
      {renderExtraSelects(t, 'addon', addons, { summaryOnly, onMultipleChange, values })}
      {renderMargin(t, { onMarginChange, grandTotal, values, summaryOnly, compact })}
    </Fragment>
  );
};

SummaryFormExtras.propTypes = propTypes;
SummaryFormExtras.defaultProps = defaultProps;

export default compose(connect)(SummaryFormExtras);
