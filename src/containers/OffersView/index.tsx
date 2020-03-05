import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { makeBackendApi } from 'services/BackendApi';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { getUserCountryContext } from 'store/modules/auth';
import { createStructuredSelector } from 'reselect';
import { IOffersViewResponseOffer, IUuidAndName } from 'services/BackendApi/types/OffersViewResponse';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import ResultBadge from 'pureUi/ResultBadge';
import { useTranslation } from 'react-i18next';
import { ageNameToHumanReadable, greenTaxToHumanReadable, formatDateDisplay } from 'utils';
import { TabbedNavigation } from 'pureUi/TabbedNavigation';
import { Breadcrumbs } from 'components';
// import { Back } from 'containers/HotelContainer/HotelContainer.styles';

import { Back } from '../BookingContainer/BookingContainer.styles';
import {
  getOfferRequestIsPendingSelector,
  offerSelector,
  offerErrorSelector,
  getAssociatedOffersMappingSelector,
  getAssociatedProductsMappingSelector,
  getOffersOnHotelSelector,
} from '../../store/modules/offer/selectors';
import { getOfferRequestAction } from '../../store/modules/offer/actions';

const _ReadOnlyField = props => {
  const { label, children, className } = props;
  return (
    <div className={className}>
      <label className="primary">{label}</label>
      {children}
    </div>
  );
};
const ReadOnlyField = styled(_ReadOnlyField)`
  border: 1px solid #cbd5e0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 8px;
  margin-bottom: 16px;
  &:last-of-type {
    margin-bottom: 0px;
  }
  div {
    margin-bottom: 16px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
  label {
    display: block;
    color: #4a5568;
    margin-bottom: 4px;
    &.primary {
      font-size: 12px;
      color: #4a5568;
      margin-bottom: 8px;
    }
  }
`;

const ApplicationProductField = props => {
  const { label, applicationProductSet, productMapping } = props;
  return (
    <div>
      {applicationProductSet.map((productBlock, i) => {
        return (
          <div key={`transfers-${i}`}>
            <h4>{label}</h4>
            <div className="application-product-block">
              <ReadOnlyField label={'Applied Products / Age Ranges'}>
                {productBlock.products.map(product => {
                  return (
                    <p>
                      <span key={product.uuid}>{productMapping[product.uuid]}</span>

                      <div className="application-product-field-age-names">
                        /
                        {(product.ageNames &&
                          product.ageNames.map(ageName => {
                            return <span key={ageName}>{ageNameToHumanReadable(ageName)}</span>;
                          })) || <span>All ages</span>}
                      </div>
                    </p>
                  );
                })}
              </ReadOnlyField>

              <ReadOnlyField label={'Discount Percentage'}>
                <p>{productBlock.discountPercentage}</p>
              </ReadOnlyField>

              {productBlock.maximumQuantity != null && (
                <ReadOnlyField label={'Maximum Quantity'}>
                  {(productBlock.maximumQuantity && <p>{productBlock.maximumQuantity}</p>) || <p>N/A</p>}
                </ReadOnlyField>
              )}

              {productBlock.greenTaxDiscountApproach != null && (
                <ReadOnlyField label={'Green Tax Discount Approach'}>
                  <p>{greenTaxToHumanReadable(productBlock.greenTaxDiscountApproach)}</p>
                </ReadOnlyField>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const OfferDetailsSection = props => {
  const { offer, offerMapping } = props;
  if (offer === undefined) {
    return null;
  }
  return (
    <section>
      <ReadOnlyField label={'Terms and Conditions'}>
        <p>{offer.termsAndConditions}</p>
      </ReadOnlyField>

      {offer.furtherInformation && (
        <ReadOnlyField label={'Further Information'}>
          <p>{offer.furtherInformation}</p>
        </ReadOnlyField>
      )}

      <ReadOnlyField label={'Pre Discount'}>{offer.preDiscount ? <CheckIcon /> : <CloseIcon />}</ReadOnlyField>
      <ReadOnlyField label={'Combines'}>{offer.combines ? <CheckIcon /> : <CloseIcon />}</ReadOnlyField>

      {offer.combinesWith && offer.combinesWith.length >= 1 && (
        <ReadOnlyField label={'Combines With'}>
          {offer.combinesWith.map((oUuid: string) => (
            <ResultBadge key={oUuid} type="text" label={offerMapping[oUuid]} />
          ))}
        </ReadOnlyField>
      )}

      {offer.cannotCombineWith && offer.cannotCombineWith.length >= 1 && (
        <ReadOnlyField label={'Cannot Combine With'}>
          {offer.cannotCombineWith.map((oUuid: string) => (
            <ResultBadge key={oUuid} type="text" label={offerMapping[oUuid]} />
          ))}
        </ReadOnlyField>
      )}
    </section>
  );
};

const PrerequisitesSection = props => {
  const { offer, productMapping } = props;
  const { t } = useTranslation();
  if (offer === undefined) {
    return null;
  }

  return (
    <section>
      {offer.prerequisites.dates && (
        <ReadOnlyField label={t('labels.prerequisites.dates')}>
          {offer.prerequisites.dates.map(date => (
            <p key={date.startDate}>
              {formatDateDisplay(date.startDate)} - {formatDateDisplay(date.endDate)}
            </p>
          ))}
        </ReadOnlyField>
      )}

      {offer.prerequisites.maximumLodgingsInBooking && (
        <ReadOnlyField label={t('labels.prerequisites.maximumLodgingsInBooking')}>
          <p>{offer.prerequisites.maximumLodgingsInBooking}</p>
        </ReadOnlyField>
      )}

      {offer.prerequisites.advance && (
        <ReadOnlyField label={t('labels.prerequisites.advance')}>
          <div>
            <label>Book By</label>
            <span>{formatDateDisplay(offer.prerequisites.advance.bookBy)}</span>
          </div>
          {offer.prerequisites.advance.minimum && (
            <div>
              <label>Minimum</label>
              <span>{offer.prerequisites.advance.minimum}</span>
            </div>
          )}
          {offer.prerequisites.advance.maximum && (
            <div>
              <label>Maximum</label>
              <span>{offer.prerequisites.advance.maximum}</span>
            </div>
          )}
        </ReadOnlyField>
      )}

      {offer.prerequisites.stayLength && (
        <ReadOnlyField label={t('labels.prerequisites.stayLength')}>
          {offer.prerequisites.stayLength.minimum && (
            <div>
              <label>Minimum</label>
              <span>{offer.prerequisites.stayLength.minimum}</span>
            </div>
          )}
          {offer.prerequisites.stayLength.maximum && (
            <div>
              <label>Maximum</label>
              <span>{offer.prerequisites.stayLength.maximum}</span>
            </div>
          )}
          {offer.prerequisites.stayLength.strictMinMaxStay && (
            <div>
              <label>Strict Min/Max Stay</label>
              <span>{offer.prerequisites.stayLength.strictMinMaxStay ? <CheckIcon /> : <CloseIcon />}</span>
            </div>
          )}
        </ReadOnlyField>
      )}

      {offer.prerequisites.countryCodes && (
        <ReadOnlyField label={t('labels.prerequisites.countryCodes')}>
          {offer.prerequisites.countryCodes.map(countryCode => (
            <p key={countryCode}>{countryCode}</p>
          ))}
        </ReadOnlyField>
      )}

      {offer.prerequisites.accommodationProducts && (
        <ReadOnlyField label={t('labels.prerequisites.accommodationProducts')}>
          <ul>
            {offer.prerequisites.accommodationProducts.map((pUuid: string) => (
              <li key={pUuid}>{productMapping[pUuid]}</li>
            ))}
          </ul>
        </ReadOnlyField>
      )}

      {offer.prerequisites.payload.anniversary != null && (
        <ReadOnlyField label={t('labels.prerequisites.anniversary')}>
          <p>{offer.prerequisites.payload.anniversary ? <CheckIcon /> : <CloseIcon />}</p>
        </ReadOnlyField>
      )}

      {offer.prerequisites.payload.birthday != null && (
        <ReadOnlyField label={t('labels.prerequisites.birthday')}>
          <p>{offer.prerequisites.payload.birthday ? <CheckIcon /> : <CloseIcon />}</p>
        </ReadOnlyField>
      )}

      {offer.prerequisites.payload.honeymoon != null && (
        <ReadOnlyField label={t('labels.prerequisites.honeymoon')}>
          <p>{offer.prerequisites.payload.honeymoon ? <CheckIcon /> : <CloseIcon />}</p>
        </ReadOnlyField>
      )}

      {offer.prerequisites.payload.repeatCustomer != null && (
        <ReadOnlyField label={t('labels.prerequisites.repeatCustomer')}>
          <p>{offer.prerequisites.payload.repeatCustomer ? <CheckIcon /> : <CloseIcon />}</p>
        </ReadOnlyField>
      )}

      {offer.prerequisites.payload.wedding != null && (
        <ReadOnlyField label={t('labels.prerequisites.wedding')}>
          <p>{offer.prerequisites.payload.wedding ? <CheckIcon /> : <CloseIcon />}</p>
        </ReadOnlyField>
      )}
    </section>
  );
};

const ApplicationsSection = props => {
  const { offer, productMapping } = props;
  if (offer === undefined) {
    return null;
  }
  if (offer.productDiscounts === undefined) {
    offer.productDiscounts = {};
  }
  if (offer.subProductDiscounts === undefined) {
    offer.subProductDiscounts = {};
  }

  return (
    <section>
      {offer.stepping && (
        <ReadOnlyField label={'Stepping'}>
          {offer.stepping.applyTo && (
            <div>
              <label>Apply To</label>
              <span>{offer.stepping.applyTo}</span>
            </div>
          )}
          {offer.stepping.everyXNights && (
            <div>
              <label>Every X Nights</label>
              <span>{offer.stepping.everyXNights}</span>
            </div>
          )}
          {offer.stepping.maximumNights && (
            <div>
              <label>Maximum Nights</label>
              <span>{offer.stepping.maximumNights}</span>
            </div>
          )}
        </ReadOnlyField>
      )}

      {offer.accommodationProductDiscount && (
        <ReadOnlyField label={'Accommodation Discount'}>
          <p>{offer.accommodationProductDiscount.discountPercentage}</p>
          <p>{greenTaxToHumanReadable(offer.accommodationProductDiscount.greenTaxDiscountApproach)}</p>
        </ReadOnlyField>
      )}

      {offer.productDiscounts &&
        Object.keys(offer.productDiscounts).map(key => {
          if (offer.productDiscounts === undefined || offer.productDiscounts[key] === undefined) {
            return null;
          }
          return (
            <ApplicationProductField
              productMapping={productMapping}
              key={key}
              label={key}
              applicationProductSet={offer.productDiscounts[key]}
            />
          );
        })}

      {offer.subProductDiscounts &&
        Object.keys(offer.subProductDiscounts).map(key => {
          if (offer.subProductDiscounts === undefined || offer.subProductDiscounts[key] === undefined) {
            return null;
          }
          return (
            <ApplicationProductField
              productMapping={productMapping}
              key={key}
              label={key}
              applicationProductSet={offer.subProductDiscounts[key]}
            />
          );
        })}
    </section>
  );
};

const OfferOrderingSection = props => {
  const { offer, offersOnHotel } = props;
  if (offer == null) {
    return null;
  }

  return (
    <section className="ordering-section">
      <ol>
        {offersOnHotel.map((offerOnHotel: any) => {
          return (
            <li key={offerOnHotel.uuid} className={offerOnHotel.uuid === offer.uuid ? 'active' : ''}>
              {offerOnHotel.name}
            </li>
          );
        })}
      </ol>
    </section>
  );
};
export class _OffersView extends React.PureComponent<IOffersViewProps, {}> {
  componentWillMount() {
    this.props.getOfferRequestAction(this.props.match.params.id);
  }
  render() {
    if (this.props.offerRequestIsPending) {
      return <p>Loading...</p>;
    }

    return (
      <main className={this.props.className}>
        <Breadcrumbs
          links={[
            {
              label: <Back>Offers</Back>,
              to: '/offers',
            },
            {
              label: this.props.offer.name,
              to: `/offers/${this.props.offer.uuid}`,
            },
          ]}
        />
        <h1>{this.props.offer.name}</h1>
        <h2>{this.props.offer.hotel.name}</h2>

        <TabbedNavigation
          tabHeaders={[<h3>Offer Details</h3>, <h3>Prerequisites</h3>, <h3>Applications</h3>, <h3>Ordering</h3>]}
        >
          <OfferDetailsSection offer={this.props.offer} offerMapping={this.props.associatedOffersMapping} />

          <PrerequisitesSection offer={this.props.offer} productMapping={this.props.associatedProductsMapping} />

          <ApplicationsSection offer={this.props.offer} productMapping={this.props.associatedProductsMapping} />

          <OfferOrderingSection offer={this.props.offer} offersOnHotel={this.props.offersOnHotel} />
        </TabbedNavigation>
      </main>
    );
  }
}

const OffersView = styled(_OffersView)`
  width: 90%;
  max-width: 1280px;
  margin: 2rem 5%;
  align-self: center;

  padding: 16px;

  .application-product-block {
    border-left: 1px solid #ccc;
    margin-left: 24px;
    padding-left: 24px;
    margin-bottom: 16px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }

  .application-product-field-age-names {
    display: inline;
  }

  .ordering-section {
    li {
      padding: 8px;
      &.active {
        background-color: #e2e8f0;
      }
    }
  }
`;

const actionCreators = {
  getOfferRequestAction,
};

export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;
export interface IOffersViewProps extends StateToProps, DispatchToProps {
  className: string; // from styled components
  actingCountryCode: string;
  match: {
    params: {
      id: string;
    };
  };
}

const mapStateToProps = createStructuredSelector({
  actingCountryCode: getUserCountryContext,
  offerRequestIsPending: getOfferRequestIsPendingSelector,
  offer: offerSelector,
  offerError: offerErrorSelector,
  associatedOffersMapping: getAssociatedOffersMappingSelector,
  associatedProductsMapping: getAssociatedProductsMappingSelector,
  offersOnHotel: getOffersOnHotelSelector,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

const withConnect = connect<StateToProps, DispatchToProps, IOffersViewProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const OffersViewConnected = compose(withConnect)(OffersView);

export default OffersViewConnected;
