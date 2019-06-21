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

import { SummaryFormMargin, RadioButton, Modal, Loader, IndexSearch } from 'components';

import { ProductTypes } from 'config/enums';
import { useModalState, useFetchData } from 'effects';
import { isString } from 'utils';

import connect from './SummaryFormExtras.state';
import { propTypes, defaultProps } from './SummaryFormExtras.props';
import {
  AddonCheckbox,
  AddonSummaries,
  AddonSummary,
  Button,
  ContextMenu,
  Extra,
  ExtraSummary,
  ExtraSummaryProduct,
  ExtraSummaryTitle,
  ExtraSummaryTotal,
  ModalContent,
  OptionLabel,
  OptionPrice,
  OptionRate,
  Title,
  TravelAgent,
  TravelAgentName,
  Clear,
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

// eslint-disable-next-line
const renderOption = ({ total, title, quantity = 0 }) => (
  <OptionRate key={total}>
    {gt(quantity, 1) && `${quantity} x`} {title} (+ <OptionPrice>{total}</OptionPrice>)
  </OptionRate>
);

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

const renderExtraOptions = (
  t,
  type,
  productType,
  products,
  { onSingleChange, onOneWayChange, summaryOnly, values, compactEdit, onEditClick }
) => {
  if (summaryOnly || compactEdit) {
    const summaries = reduce(partial(renderOptionSummary, [t]), [], products);

    return (
      (!isNilOrEmpty(summaries) || compactEdit) && (
        <ExtraSummary>
          <ExtraSummaryTitle>{t(`${type}_plural`)}:</ExtraSummaryTitle>
          <AddonSummaries>{summaries}</AddonSummaries>
          {compactEdit && (
            <ContextMenu>
              <span onClick={() => onEditClick(type, productType, products)}>{t('buttons.edit')}</span>
            </ContextMenu>
          )}
        </ExtraSummary>
      )
    );
  }

  const getOption = ({ products, breakdown }) => {
    const value = join(',', map(prop('uuid'), products));
    const label = map(renderOption, breakdown);

    return { label, value };
  };

  const options = map(getOption, productsBothWays(products));

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
    <ExtraSummary>
      <ExtraSummaryTitle>{t('labels.commission')}:</ExtraSummaryTitle>
      <AddonSummaries>
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
      </AddonSummaries>
    </ExtraSummary>
  ) : (
    <Extra>
      <Title>{t('labels.addCommission')}</Title>
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
    </Extra>
  );
};

const renderSelect = (
  t,
  { onMultipleChange, summaryOnly, values, compactEdit },
  { products, breakdown, selected, total }
) => {
  const uuids = join(',', map(prop('uuid'), products));
  const checked = propOr(false, uuids, values);

  const productType = pipe(
    head,
    prop('type')
  )(products);

  return summaryOnly || compactEdit ? (
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

const renderExtraSelects = (t, type, products, { summaryOnly, onEditClick, compactEdit, ...props }) => {
  const selectElements = map(partial(renderSelect, [t, { summaryOnly, compactEdit, ...props }]), products);

  return (summaryOnly && !isEmpty(selectElements)) || compactEdit ? (
    ((summaryOnly && !isNilOrEmpty(filter(propEq('selected', true), products))) || compactEdit) && (
      <ExtraSummary>
        <ExtraSummaryTitle>{t(`${type}_plural`)}:</ExtraSummaryTitle>
        <AddonSummaries>{selectElements}</AddonSummaries>
        {compactEdit && (
          <ContextMenu>
            <span onClick={() => onEditClick(type, type, products)}>{t('buttons.edit')}</span>
          </ContextMenu>
        )}
      </ExtraSummary>
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
  { summaryOnly, compactEdit, isSr, usersLoaded, getUserName, onTASelect, onTARemove, travelAgent, onEditClick }
) =>
  isSr &&
  (summaryOnly || compactEdit ? (
    <ExtraSummary>
      <ExtraSummaryTitle>{t('travelAgent')}:</ExtraSummaryTitle>
      <AddonSummaries>{getUserName(prop('uuid', travelAgent))}</AddonSummaries>
      {compactEdit && (
        <ContextMenu>
          <span onClick={() => onEditClick('travelAgent')}>{t('buttons.edit')}</span>
        </ContextMenu>
      )}
    </ExtraSummary>
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
  editGuard,
  onEditGuard,
  isSr,
  usersStatus,
  fetchUsers,
  getUserName,
  travelAgent,
}) => {
  const { t } = useTranslation();
  const usersLoaded = isSr && useFetchData(usersStatus, fetchUsers, []);

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

  const onEditClick = type => {
    if (editGuard) {
      return onEditGuard();
    }

    setModalContext(type);
    onModalOpen();
  };

  const onClose = () => {
    setModalContext(undefined);
    onModalClose();
  };

  const onTASelect = ({ id: travelAgentUserUuid }) => {
    updateBooking(id, { travelAgentUserUuid });
  };

  const onTARemove = () => {
    updateBooking(id, { travelAgentUserUuid: null });
  };

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
      modalContent = renderExtraOptions(t, 'groundService', ProductTypes.GROUND_SERVICE, groundServices, {
        onOneWayChange,
        onSingleChange,
        values,
      });
      break;
    case 'travelAgent':
      modalContent = renderTASelect(t, { isSr, usersLoaded, getUserName, onTASelect, onTARemove, travelAgent });
      break;
    default:
      modalContent = '';
  }

  return (
    <Fragment>
      {renderExtraOptions(t, 'transfer', ProductTypes.TRANSFER, transfers, optionsProps)}
      {renderExtraOptions(t, 'groundService', ProductTypes.GROUND_SERVICE, groundServices, optionsProps)}
      {renderExtraSelects(t, 'addon', addons, { summaryOnly, onMultipleChange, values, compactEdit, onEditClick })}
      {renderTASelect(t, {
        summaryOnly,
        compactEdit,
        isSr,
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

export default compose(connect)(SummaryFormExtras);
