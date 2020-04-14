import React, { Fragment, useState, useCallback } from 'react';
import { compose, prop, flatten, partition } from 'ramda';
import { isNilOrEmpty } from 'ramda-adjunct';
import { useTranslation } from 'react-i18next';
import { RadioButton, Loader } from '@pure-escapes/webapp-ui-components';
import { StandardModal, ModalContent } from 'pureUi/Modal';
import CustomItemForm from 'pureUi/CustomItemForm';
import BookingGuestInformationForm from 'pureUi/BookingGuestInformationForm';

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
  OptionList,
  BothWayTransferRadioWrapper,
  InlinePriceLabel,
} from './SummaryFormExtras.styles';
import {
  TableCardBox,
  TableCardRow,
  TableCardNumberedBanner,
  TableCardNumberBannerNumber,
  TableCardNumberBannerText,
} from 'pureUi/TableCard';
import { HotelName } from '../SummaryForm/SummaryForm.styles';

import Checkbox from 'pureUi/Checkbox';

export const renderHotelName = ({ name }) => {
  return (
    <TableCardBox>
      <TableCardRow depth={1}>
        <HotelName>{name}</HotelName>
      </TableCardRow>
    </TableCardBox>
  );
};

const InfoIconWithModal = ({ modalRender }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <React.Fragment>
      <InformationIcon
        onClick={e => {
          e.preventDefault();
          setIsModalOpen(true);
        }}
      />

      {isModalOpen && <StandardModal onClose={() => setIsModalOpen(false)}>{modalRender()}</StandardModal>}
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
        <InlinePriceLabel data-discounted={true} margin-right={true}>
          {currencyCode}
          {formatPrice(total)}
        </InlinePriceLabel>
        <InlinePriceLabel data-secondary={true}>
          {currencyCode}
          {formatPrice(totalBeforeDiscount)}
        </InlinePriceLabel>
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
    .map(t => {
      return {
        value: t.uuid,
        label: (
          <ProductLabel className="normal-case">
            <span>
              {t.name} {t.priceFormatted}{' '}
            </span>
            <InfoIconWithModal
              modalRender={() => (
                <ModalContent>
                  <h2 className="uppercase color-gold">
                    {t.name} <small>{t.priceFormatted}</small>
                  </h2>
                  <p>{t.description}</p>
                </ModalContent>
              )}
            />
          </ProductLabel>
        ),
      };
    });

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
      <OptionList>
        {transfers.map(to => {
          const isChecked = selectedTransferOptions.some(sto => sto.uuid === to.uuid && sto.direction === to.direction);
          return (
            <li key={to.name}>
              <label>
                <Checkbox onChange={() => handleCheckboxClick(to)} checked={isChecked} />
                <span className="labelText">
                  {to.name} {to.priceFormatted}{' '}
                </span>
              </label>
              <InfoIconWithModal
                modalRender={() => (
                  <ModalContent>
                    <h2 className="uppercase color-gold">
                      {to.name} <small>{to.priceFormatted}</small>
                    </h2>
                    <p>{to.description}</p>
                  </ModalContent>
                )}
              />
            </li>
          );
        })}
      </OptionList>
    );
  };

  const inDirectionTransfersMarkup = buildMarkupForOneWayTransfers(inDirectionTransferOptions);
  const outDirectionTransfersMarkup = buildMarkupForOneWayTransfers(outDirectionTransferOptions);

  return (
    <div>
      {bothWayTransfersOptions && (
        <BothWayTransferRadioWrapper>
          <label className="uppercase font-bold">Return Transfers</label>
          {bothWayTransferMarkup}
        </BothWayTransferRadioWrapper>
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
              <ProductLabel className="normal-case">
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
                  modalRender={() => (
                    <ModalContent>
                      <h2 className="uppercase color-gold">
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
                      <p>{gsProduct.meta.description}</p>
                    </ModalContent>
                  )}
                />
              </ProductLabel>
            }
          />
        );
      })}
    </React.Fragment>
  );
};

const isCustomItem = supplementProduct =>
  supplementProduct.options && supplementProduct.options.genericIdentifier === 'customItem';

const renderAddons = (
  translate,
  currencyCode,
  selectedSupplements,
  selectedFines,
  availableSupplements,
  availableFines,
  updateSupplementAction,
  updateFineAction,
  hotelUuid,
  customItem
) => {
  const customItemMarkup = customItem ? (
    <CustomItemForm
      currency={currencyCode}
      data={customItem.payload}
      validation={customItem.validation}
      onNameChange={customItem.actions.updateName}
      onTotalChange={customItem.actions.updateTotal}
      onDescriptionChange={customItem.actions.updateDescription}
      onCountAsMealPlanChange={customItem.actions.updateCountsAsMealPlan}
      onCountAsTransferChange={customItem.actions.updateCountsAsTransfer}
      onShow={customItem.actions.showForm}
      onCancel={customItem.actions.hideForm}
      onConfirm={() => customItem.actions.save(hotelUuid)}
    />
  ) : null;

  const renderSupplement = (sp, idx, custom) => {
    const supplementProduct = sp.products[0];
    const isChecked = selectedSupplements.some(sgs => sgs.uuid === supplementProduct.uuid);

    return (
      <AddonCheckbox
        onChange={() =>
          custom ? customItem.actions.remove(idx, hotelUuid) : updateSupplementAction(supplementProduct, hotelUuid)
        }
        key={`${supplementProduct.uuid}/${supplementProduct.name}`}
        checked={isChecked || custom}
        label={
          <ProductLabel className="normal-case">
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
              modalRender={() => (
                <ModalContent>
                  <h2 className="uppercase color-gold">
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
                  <p>{supplementProduct.meta.description}</p>
                </ModalContent>
              )}
            />
          </ProductLabel>
        }
      />
    );
  };

  const [customSupplement, standardSupplement] = partition(sp => isCustomItem(sp.products[0]), availableSupplements);

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
                  modalRender={() => (
                    <ModalContent>
                      <h2 className="uppercase color-gold">
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
                      <p>{fineProduct.meta.description}</p>
                    </ModalContent>
                  )}
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
      {standardSupplement.map(sp => renderSupplement(sp))}
      {fineMarkup}
      {customSupplement.map((sp, idx) => renderSupplement(sp, idx, true))}
      {customItemMarkup}
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

const renderGuestInfo = (data, onChange) => {
  return (
    <TableCardBox className="mt-4 mb-4">
      <TableCardRow depth={3}>
        <Title>Lead Guest Info</Title>
        <BookingGuestInformationForm
          bookingGuestFormValues={data}
          onValueChange={onChange}
          sections={{ guestInfo: true }}
        />
      </TableCardRow>
    </TableCardBox>
  );
};

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
  customItem,
  customItemActions,
  guestInfo,
  updateBookingGuestInformationAction
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

    const customItemProducts = flatten(availableSupplements.map(sp => sp.products)).filter(isCustomItem);

    const selectedAddonProducts = filterByObjectProperties(flatten(addons.map(a => a.products)), selectedAddons, [
      'uuid',
    ]).concat(customItemProducts);

    if (selectedAddonProducts.length >= 1) {
      return selectedAddonProducts.map(stp => stp.name).join(' & ');
    }

    return 'None selected';
  }, [selectedFines, selectedSupplements, addons]);

  const renderTransfersWrapper = () => {
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

  const renderGroundServicesWrapper = () => {
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

  const renderAddonsWrapper = () => {
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
              id,
              isSr
                ? {
                    ...customItem,
                    actions: customItemActions,
                  }
                : null
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

      {transfers.length >= 1 && renderTransfersWrapper()}
      {groundServices.length >= 1 && renderGroundServicesWrapper()}
      {addons.length >= 1 && renderAddonsWrapper()}

      <TableCardNumberedBanner className="mt-4 mb-4">
        <TableCardNumberBannerNumber>4</TableCardNumberBannerNumber>
        <TableCardNumberBannerText>Process Your Booking</TableCardNumberBannerText>
      </TableCardNumberedBanner>

      {totalCents > 0 &&
        renderHotelName({
          name: booking?.response?.hotel?.name,
        })}

      {totalCents > 0 && (
        <DisplayTotalsBreakdown
          translate={t}
          currencyCode={currencyCode}
          displayTotals={booking.response.displayTotals}
        />
      )}
      {renderGuestInfo(
        guestInfo,
        updateBookingGuestInformationAction
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

export default compose(connect, withUser)(SummaryFormExtras);
