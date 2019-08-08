import React, { Fragment, useState, useCallback } from 'react';

import {
  always,
  append,
  both,
  complement,
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
  prepend,
  prop,
  propEq,
  propOr,
  reduce,
  reject,
  split,
  toPairs,
  values as Rvalues,
  when,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import { SummaryFormMargin, RadioButton, Modal, Loader, IndexSearch, Button, Summary } from 'components';

import { ProductTypes } from 'config/enums';
import { useModalState, useFetchData } from 'effects';
import { withUser } from 'hoc';
import { isString, mapWithIndex } from 'utils';

import connect from './SummaryFormExtras.state';
import { propTypes, defaultProps } from './SummaryFormExtras.props';
import {
  AddonCheckbox,
  Clear,
  ContextMenu,
  Description,
  Extra,
  ModalContent,
  OptionLabel,
  OptionOffer,
  OptionPrice,
  OptionRate,
  Title,
  TravelAgent,
  TravelAgentName,
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
    reduce((accum, [uuid, checked]) => (checked ? append(objOf('uuid', uuid), accum) : accum), [])
  )(data);

const toSelectedAddon = reduce((accum, { uuid }) => mergeDeepRight({ [uuid]: true }, accum), {});

const renderOptionOffer = (t, { offer }, i) => (
  <OptionOffer key={i + prop('uuid', offer)} data-discount={true}>
    {t('offer')}: {prop('name', offer)}
  </OptionOffer>
);

// eslint-disable-next-line
const renderOption = (t, { total, totalBeforeDiscount, offers, title, quantity = 0, rateUuid }, i) => (
  <OptionRate key={rateUuid + i}>
    {gt(quantity, 1) && `${quantity} x`} {title} (+{' '}
    <OptionPrice data-discounted={!equals(total, totalBeforeDiscount)}>{totalBeforeDiscount}</OptionPrice>
    {!equals(total, totalBeforeDiscount) && (
      <Fragment>
        {' '}
        <OptionPrice data-discount={true}>{total}</OptionPrice>
      </Fragment>
    )}
    ){!equals(total, totalBeforeDiscount) && mapWithIndex(partial(renderOptionOffer, [t]), offers)}
  </OptionRate>
);

const renderOneWayOption = (t, direction, breakdownData, i) => (
  <Fragment key={i}>
    {renderOption(t, breakdownData, i)} - {t(`labels.${direction}`)}
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
        label={mapWithIndex(partial(renderOneWayOption, [t, direction]), breakdown)}
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

const renderOptionSummary = (t, accum, { total, totalBeforeDiscount, products, breakdown, selected, ...rest }) =>
  selected
    ? append(
        <Fragment key={join(',', products)}>
          <Summary.Product>
            {map(
              ({ product, title, offers }) => (
                <span key={product}>
                  {title} {path(['meta', 'direction'], rest) && `- ${t(`labels.${path(['meta', 'direction'], rest)}`)}`}
                  {!equals(total, totalBeforeDiscount) &&
                    map(
                      ({ offer }) => (
                        <Summary.Offer key={prop('uuid', offer)} data-discount={true}>
                          {t('offer')}: {prop('name', offer)}
                        </Summary.Offer>
                      ),
                      offers
                    )}
                </span>
              ),
              breakdown
            )}
          </Summary.Product>
          <Summary.Totals>
            <Summary.Total data-discount={!equals(total, totalBeforeDiscount)}>{total}</Summary.Total>
            {!equals(total, totalBeforeDiscount) && (
              <Summary.Total data-discounted={true}>{totalBeforeDiscount}</Summary.Total>
            )}
          </Summary.Totals>
        </Fragment>,
        accum
      )
    : accum;

const renderExtraOptions = (
  t,
  type,
  productType,
  products,
  { onSingleChange, onOneWayChange, summaryOnly, values, compactEdit, onEditClick },
  optional = true
) => {
  if (summaryOnly || compactEdit) {
    const summaries = reduce(partial(renderOptionSummary, [t]), [], products);

    return (
      (!isNilOrEmpty(summaries) || compactEdit) && (
        <Summary
          title={t(`${type}_plural`)}
          actions={
            compactEdit && (
              <ContextMenu>
                <span onClick={() => onEditClick(type, productType, products)}>{t('buttons.edit')}</span>
              </ContextMenu>
            )
          }
        >
          {summaries}
        </Summary>
      )
    );
  }

  const getOption = ({ products, breakdown }) => {
    const value = join(',', map(prop('uuid'), products));
    const label = mapWithIndex(partial(renderOption, [t]), breakdown);

    return { label, value };
  };

  const options = pipe(
    productsBothWays,
    map(getOption),
    when(both(complement(isEmpty), always(optional)), prepend({ label: 'None', value: '' }))
  )(products);

  return (
    !isNilOrEmpty(options) && (
      <Extra>
        <Title>{t(`${type}_plural`)}</Title>
        <RadioButton
          name={productType}
          onChange={partial(onSingleChange, [productType])}
          options={options}
          value={isString(propOr('', productType, values)) && propOr('', productType, values)}
        />
        {!summaryOnly && renderOneWayProducts(t, productType, productsOneWay(products), { onOneWayChange })}
      </Extra>
    )
  );
};

const renderMargin = (
  t,
  { onMarginChange, grandTotal, values, summaryOnly, compact, compactEdit, onEditClick, editGuard, onEditGuard }
) => {
  return summaryOnly || compactEdit ? (
    <Summary title={t('labels.commission')}>
      <SummaryFormMargin
        key={Date.now()}
        checked={propOr(true, 'marginApplied', values)}
        compact={compact}
        compactEdit={compactEdit}
        onChange={onMarginChange}
        onEditClick={onEditClick}
        summaryOnly={summaryOnly}
        editGuard={editGuard}
        onEditGuard={onEditGuard}
        total={grandTotal}
        type={propOr('percentage', 'taMarginType', values)}
        value={propOr(0, 'taMarginAmount', values)}
      />
    </Summary>
  ) : (
    <Extra>
      <Title>{t('labels.commission')}</Title>
      <SummaryFormMargin
        checked={propOr(true, 'marginApplied', values)}
        onChange={onMarginChange}
        summaryOnly={summaryOnly}
        total={grandTotal}
        editGuard={editGuard}
        onEditGuard={onEditGuard}
        type={propOr('percentage', 'taMarginType', values)}
        value={propOr(0, 'taMarginAmount', values)}
      />
      <Description>{t('labels.addCommission')}</Description>
    </Extra>
  );
};

const renderSelect = (
  t,
  { onMultipleChange, summaryOnly, values, compactEdit },
  { products, breakdown, selected, total, totalBeforeDiscount, offers }
) => {
  const uuids = join(',', map(prop('uuid'), products));
  const checked = propOr(false, uuids, values);

  const productType = pipe(
    head,
    prop('type')
  )(products);

  return summaryOnly || compactEdit ? (
    selected && (
      <Fragment key={uuids}>
        <Summary.Product>
          {mapWithIndex(
            ({ title }, i) => (
              <span key={i}>{title}</span>
            ),
            breakdown
          )}
          {!equals(total, totalBeforeDiscount) &&
            mapWithIndex(
              ({ offer }, i) => (
                <Summary.Offer key={i} data-discount={true}>
                  {t('offer')}: {prop('name', offer)}
                </Summary.Offer>
              ),
              offers
            )}
        </Summary.Product>
        <Summary.Totals>
          <Summary.Total data-discount={!equals(total, totalBeforeDiscount)}>{total}</Summary.Total>
          {!equals(total, totalBeforeDiscount) && (
            <Summary.Total data-discounted={true}>{totalBeforeDiscount}</Summary.Total>
          )}
        </Summary.Totals>
      </Fragment>
    )
  ) : (
    <AddonCheckbox
      name={uuids}
      checked={selected || checked}
      onChange={partial(onMultipleChange, [productType])}
      key={uuids}
      label={<OptionLabel>{mapWithIndex(partial(renderOption, [t]), breakdown)}</OptionLabel>}
      value={uuids}
    />
  );
};

const renderExtraSelects = (t, type, products, { summaryOnly, onEditClick, compactEdit, ...props }) => {
  const selectElements = map(partial(renderSelect, [t, { summaryOnly, compactEdit, ...props }]), products);

  return (summaryOnly && !isEmpty(selectElements)) || compactEdit ? (
    ((summaryOnly && !isNilOrEmpty(filter(propEq('selected', true), products))) || compactEdit) && (
      <Summary
        title={t(`${type}_plural`)}
        actions={
          compactEdit && (
            <ContextMenu>
              <span onClick={() => onEditClick(type, type, products)}>{t('buttons.edit')}</span>
            </ContextMenu>
          )
        }
      >
        {selectElements}
      </Summary>
    )
  ) : (
    <Extra>
      <Title>{t(`${type}_plural`)}</Title>
      {selectElements}
    </Extra>
  );
};

const renderModal = (t, { modalOpen, modalContent, onClose }) =>
  modalOpen && (
    <Modal open={modalOpen} onClose={onClose}>
      <ModalContent>
        {modalContent}
        <Button onClick={onClose}>{t('buttons.update')}</Button>
      </ModalContent>
    </Modal>
  );

const renderTASelect = (
  t,
  { summaryOnly, compactEdit, hasTASelect, usersLoaded, getUserName, onTASelect, onTARemove, travelAgent, onEditClick }
) =>
  hasTASelect &&
  (summaryOnly || compactEdit ? (
    <Summary
      title={t('travelAgent')}
      actions={
        compactEdit && (
          <ContextMenu>
            <span onClick={() => onEditClick('travelAgent')}>{t('buttons.edit')}</span>
          </ContextMenu>
        )
      }
    >
      {getUserName(prop('uuid', travelAgent))}
    </Summary>
  ) : (
    <Extra>
      <Title>{t('travelAgent')}</Title>
      <Loader isLoading={!usersLoaded} text={t('messages.loadingUsers')}>
        <IndexSearch
          placeholder={t('labels.searchForTA')}
          indexes={['users']}
          selectors={[getUserName]}
          onClick={onTASelect}
        />
        {!isNilOrEmpty(travelAgent) && (
          <TravelAgent onClick={onTARemove}>
            <TravelAgentName>{travelAgent && getUserName(prop('uuid', travelAgent))}</TravelAgentName>{' '}
            <Clear>clear</Clear>
          </TravelAgent>
        )}
      </Loader>
    </Extra>
  ));

export const SummaryFormExtras = ({
  addons,
  compact,
  editGuard,
  fetchUsers,
  getUserName,
  grandTotal,
  groundServices,
  id,
  isSr,
  isRl,
  onEditGuard,
  replaceProducts,
  selectedFines,
  selectedGroundServices,
  selectedSupplements,
  selectedTransfers,
  summaryOnly,
  transfers,
  travelAgent,
  updateBooking,
  usersStatus,
  values,
}) => {
  const { t } = useTranslation();
  const hasTASelect = isSr && !isRl;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const usersLoaded = hasTASelect && useFetchData(usersStatus, fetchUsers, []);

  const compactEdit = !summaryOnly && compact;

  const [oneWayProducts, setOneWayProducts] = useState({
    [ProductTypes.TRANSFER]: toOneWayProducts(selectedTransfers),
    [ProductTypes.GROUND_SERVICE]: toOneWayProducts(selectedGroundServices),
  });

  const [chosenAddons, setChosenAddons] = useState({
    [ProductTypes.SUPPLEMENT]: toSelectedAddon(selectedSupplements),
    [ProductTypes.FINE]: toSelectedAddon(selectedFines),
  });

  const { modalOpen, onModalOpen, onModalClose, setModalContext, modalContext } = useModalState();

  const onSingleChange = useCallback(
    (type, e, value) => {
      const next = isNilOrEmpty(value) ? [] : [objOf('uuid', value)];
      replaceProducts(id, type, next);
    },
    [id, replaceProducts]
  );

  const onOneWayChange = useCallback(
    (type, e) => {
      const value = path(['target', 'value'], e);

      const [rawUuids, direction] = split('|', value);
      const uuids = split(',', rawUuids);

      const next = mergeDeepRight(oneWayProducts, { [type]: { [direction]: uuids } });

      setOneWayProducts(next);
      replaceProducts(id, type, fromOneWayProducts(type, next));
    },
    [id, oneWayProducts, replaceProducts]
  );

  const onMarginChange = useCallback(
    e => {
      const name = path(['target', 'name'], e);
      const value = path(['target', 'value'], e);
      const type = path(['target', 'type'], e);
      const checked = path(['target', 'checked'], e);

      updateBooking(id, { [name]: equals('checkbox', type) ? checked : value });
    },
    [id, updateBooking]
  );

  const onMultipleChange = useCallback(
    (type, e) => {
      const checked = path(['target', 'checked'], e);
      const value = path(['target', 'value'], e);

      const next = mergeDeepRight(chosenAddons, { [type]: { [value]: checked } });

      setChosenAddons(next);
      replaceProducts(id, type, extractChosenAddons(type, next));
    },
    [chosenAddons, id, replaceProducts]
  );

  const onEditClick = useCallback(
    type => {
      if (editGuard) {
        return onEditGuard();
      }

      setModalContext(type);
      onModalOpen();
    },
    [editGuard, onEditGuard, onModalOpen, setModalContext]
  );

  const onClose = useCallback(() => {
    setModalContext(undefined);
    onModalClose();
  }, [onModalClose, setModalContext]);

  const onTASelect = useCallback(
    ({ id: travelAgentUserUuid }) => {
      updateBooking(id, { travelAgentUserUuid });
    },
    [id, updateBooking]
  );

  const onTARemove = useCallback(() => {
    updateBooking(id, { travelAgentUserUuid: null });
  }, [id, updateBooking]);

  const optionsProps = {
    compact,
    onOneWayChange,
    onSingleChange,
    summaryOnly,
    values,
    compactEdit,
    onEditClick,
    editGuard,
    onEditGuard,
  };

  let modalContent = null;

  switch (modalContext) {
    case 'addon':
      modalContent = renderExtraSelects(t, 'addon', addons, { onMultipleChange, values });
      break;
    case 'margin':
      modalContent = renderMargin(t, { onMarginChange, grandTotal, values });
      break;
    case 'transfer':
      modalContent = renderExtraOptions(t, 'transfer', ProductTypes.TRANSFER, transfers, {
        onOneWayChange,
        onSingleChange,
        values,
      });
      break;
    case 'groundService':
      modalContent = renderExtraSelects(t, 'groundService', groundServices, { onMultipleChange, values });
      break;
    case 'travelAgent':
      modalContent = renderTASelect(t, { hasTASelect, usersLoaded, getUserName, onTASelect, onTARemove, travelAgent });
      break;
    default:
      modalContent = '';
  }

  return (
    <Fragment>
      {renderExtraOptions(t, 'transfer', ProductTypes.TRANSFER, transfers, optionsProps, false)}
      {renderExtraSelects(t, 'groundService', groundServices, {
        summaryOnly,
        onMultipleChange,
        values,
        compactEdit,
        onEditClick,
      })}
      {renderExtraSelects(t, 'addon', addons, { summaryOnly, onMultipleChange, values, compactEdit, onEditClick })}
      {renderTASelect(t, {
        summaryOnly,
        compactEdit,
        hasTASelect,
        usersLoaded,
        getUserName,
        onTASelect,
        onTARemove,
        travelAgent,
        onEditClick,
      })}
      {renderMargin(t, {
        onMarginChange,
        grandTotal,
        values,
        summaryOnly,
        compact,
        compactEdit,
        onEditClick,
        editGuard,
        onEditGuard,
      })}
      {renderModal(t, { modalOpen, modalContent, onClose, modalContext })}
    </Fragment>
  );
};

SummaryFormExtras.propTypes = propTypes;
SummaryFormExtras.defaultProps = defaultProps;

export default compose(
  connect,
  withUser
)(SummaryFormExtras);
