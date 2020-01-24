import React, { Fragment, useState, useCallback } from 'react';
import { compose, prop, flatten } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { RadioButton, Loader } from '@pure-escapes/webapp-ui-components';
import Modal from 'pureUi/Modal';

import { SummaryFormMargin, IndexSearch, DisplayTotalsBreakdown } from 'components';
import { useFetchData } from 'effects';
import { withUser } from 'hoc';
import { formatPrice, filterByObjectProperties } from 'utils';
import { Icon } from '@material-ui/core';

import connect from './SummaryFormExtras.state';
import { propTypes, defaultProps } from './SummaryFormExtras.props';
import {
  AddonCheckbox,
  Clear,
  Description,
  Title,
  TravelAgent,
  TravelAgentName,
  CollapseToggle,
  CollapseTitle,
  InformationIcon,
  ProductLabel,
} from './SummaryFormExtras.styles';
import {
  TableCardBox,
  TableCardRow,
  TableCardNumberedBanner,
  TableCardNumberBannerNumber,
  TableCardNumberBannerText,
} from '../../pureUi/TableCard';
import { HotelName } from '../SummaryForm/SummaryForm.styles';

const InfoIconWithModal = ({ modalHeader, modalText }) => {
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
        <ProductLabel className="normal-case">
          <span>
            {t.name} {t.priceFormatted}{' '}
          </span>
          <InfoIconWithModal
            modalHeader={
              <h2>
                {t.name} <small>{t.priceFormatted}</small>
              </h2>
            }
            modalText={<p>{t.description}</p>}
          />
        </ProductLabel>
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

  const inDirectionTransferOptions = simpleTransfers.filter(t => t.direction === 'in');
  const outDirectionTransferOptions = simpleTransfers.filter(t => t.direction === 'out');

  const buildMarkupForOneWayTransfers = transfers => {
    return (
      <React.Fragment>
        {transfers.map(to => {
          const isChecked = selectedTransferOptions.some(sto => sto.uuid === to.uuid && sto.direction === to.direction);
          return (
            <AddonCheckbox
              onChange={() => handleCheckboxClick(to)}
              key={`${to.name}/${to.direction}`}
              checked={isChecked}
              label={
                <ProductLabel className="normal-case">
                  <span>
                    {to.name} {to.priceFormatted}{' '}
                  </span>
                  <InfoIconWithModal
                    modalHeader={
                      <h2>
                        {to.name} <small>{to.priceFormatted}</small>
                      </h2>
                    }
                    modalText={<p>{to.description}</p>}
                  />
                </ProductLabel>
              }
            />
          );
        })}
      </React.Fragment>
    );
  };

  const inDirectionTransfersMarkup = buildMarkupForOneWayTransfers(inDirectionTransferOptions);
  const outDirectionTransfersMarkup = buildMarkupForOneWayTransfers(outDirectionTransferOptions);

  return (
    <div>
      {bothWayTransfersOptions && (
        <React.Fragment>
          <label className="uppercase font-bold">Return Transfers</label>
          {bothWayTransferMarkup}
        </React.Fragment>
      )}

      {bothWayTransfersOptions && inDirectionTransferOptions && <hr />}

      {inDirectionTransferOptions && (
        <React.Fragment>
          <label className="uppercase font-bold">One Way Transfers (In)</label>
          {inDirectionTransfersMarkup}
        </React.Fragment>
      )}

      {((bothWayTransfersOptions && outDirectionTransferOptions) ||
        (inDirectionTransferOptions && outDirectionTransferOptions)) && <hr />}
      {outDirectionTransfersMarkup && (
        <React.Fragment>
          <label className="uppercase font-bold">One Way Transfers (Out)</label>
          {outDirectionTransfersMarkup}
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
              <ProductLabel>
                <span>
                  {gsProduct.name}{' '}
                  {renderInlinePrice(
                    translate,
                    currencyCode,
                    gs.total,
                    gs.totalBeforeDiscount,
                    gs.isOnRequestOrPartiallyOnRequest
                  )}
                </span>
                <InfoIconWithModal
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
              </ProductLabel>
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
              <ProductLabel>
                <span>
                  {supplementProduct.name}{' '}
                  {renderInlinePrice(
                    translate,
                    currencyCode,
                    sp.total,
                    sp.totalBeforeDiscount,
                    sp.isOnRequestOrPartiallyOnRequest
                  )}
                </span>
                <InfoIconWithModal
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
              </ProductLabel>
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
              <ProductLabel>
                <span>
                  {fineProduct.name}{' '}
                  {renderInlinePrice(
                    translate,
                    currencyCode,
                    fp.total,
                    fp.totalBeforeDiscount,
                    fp.isOnRequestOrPartiallyOnRequest
                  )}
                </span>
                <InfoIconWithModal
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
              </ProductLabel>
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

const renderMargin = (
  t,
  { onMarginChange, grandTotal, canBook, currencyCode, isTAMarginApplied, taMarginType, taMarginAmount }
) => {
  if (!canBook) return;

  return (
    <TableCardBox className="mt-4 mb-4">
      <TableCardRow depth={3}>
        <Title>{t('labels.commission')}</Title>
        <SummaryFormMargin
          checked={isTAMarginApplied}
          currencyCode={currencyCode}
          onChange={onMarginChange}
          total={grandTotal}
          type={taMarginType}
          value={taMarginAmount}
        />
        <Description>{t('labels.addCommission')}</Description>
      </TableCardRow>
    </TableCardBox>
  );
};

const renderTASelect = (t, { travelAgentsLoaded, getTravelAgentName, onTASelect, onTARemove, travelAgent }) => (
  <TableCardBox className="mt-4 mb-4">
    <TableCardRow depth={3}>
      <Title>{t('travelAgent')}</Title>
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
    </TableCardRow>
  </TableCardBox>
);

export const SummaryFormExtras = ({
  addons,
  booking,
  canBook,
  compact,
  currencyCode,
  fetchTravelAgents,
  getTravelAgentName,
  grandTotal,
  groundServices,
  id,
  isRl,
  isSr,
  selectedFines,
  selectedGroundServices,
  selectedSupplements,
  selectedTransfers,
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

  const hasTASelect = isSr && !isRl;
  const travelAgentsLoaded = useFetchData(
    travelAgentsStatus,
    () => {
      if (hasTASelect) {
        return fetchTravelAgents(currentCountry ? { actingCountryCode: currentCountry } : {});
      }
      return [];
    },
    []
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
      <TableCardBox className="table-card-box">
        <TableCardRow className="table-card-row" depth={1}>
          <HotelName>{t('labels.transfers')}</HotelName>
        </TableCardRow>

        <TableCardRow className="table-card-row" depth={3}>
          <CollapseTitle>
            <label className={`uppercase font-bold ${!isTransferSectionCollapsed ? 'color-teal' : ''}`}>
              {selectedTransfersBreakdown}
            </label>
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
        </TableCardRow>

        {isTransferSectionCollapsed === false && (
          <TableCardRow className="table-card-row" depth={3}>
            {renderTransferOptionsSimple(t, selectedTransfers, transfers, updateTransferAction, id, currencyCode)}
          </TableCardRow>
        )}
      </TableCardBox>
    );
  };

  const GroundServicesWrapper = () => {
    const breakdown = selectedGroundServicesBreakdown();
    return (
      <TableCardBox className="table-card-box mt-4">
        <TableCardRow className="table-card-row" depth={1}>
          <HotelName>{t('labels.groundServices')}</HotelName>
        </TableCardRow>
        <TableCardRow className="table-card-row" depth={3}>
          <CollapseTitle>
            <label className={`uppercase font-bold ${!isGroundServicesSectionCollapsed ? 'color-teal ' : ''}`}>
              {breakdown}
            </label>

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
        </TableCardRow>
        {isGroundServicesSectionCollapsed === false && (
          <TableCardRow className="table-card-row" depth={3}>
            {renderGroundServices(
              t,
              currencyCode,
              selectedGroundServices,
              groundServices,
              updateGroundServiceAction,
              id
            )}
          </TableCardRow>
        )}
      </TableCardBox>
    );
  };

  const AddonsWrapper = () => {
    const breakdown = selectedAddonsBreakdown();
    return (
      <TableCardBox className="table-card-box mt-4">
        <TableCardRow className="table-card-row" depth={1}>
          <HotelName>{t('labels.addons')}</HotelName>
        </TableCardRow>

        <TableCardRow className="table-card-row" depth={3}>
          <CollapseTitle>
            <label className={`uppercase font-bold ${!isAddonsSectionCollapsed ? 'color-teal ' : ''}`}>
              {breakdown}
            </label>
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
        </TableCardRow>

        {isAddonsSectionCollapsed === false && (
          <TableCardRow className="table-card-row" depth={3}>
            {renderAddons(
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
          </TableCardRow>
        )}
      </TableCardBox>
    );
  };

  const totalCents = booking?.response?.totals?.totalForPricedItemsCents | 0;

  return (
    <Fragment>
      <TableCardNumberedBanner className="mt-4 mb-4">
        <TableCardNumberBannerNumber>3</TableCardNumberBannerNumber>
        <TableCardNumberBannerText>Select Your Add-Ons</TableCardNumberBannerText>
      </TableCardNumberedBanner>

      {transfers.length >= 1 && <TransfersWrapper />}
      {groundServices.length >= 1 && <GroundServicesWrapper />}
      {addons.length >= 1 && <AddonsWrapper />}

      <TableCardNumberedBanner className="mt-4 mb-4">
        <TableCardNumberBannerNumber>4</TableCardNumberBannerNumber>
        <TableCardNumberBannerText>Process Your Booking</TableCardNumberBannerText>
      </TableCardNumberedBanner>

      {totalCents > 0 && (
        <DisplayTotalsBreakdown
          translate={t}
          currencyCode={currencyCode}
          displayTotals={booking.response.displayTotals}
        />
      )}

      {/* SRs need to be able to select TAs */}
      {hasTASelect &&
        renderTASelect(t, {
          currencyCode,
          travelAgentsLoaded,
          getTravelAgentName,
          onTASelect,
          onTARemove,
          travelAgent,
        })}
      {renderMargin(t, {
        currencyCode,
        onMarginChange,
        grandTotal,
        values,
        compact,
        canBook,
        isTAMarginApplied,
        taMarginType,
        taMarginAmount,
      })}
    </Fragment>
  );
};

SummaryFormExtras.propTypes = propTypes;
SummaryFormExtras.defaultProps = defaultProps;

export default compose(
  connect,
  withUser
)(SummaryFormExtras);
