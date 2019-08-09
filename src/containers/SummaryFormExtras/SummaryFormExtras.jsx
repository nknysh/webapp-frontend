import React, { Fragment, useState, useCallback } from 'react';

import {
  always,
  append,
  both,
  complement,
  compose,
  equals,
  filter,
  gt,
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
  split,
  values as Rvalues,
  when,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';

import { SummaryFormMargin, RadioButton, Modal, Loader, IndexSearch, Button, Summary, ToolTip } from 'components';

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
import {
  productsBothWays,
  productsOneWay,
  fromOneWayProducts,
  toOneWayProducts,
  extractChosenAddons,
  toSelectedAddon,
  groupByProductsUuid,
} from './SummaryFormExtras.utils';

const renderAddonCheckbox = props => <AddonCheckbox {...props} />;

const renderSummaryArea = ({ key, children, total, totalBeforeDiscount }) => (
  <Fragment key={key}>
    <Summary.Product>{children}</Summary.Product>
    <Summary.Totals>
      <Summary.Total data-discount={!equals(total, totalBeforeDiscount)}>{total}</Summary.Total>
      {!equals(total, totalBeforeDiscount) && (
        <Summary.Total data-discounted={true}>{totalBeforeDiscount}</Summary.Total>
      )}
    </Summary.Totals>
  </Fragment>
);

const renderExtra = ({ title, children }) => (
  <Extra>
    <Title>{title}</Title>
    {children}
  </Extra>
);

const wrapOfferToolTip = ({ name, furtherInformation }) =>
  !isNilOrEmpty(furtherInformation) ? (
    <ToolTip helpText={true} label={name}>
      {furtherInformation}
    </ToolTip>
  ) : (
    name
  );

const renderOptionOffer = (t, { offer }, i) => (
  <OptionOffer key={i + prop('uuid', offer)} data-discount={true}>
    {t('offer')}: {wrapOfferToolTip(offer)}
  </OptionOffer>
);

const wrapProductToolTip = (label, { meta }) =>
  propEq(isNilOrEmpty, 'description', meta) ? (
    label
  ) : (
    <ToolTip helpText={true} label={label}>
      {prop('description', meta)}
    </ToolTip>
  );

// eslint-disable-next-line
const renderOption = (t, { total, totalBeforeDiscount, offers, title, product, quantity = 0, rateUuid }, i) => (
  <OptionRate key={rateUuid + i}>
    {gt(quantity, 1) && `${quantity} x`} {wrapProductToolTip(title, product)} (+{' '}
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

    return renderAddonCheckbox({
      name: productType,
      checked: selected,
      onChange: partial(onOneWayChange, [productType]),
      key: identifier,
      label: mapWithIndex(partial(renderOneWayOption, [t, direction]), breakdown),
      value: identifier,
    });
  }, products);

const renderOneWayProducts = (t, productType, products, props) =>
  pipe(
    productsOneWay,
    groupByProductsUuid,
    mapObjIndexed(partial(renderOneWayProduct, [t, productType, props])),
    Rvalues
  )(products);

const renderSummaryOffer = (t, { offer }, i) => (
  <Summary.Offer key={i || prop('uuid', offer)} data-discount={true}>
    {t('offer')}: {wrapOfferToolTip(offer)}
  </Summary.Offer>
);

const renderOptionSummary = (t, accum, { total, totalBeforeDiscount, products, breakdown, selected, ...props }) =>
  selected
    ? append(
        renderSummaryArea({
          key: join(',', products),
          total,
          totalBeforeDiscount,
          children: (
            <Fragment>
              {map(
                ({ product, title, offers }) => (
                  <span key={product}>
                    {wrapProductToolTip(title, product)}{' '}
                    {path(['meta', 'direction'], props) && `- ${t(`labels.${path(['meta', 'direction'], props)}`)}`}
                    {!equals(total, totalBeforeDiscount) && map(partial(renderSummaryOffer, [t]), offers)}
                  </span>
                ),
                breakdown
              )}
            </Fragment>
          ),
        }),
        accum
      )
    : accum;

const getOption = (t, { products, breakdown }) => {
  const value = join(',', map(prop('uuid'), products));
  const label = mapWithIndex(partial(renderOption, [t]), breakdown);

  return { label, value };
};

const renderExtraOptions = (
  t,
  type,
  productType,
  products,
  { onSingleChange, onOneWayChange, summaryOnly, values, compactEdit, onEditClick },
  optional = true
) => {
  if (isNilOrEmpty(products)) return;

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

  const options = pipe(
    productsBothWays,
    map(partial(getOption, [t])),
    when(both(complement(isEmpty), always(optional)), prepend({ label: 'None', value: '' }))
  )(products);

  return (
    !isNilOrEmpty(options) &&
    renderExtra({
      title: t(`${type}_plural`),
      children: (
        <Fragment>
          <RadioButton
            name={productType}
            onChange={partial(onSingleChange, [productType])}
            options={options}
            value={isString(propOr('', productType, values)) && propOr('', productType, values)}
          />
          {!summaryOnly && renderOneWayProducts(t, productType, productsOneWay(products), { onOneWayChange })}
        </Fragment>
      ),
    })
  );
};

const renderMargin = (
  t,
  {
    onMarginChange,
    grandTotal,
    values,
    summaryOnly,
    compact,
    compactEdit,
    onEditClick,
    editGuard,
    onEditGuard,
    canBook,
  }
) => {
  if (!canBook) return;

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
    renderExtra({
      title: t('labels.commission'),
      children: (
        <Fragment>
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
        </Fragment>
      ),
    })
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

  return summaryOnly || compactEdit
    ? selected &&
        renderSummaryArea({
          key: uuids,
          total,
          totalBeforeDiscount,
          children: (
            <Fragment>
              {mapWithIndex(
                ({ title, product }, i) => (
                  <span key={i}>{wrapProductToolTip(title, product)}</span>
                ),
                breakdown
              )}
              {!equals(total, totalBeforeDiscount) && mapWithIndex(partial(renderSummaryOffer, [t]), offers)}
            </Fragment>
          ),
        })
    : renderAddonCheckbox({
        name: uuids,
        checked: selected || checked,
        onChange: partial(onMultipleChange, [productType]),
        key: uuids,
        label: <OptionLabel>{mapWithIndex(partial(renderOption, [t]), breakdown)}</OptionLabel>,
        value: uuids,
      });
};

const renderExtraSelects = (t, type, products, { summaryOnly, onEditClick, compactEdit, ...props }) => {
  if (isNilOrEmpty(products)) return;

  const selectElements = map(partial(renderSelect, [t, { summaryOnly, compactEdit, ...props }]), products);

  return (summaryOnly && !isEmpty(selectElements)) || compactEdit
    ? ((summaryOnly && !isNilOrEmpty(filter(propEq('selected', true), products))) || compactEdit) && (
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
    : renderExtra({ title: t(`${type}_plural`), children: selectElements });
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
    renderExtra({
      title: t('travelAgent'),
      children: (
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
      ),
    })
  ));

export const SummaryFormExtras = ({
  addons,
  canBook,
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
        canBook,
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
