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
  propSatisfies,
  reduce,
  split,
  values as Rvalues,
  flatten,
  when,
} from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { RadioButton, Modal, Loader, Button, ToolTip } from '@pure-escapes/webapp-ui-components';

import { ProductTypes } from 'config/enums';

import { SummaryFormMargin, IndexSearch, Summary, AggregateTotalsBreakdown } from 'components';
import { useModalState, useFetchData } from 'effects';
import { withUser } from 'hoc';
import { isString, mapWithIndex, formatPrice, filterByObjectProperties } from 'utils';
import { Icon } from '@material-ui/core';

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
  CollapseToggle,
  CollapseTitle,
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

const renderSummaryArea = (t, { currencyCode, key, children, total, totalBeforeDiscount, isOnRequest }) => (
  <Fragment key={key}>
    <Summary.Product>{children}</Summary.Product>
    <Summary.Totals>
      {isOnRequest ? (
        <Summary.Total>{t('labels.onRequest')}</Summary.Total>
      ) : (
        <Fragment>
          <Summary.Total data-discount={!equals(total, totalBeforeDiscount)}>
            {`${currencyCode}${formatPrice(total)}`}
          </Summary.Total>
          {!equals(total, totalBeforeDiscount) && (
            <Summary.Total data-discounted={true}>{`${currencyCode}${formatPrice(totalBeforeDiscount)}`}</Summary.Total>
          )}
        </Fragment>
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
  propSatisfies(isNilOrEmpty, 'description', meta) ? (
    label
  ) : (
    <ToolTip helpText={true} label={label}>
      {prop('description', meta)}
    </ToolTip>
  );

const renderOption = (
  t,
  { currencyCode },
  { total, totalBeforeDiscount, offers, title, product, quantity = 0, rateUuid, isOnRequest },
  i
) => (
  <OptionRate key={rateUuid + i}>
    {gt(quantity, 1) && `${quantity} x`} {wrapProductToolTip(title, product)}
    {isOnRequest ? (
      `(${t('labels.onRequest')})`
    ) : (
      <Fragment>
        {' '}
        (+
        <OptionPrice data-discounted={!equals(total, totalBeforeDiscount)}>
          {`${currencyCode}${formatPrice(totalBeforeDiscount)}`}
        </OptionPrice>
        {!equals(total, totalBeforeDiscount) && (
          <Fragment>
            {' '}
            <OptionPrice data-discount={true}>{`${currencyCode}${total}`}</OptionPrice>
          </Fragment>
        )}
        )
      </Fragment>
    )}
    {!equals(total, totalBeforeDiscount) && mapWithIndex(partial(renderOptionOffer, [t]), offers)}
  </OptionRate>
);

const renderOneWayOption = (t, direction, currencyCode, breakdownData, i) => (
  <Fragment key={i}>
    {renderOption(t, { currencyCode }, breakdownData, i)} - {t(`labels.${direction}`)}
  </Fragment>
);

const renderOneWayProduct = (t, productType, { onOneWayChange, currencyCode }, products, uuids) =>
  map(({ breakdown, meta: { direction }, selected }) => {
    const identifier = join('|', [uuids, direction]);

    return renderAddonCheckbox({
      name: productType,
      checked: selected,
      onChange: partial(onOneWayChange, [productType]),
      key: identifier,
      label: mapWithIndex(partial(renderOneWayOption, [t, direction, currencyCode]), breakdown),
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

const renderOptionSummary = (
  t,
  { currencyCode },
  accum,
  { total, totalBeforeDiscount, products, breakdown, selected, isOnRequest, ...props }
) =>
  selected
    ? append(
        renderSummaryArea(t, {
          key: join(',', products),
          currencyCode,
          total,
          totalBeforeDiscount,
          isOnRequest,
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

const getOption = (t, props, { products, breakdown }) => {
  const value = join(',', map(prop('uuid'), products));
  const label = mapWithIndex(partial(renderOption, [t, props]), breakdown);

  return { label, value };
};

const renderTransferOptions = (
  t,
  type,
  productType,
  products,
  { onSingleChange, onOneWayChange, summaryOnly, values, compactEdit, onEditClick, currencyCode },
  optional = true,
  renderTitle = true
) => {
  if (isNilOrEmpty(products)) return;

  if (summaryOnly || compactEdit) {
    const summaries = reduce(partial(renderOptionSummary, [t, { currencyCode }]), [], products);

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

  // given some products, convert them to options to be used in radio button or checkbox rendering
  const convertProductsToOptions = pipe(
    map(partial(getOption, [t, { currencyCode }])),
    when(both(complement(isEmpty), always(optional)), prepend({ label: 'None', value: '' }))
  );

  // get all the options for transfers that are both ways
  const bothWayOptions = pipe(
    productsBothWays,
    convertProductsToOptions
  )(products);

  // get all the options for transfers that are 1 way
  const oneWayOptions = pipe(
    productsOneWay,
    convertProductsToOptions
  )(products);

  return (
    // `renderExtra` if we have some return transfers OR some one way transfers
    (!isNilOrEmpty(bothWayOptions) || !isNilOrEmpty(oneWayOptions)) &&
    renderExtra({
      title: renderTitle ? t(`${type}_plural`) : null,
      children: (
        <Fragment>
          <RadioButton
            name={productType}
            onChange={partial(onSingleChange, [productType])}
            options={bothWayOptions} // `RadioButton` should only render both way transfers
            value={isString(propOr('', productType, values)) && propOr('', productType, values)}
          />
          {!summaryOnly &&
            renderOneWayProducts(t, productType, productsOneWay(products), { onOneWayChange, currencyCode })}
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
    currencyCode,
  }
) => {
  if (!canBook) return;
  return summaryOnly || compactEdit ? (
    <Summary title={t('labels.commission')}>
      <SummaryFormMargin
        checked={propOr(true, 'marginApplied', values)}
        compact={compact}
        compactEdit={compactEdit}
        currencyCode={currencyCode}
        editGuard={editGuard}
        key={Date.now()}
        onChange={onMarginChange}
        onEditClick={onEditClick}
        onEditGuard={onEditGuard}
        summaryOnly={summaryOnly}
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
            currencyCode={currencyCode}
            editGuard={editGuard}
            onChange={onMarginChange}
            onEditGuard={onEditGuard}
            summaryOnly={summaryOnly}
            total={grandTotal}
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
  { onMultipleChange, summaryOnly, values, compactEdit, currencyCode },
  { products, breakdown, selected, total, totalBeforeDiscount, offers, isOnRequest }
) => {
  const uuids = join(',', map(prop('uuid'), products));
  const checked = propOr(false, uuids, values);

  const productType = pipe(
    head,
    prop('type')
  )(products);

  return summaryOnly || compactEdit
    ? selected &&
        renderSummaryArea(t, {
          currencyCode,
          key: uuids,
          total,
          totalBeforeDiscount,
          isOnRequest,
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
        currencyCode,
        name: uuids,
        checked: selected || checked,
        onChange: partial(onMultipleChange, [productType]),
        key: uuids,
        label: <OptionLabel>{mapWithIndex(partial(renderOption, [t, { currencyCode }]), breakdown)}</OptionLabel>,
        value: uuids,
      });
};

const renderExtraSelects = (
  t,
  type,
  products,
  { summaryOnly, onEditClick, compactEdit, ...props },
  renderTitle = true
) => {
  if (isNilOrEmpty(products)) return;

  const selectElements = map(partial(renderSelect, [t, { summaryOnly, compactEdit, ...props }]), products);

  return (summaryOnly && !isEmpty(selectElements)) || compactEdit
    ? ((summaryOnly && !isNilOrEmpty(filter(propEq('selected', true), products))) || compactEdit) && (
        <Summary
          title={renderTitle === true ? t(`${type}_plural`) : null}
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
  booking,
  canBook,
  compact,
  currencyCode,
  editGuard,
  fetchUsers,
  getUserName,
  grandTotal,
  groundServices,
  id,
  isRl,
  isSr,
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
  isTransferSectionCollapsed,
  isGroundServicesSectionCollapsed,
  isAddonsSectionCollapsed,
  setIsBookingSummarySectionCollapsed,
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
    (e, marginType, marginValue) => {
      const name = path(['target', 'name'], e);
      const value = path(['target', 'value'], e);
      const type = path(['target', 'type'], e);
      const checked = path(['target', 'checked'], e);

      const payload = equals('checkbox', type)
        ? { [name]: checked }
        : { taMarginType: marginType, taMarginAmount: marginValue };

      updateBooking(id, payload);
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
    currencyCode,
    onOneWayChange,
    onSingleChange,
    summaryOnly,
    values,
    compactEdit,
    onEditClick,
    editGuard,
    onEditGuard,
  };

  const selectedTransfersBreakdown = useCallback(() => {
    const transfersFormatted = flatten(
      transfers.map(transfer => {
        return (transfer.products = transfer.products.map(product => {
          return {
            ...product,
            direction: transfer.meta && transfer.meta.direction ? transfer.meta.direction : undefined,
            nameWithDirection: `${product.name} (${
              transfer.meta && transfer.meta.direction ? transfer.meta.direction : 'Return'
            })`,
          };
        }));
      })
    );

    const selectedTransferProducts = filterByObjectProperties(transfersFormatted, selectedTransfers, [
      'uuid',
      'direction',
    ]);

    if (selectedTransferProducts.length >= 1) {
      return selectedTransferProducts.map(stp => stp.nameWithDirection).join(' & ');
    }

    return 'None selected';
  }, [selectedTransfers, transfers]);

  const selectedGroundServicesBreakdown = useCallback(() => {
    const selectedGroundServiceProducts = filterByObjectProperties(
      flatten(groundServices.map(g => g.products)),
      selectedGroundServices,
      ['uuid']
    );

    if (selectedGroundServiceProducts.length >= 1) {
      return selectedGroundServiceProducts.map(stp => stp.name).join(' & ');
    }

    return 'None selected';
  }, [selectedGroundServices, groundServices]);

  const selectedAddonsBreakdown = useCallback(() => {
    const selectedAddons = flatten([selectedFines, selectedSupplements]);

    const selectedAddonProducts = filterByObjectProperties(flatten(addons.map(a => a.products)), selectedAddons, [
      'uuid',
    ]);

    if (selectedAddonProducts.length >= 1) {
      return selectedAddonProducts.map(stp => stp.name).join(' & ');
    }

    return 'None selected';
  }, [selectedFines, selectedSupplements, addons]);

  const TransfersWrapper = () => {
    const breakdown = selectedTransfersBreakdown();

    return (
      <React.Fragment>
        <CollapseTitle>
          <span>
            <label>
              <strong>{t('labels.transfers')}</strong>
            </label>
            <br />
            <label>{breakdown}</label>
          </span>

          <CollapseToggle
            type="button"
            onClick={() =>
              setIsBookingSummarySectionCollapsed({
                type: 'transfers',
                value: !isTransferSectionCollapsed,
              })
            }
          >
            <Icon>{isTransferSectionCollapsed === false ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</Icon>
          </CollapseToggle>
        </CollapseTitle>

        {isTransferSectionCollapsed === false &&
          renderTransferOptions(t, 'transfer', ProductTypes.TRANSFER, transfers, optionsProps, false, false)}
      </React.Fragment>
    );
  };

  const GroundServicesWrapper = () => {
    const breakdown = selectedGroundServicesBreakdown();
    return (
      <React.Fragment>
        <CollapseTitle>
          <span>
            <label>
              <strong>{t('labels.groundServices')}</strong>
            </label>
            <br />
            <label>{breakdown}</label>
          </span>
          <CollapseToggle
            type="button"
            onClick={() =>
              setIsBookingSummarySectionCollapsed({
                type: 'ground_services',
                value: !isGroundServicesSectionCollapsed,
              })
            }
          >
            <Icon>{isGroundServicesSectionCollapsed === false ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</Icon>
          </CollapseToggle>
        </CollapseTitle>

        {isGroundServicesSectionCollapsed === false &&
          renderExtraSelects(
            t,
            'groundService',
            groundServices,
            {
              currencyCode,
              summaryOnly,
              onMultipleChange,
              values,
              compactEdit,
              onEditClick,
            },
            false
          )}
      </React.Fragment>
    );
  };

  const AddonsWrapper = () => {
    const breakdown = selectedAddonsBreakdown();
    return (
      <React.Fragment>
        <CollapseTitle>
          <span>
            <label>
              <strong>{t('labels.addons')}</strong>
            </label>
            <br />
            <label>{breakdown}</label>
          </span>
          <CollapseToggle
            type="button"
            onClick={() =>
              setIsBookingSummarySectionCollapsed({
                type: 'addons',
                value: !isAddonsSectionCollapsed,
              })
            }
          >
            <Icon>{isAddonsSectionCollapsed === false ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</Icon>
          </CollapseToggle>
        </CollapseTitle>

        {isAddonsSectionCollapsed === false &&
          renderExtraSelects(
            t,
            'addon',
            addons,
            {
              currencyCode,
              summaryOnly,
              onMultipleChange,
              values,
              compactEdit,
              onEditClick,
            },
            false
          )}
      </React.Fragment>
    );
  };

  let modalContent = null;

  switch (modalContext) {
    case 'addon':
      modalContent = renderExtraSelects(t, 'addon', addons, { currencyCode, onMultipleChange, values });
      break;
    case 'margin':
      modalContent = renderMargin(t, { currencyCode, onMarginChange, grandTotal, values });
      break;
    case 'transfer':
      modalContent = renderTransferOptions(t, 'transfer', ProductTypes.TRANSFER, transfers, {
        currencyCode,
        onOneWayChange,
        onSingleChange,
        values,
      });
      break;
    case 'groundService':
      modalContent = renderExtraSelects(t, 'groundService', groundServices, { currencyCode, onMultipleChange, values });
      break;
    case 'travelAgent':
      modalContent = renderTASelect(t, {
        currencyCode,
        hasTASelect,
        usersLoaded,
        getUserName,
        onTASelect,
        onTARemove,
        travelAgent,
      });
      break;
    default:
      modalContent = '';
  }

  return (
    <Fragment>
      {transfers.length >= 1 && <TransfersWrapper />}
      {groundServices.length >= 1 && <GroundServicesWrapper />}
      {addons.length >= 1 && <AddonsWrapper />}
      {booking && booking.breakdown && booking.breakdown.aggregateTotals && (
        <React.Fragment>
          <hr />
          <label>
            <strong>{t('labels.totalCostBreakdown')}</strong>
          </label>
          <AggregateTotalsBreakdown
            translate={t}
            currencyCode={currencyCode}
            aggregateTotals={booking.breakdown.aggregateTotals}
          />
          <hr />
        </React.Fragment>
      )}
      {renderTASelect(t, {
        currencyCode,
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
        currencyCode,
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
      {renderModal(t, { currencyCode, modalOpen, modalContent, onClose, modalContext })}
    </Fragment>
  );
};

SummaryFormExtras.propTypes = propTypes;
SummaryFormExtras.defaultProps = defaultProps;

export default compose(
  connect,
  withUser
)(SummaryFormExtras);
