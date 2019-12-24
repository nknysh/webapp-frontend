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
import { RadioButton, Loader, Button, ToolTip } from '@pure-escapes/webapp-ui-components';
import Modal from 'pureUi/Modal';

import { ProductTypes } from 'config/enums';

import { SummaryFormMargin, IndexSearch, Summary, DisplayTotalsBreakdown } from 'components';
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
  InformationIcon,
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

const InfoIcon = ({ modalHeader, modalText }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <React.Fragment>
      <InformationIcon
        onClick={e => {
          e.preventDefault();
          setIsModalOpen(true);
        }}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          {modalHeader}
          {modalText}
        </Modal>
      )}
    </React.Fragment>
  );
};
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

const renderInlinePrice = (translate, currencyCode, total, totalBeforeDiscount, isOnRequestOrPartiallyOnRequest) => {
  if (isOnRequestOrPartiallyOnRequest === true) {
    return <label>{translate('labels.priceAvailableOnRequest')}</label>;
  }
  if (total !== totalBeforeDiscount) {
    return (
      <React.Fragment>
        <label data-discounted={true}>
          {currencyCode}
          {formatPrice(total)}
        </label>
        <label data-secondary={true}>
          {currencyCode}
          {formatPrice(totalBeforeDiscount)}
        </label>
      </React.Fragment>
    );
  } else {
    return (
      <label>
        {currencyCode}
        {formatPrice(total)}
      </label>
    );
  }
};

const renderTransferOptionsSimple = (
  translate,
  selectedTransferOptions,
  transferOptions,
  updateTransferAction,
  hotelUuid,
  currencyCode
) => {
  const simpleTransfers = transferOptions.map(t => ({
    name: t.products[0].name,
    uuid: t.products[0].uuid,
    direction: t.meta && t.meta.direction && t.meta.direction ? t.meta.direction : undefined,
    description: t.products[0].meta.description,
    priceFormatted: renderInlinePrice(
      translate,
      currencyCode,
      t.total,
      t.totalBeforeDiscount,
      t.isOnRequestOrPartiallyOnRequest
    ),
  }));

  const handleRadioClick = e => {
    updateTransferAction(
      {
        uuid: e.target.value,
        direction: undefined,
      },
      hotelUuid
    );
  };

  const handleCheckboxClick = to => {
    updateTransferAction(
      {
        uuid: to.uuid,
        direction: to.direction,
      },
      hotelUuid
    );
  };

  const bothWayTransfersOptions = simpleTransfers
    .filter(t => t.direction === undefined)
    .map(t => ({
      value: t.uuid,
      label: (
        <label>
          {t.name} {t.priceFormatted}{' '}
          <InfoIcon
            modalHeader={
              <h2>
                {t.name} <small>{t.priceFormatted}</small>
              </h2>
            }
            modalText={<p>{t.description}</p>}
          />
        </label>
      ),
    }));

  const bothWayTransferMarkup = (
    <React.Fragment>
      <RadioButton
        onChange={e => handleRadioClick(e)}
        options={bothWayTransfersOptions}
        value={selectedTransferOptions[0] ? selectedTransferOptions[0].uuid : undefined}
      />
    </React.Fragment>
  );

  const oneWayTransfersOptions = simpleTransfers.filter(t => t.direction !== undefined);
  const oneWayTransfersMarkup = (
    <React.Fragment>
      {oneWayTransfersOptions.map(to => {
        const isChecked = selectedTransferOptions.some(sto => sto.uuid === to.uuid && sto.direction === to.direction);
        return (
          <AddonCheckbox
            onChange={() => handleCheckboxClick(to)}
            key={`${to.name}/${to.direction}`}
            checked={isChecked}
            label={
              <label>
                {to.name} ({to.direction}) {to.priceFormatted}{' '}
                <InfoIcon
                  modalHeader={
                    <h2>
                      {to.name} <small>{to.priceFormatted}</small>
                    </h2>
                  }
                  modalText={<p>{to.description}</p>}
                />
              </label>
            }
          />
        );
      })}
    </React.Fragment>
  );

  return (
    <div>
      {bothWayTransfersOptions && (
        <React.Fragment>
          <label>Return Transfers</label>
          {bothWayTransferMarkup}
        </React.Fragment>
      )}
      {bothWayTransfersOptions && oneWayTransfersOptions && <hr />}
      {oneWayTransfersOptions && (
        <React.Fragment>
          <label>One Way Transfers</label>
          {oneWayTransfersMarkup}
        </React.Fragment>
      )}
    </div>
  );
};

const renderGroundServices = (
  translate,
  currencyCode,
  selectedGroundServices,
  groundServices,
  updateGroundServiceAction,
  hotelUuid
) => {
  return (
    <React.Fragment>
      {groundServices.map(gs => {
        const gsProduct = gs.products[0];
        const isChecked = selectedGroundServices.some(sgs => sgs.uuid === gsProduct.uuid);

        return (
          <AddonCheckbox
            onChange={() => updateGroundServiceAction(gsProduct, hotelUuid)}
            key={`${gsProduct.uuid}/${gsProduct.name}`}
            checked={isChecked}
            label={
              <React.Fragment>
                <label>
                  {gsProduct.name}{' '}
                  {renderInlinePrice(
                    translate,
                    currencyCode,
                    gs.total,
                    gs.totalBeforeDiscount,
                    gs.isOnRequestOrPartiallyOnRequest
                  )}
                </label>
                <InfoIcon
                  modalHeader={
                    <h2>
                      {gsProduct.name}{' '}
                      <small>
                        {renderInlinePrice(
                          translate,
                          currencyCode,
                          gs.total,
                          gs.totalBeforeDiscount,
                          gs.isOnRequestOrPartiallyOnRequest
                        )}
                      </small>
                    </h2>
                  }
                  modalText={<p>{gsProduct.meta.description}</p>}
                />
              </React.Fragment>
            }
          />
        );
      })}
    </React.Fragment>
  );
};

const renderAddons = (
  translate,
  currencyCode,
  selectedSupplements,
  selectedFines,
  availableSupplements,
  availableFines,
  updateSupplementAction,
  updateFineAction,
  hotelUuid
) => {
  const supplementMarkup = (
    <React.Fragment>
      {availableSupplements.map(sp => {
        const supplementProduct = sp.products[0];
        const isChecked = selectedSupplements.some(sgs => sgs.uuid === supplementProduct.uuid);
        return (
          <AddonCheckbox
            onChange={() => updateSupplementAction(supplementProduct, hotelUuid)}
            key={`${supplementProduct.uuid}/${supplementProduct.name}`}
            checked={isChecked}
            label={
              <label>
                {supplementProduct.name}{' '}
                {renderInlinePrice(
                  translate,
                  currencyCode,
                  sp.total,
                  sp.totalBeforeDiscount,
                  sp.isOnRequestOrPartiallyOnRequest
                )}
                <InfoIcon
                  modalHeader={
                    <h2>
                      {supplementProduct.name}{' '}
                      <small>
                        {renderInlinePrice(
                          translate,
                          currencyCode,
                          sp.total,
                          sp.totalBeforeDiscount,
                          sp.isOnRequestOrPartiallyOnRequest
                        )}
                      </small>
                    </h2>
                  }
                  modalText={<p>{supplementProduct.meta.description}</p>}
                />
              </label>
            }
          />
        );
      })}
    </React.Fragment>
  );

  const fineMarkup = (
    <React.Fragment>
      {availableFines.map(fp => {
        const fineProduct = fp.products[0];
        const isChecked = selectedFines.some(sgs => sgs.uuid === fineProduct.uuid);
        return (
          <AddonCheckbox
            onChange={() => updateFineAction(fineProduct, hotelUuid)}
            key={`${fineProduct.uuid}/${fineProduct.name}`}
            checked={isChecked}
            label={
              <label>
                {fineProduct.name}{' '}
                {renderInlinePrice(
                  translate,
                  currencyCode,
                  fp.total,
                  fp.totalBeforeDiscount,
                  fp.isOnRequestOrPartiallyOnRequest
                )}
                <InfoIcon
                  modalHeader={
                    <h2>
                      {fineProduct.name}{' '}
                      <small>
                        {renderInlinePrice(
                          translate,
                          currencyCode,
                          fp.total,
                          fp.totalBeforeDiscount,
                          fp.isOnRequestOrPartiallyOnRequest
                        )}
                      </small>
                    </h2>
                  }
                  modalText={<p>{fineProduct.meta.description}</p>}
                />
              </label>
            }
          />
        );
      })}
    </React.Fragment>
  );

  return (
    <React.Fragment>
      {supplementMarkup}
      {fineMarkup}
    </React.Fragment>
  );
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
    summaryOnly,
    compact,
    compactEdit,
    onEditClick,
    editGuard,
    onEditGuard,
    canBook,
    currencyCode,
    isTAMarginApplied,
    taMarginType,
    taMarginAmount,
  }
) => {
  if (!canBook) return;
  return summaryOnly || compactEdit ? (
    <Summary title={t('labels.yourCommission')}>
      <SummaryFormMargin
        checked={isTAMarginApplied}
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
        type={taMarginType}
        value={taMarginAmount}
      />
    </Summary>
  ) : (
    renderExtra({
      title: t('labels.commission'),
      children: (
        <Fragment>
          <SummaryFormMargin
            checked={isTAMarginApplied}
            currencyCode={currencyCode}
            editGuard={editGuard}
            onChange={onMarginChange}
            onEditGuard={onEditGuard}
            summaryOnly={summaryOnly}
            total={grandTotal}
            type={taMarginType}
            value={taMarginAmount}
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
  {
    summaryOnly,
    compactEdit,
    hasTASelect,
    travelAgentsLoaded,
    getTravelAgentName,
    onTASelect,
    onTARemove,
    travelAgent,
    onEditClick,
  }
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
      {getTravelAgentName(prop('uuid', travelAgent))}
    </Summary>
  ) : (
    renderExtra({
      title: t('travelAgent'),
      children: (
        <Loader isLoading={!travelAgentsLoaded} text={t('messages.loadingUsers')}>
          <IndexSearch
            placeholder={t('labels.searchForTA')}
            indexes={['travelAgents']}
            selectors={[getTravelAgentName]}
            onClick={onTASelect}
          />
          {!isNilOrEmpty(travelAgent) && (
            <TravelAgent onClick={onTARemove}>
              <TravelAgentName>{travelAgent && getTravelAgentName(prop('uuid', travelAgent))}</TravelAgentName>{' '}
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
  fetchTravelAgents,
  getTravelAgentName,
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
  travelAgentsStatus,
  values,
  isTransferSectionCollapsed,
  isGroundServicesSectionCollapsed,
  isAddonsSectionCollapsed,
  setIsBookingSummarySectionCollapsed,
  updateTransferAction,
  selectedTransfersBreakdown,
  updateGroundServiceAction,
  updateSupplementAction,
  updateFineAction,
  availableSupplements,
  availableFines,
  updateTAMarginTypeAction,
  updateTAMarginAmountAction,
  isTAMarginApplied,
  updateIsTAMarginAppliedAction,
  taMarginType,
  taMarginAmount,
  currentCountry,
  updateBookingTravelAgentUserIdAction,
}) => {
  const { t } = useTranslation();

  // TODO: You absolutely SHOULD NOT use hooks conditionally. So this is broken, we've just not
  // hit the bug yet.
  const hasTASelect = isSr && !isRl;
  const travelAgentsLoaded =
    hasTASelect &&
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetchData(
      travelAgentsStatus,
      () => fetchTravelAgents(currentCountry ? { actingCountryCode: currentCountry } : {}),
      []
    );

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
    (e, marginType, marginValue, shouldUpdateCheckbox = undefined) => {
      if (shouldUpdateCheckbox === true || shouldUpdateCheckbox === false) {
        updateIsTAMarginAppliedAction(id, shouldUpdateCheckbox);

        if (shouldUpdateCheckbox === false) {
          updateTAMarginTypeAction(id, undefined);
          updateTAMarginAmountAction(id, undefined);
        }
      }

      updateTAMarginTypeAction(id, marginType);
      updateTAMarginAmountAction(id, marginValue);

      return;
    },
    [updateTAMarginTypeAction, updateTAMarginAmountAction, updateIsTAMarginAppliedAction, id]
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
      updateBookingTravelAgentUserIdAction(id, travelAgentUserUuid);
    },
    [id, updateBookingTravelAgentUserIdAction]
  );

  const onTARemove = useCallback(() => {
    updateBooking(id, { travelAgentUserUuid: null });
  }, [id, updateBooking]);

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
    return (
      <React.Fragment>
        <CollapseTitle>
          <span>
            <label>
              <strong>{t('labels.transfers')}</strong>
            </label>
            <br />
            <label>{selectedTransfersBreakdown}</label>
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
          renderTransferOptionsSimple(t, selectedTransfers, transfers, updateTransferAction, id, currencyCode)}
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
          renderGroundServices(t, currencyCode, selectedGroundServices, groundServices, updateGroundServiceAction, id)}
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
          renderAddons(
            t,
            currencyCode,
            selectedSupplements,
            selectedFines,
            availableSupplements,
            availableFines,
            updateSupplementAction,
            updateFineAction,
            id
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
      modalContent = renderMargin(t, {
        currencyCode,
        onMarginChange,
        grandTotal,
        values,
        isTAMarginApplied,
        taMarginType,
        taMarginAmount,
      });
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
        travelAgentsLoaded,
        getTravelAgentName,
        onTASelect,
        onTARemove,
        travelAgent,
      });
      break;
    default:
      modalContent = '';
  }

  const totalCents = booking?.response?.totals?.totalForPricedItemsCents | 0;

  return (
    <Fragment>
      {transfers.length >= 1 && <TransfersWrapper />}
      {groundServices.length >= 1 && <GroundServicesWrapper />}
      {addons.length >= 1 && <AddonsWrapper />}
      {totalCents > 0 && (
        <React.Fragment>
          <hr />
          <label>
            <strong>
              {t('labels.summaryForYourChosenOptionsIn')} {booking?.response?.hotel?.name}
            </strong>
          </label>
          <br />
          <br />
          <DisplayTotalsBreakdown
            translate={t}
            currencyCode={currencyCode}
            displayTotals={booking.response.displayTotals}
          />
          <hr />
        </React.Fragment>
      )}
      {renderTASelect(t, {
        currencyCode,
        summaryOnly,
        compactEdit,
        hasTASelect,
        travelAgentsLoaded,
        getTravelAgentName,
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
        isTAMarginApplied,
        taMarginType,
        taMarginAmount,
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
