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

/**
 * given an offer, return an array of every single associated product ID, from
 * the prerequisites and the applications
 */
const getAllAssociatedProductUuidsFromOffer = (offer: IOffersViewResponseOffer) => {
  const productUuids = [...(offer.prerequisites.accommodationProducts || [])];

  if (offer.productDiscounts != undefined) {
    Object.values(offer.productDiscounts).map(productBlocks => {
      productBlocks.forEach(productBlock => {
        productBlock.products.map(p => {
          productUuids.push(p.uuid);
        });
      });
    });
  }

  if (offer.subProductDiscounts != undefined) {
    Object.values(offer.subProductDiscounts).map(productBlocks => {
      productBlocks.forEach(productBlock => {
        productBlock.products.map(p => {
          productUuids.push(p.uuid);
        });
      });
    });
  }
  return productUuids;
};

const apiResultsToUuidNameMapping = results => {
  const mapping = {};
  results.data.data.forEach(item => {
    mapping[item.uuid] = item.name;
  });
  return mapping;
};

const _OffersView = (props: IOffersViewProps) => {
  const { id } = props.match.params;
  const [offer, setOffer] = useState<IOffersViewResponseOffer | undefined>(undefined);

  // data we need to load in via a separate API call
  const [offerMapping, setOfferMapping] = useState({});
  const [productMapping, setProductMapping] = useState({});
  const [orderedOffersOnHotel, setOrderedOffersOnHotel] = useState([]);

  const ApplicationProductField = props => {
    const { label, applicationProductSet } = props;
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

  const OfferDetailsSection = () => {
    if (offer === undefined) {
      return null;
    }
    return (
      <section>
        <h3>Offer Details</h3>
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

  const PrerequisitesSection = () => {
    const { t } = useTranslation();
    if (offer === undefined) {
      return null;
    }

    return (
      <section>
        <h3>Prerequisites</h3>
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

  const ApplicationsSection = () => {
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
        <h3>Applications</h3>
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
              <ApplicationProductField key={key} label={key} applicationProductSet={offer.productDiscounts[key]} />
            );
          })}

        {offer.subProductDiscounts &&
          Object.keys(offer.subProductDiscounts).map(key => {
            if (offer.subProductDiscounts === undefined || offer.subProductDiscounts[key] === undefined) {
              return null;
            }
            return (
              <ApplicationProductField key={key} label={key} applicationProductSet={offer.subProductDiscounts[key]} />
            );
          })}
      </section>
    );
  };

  const OfferOrderingSection = () => {
    if (offer == null) {
      return null;
    }

    return (
      <section>
        <h3>Offer Ordering for {offer.hotel.name}</h3>

        <ol>
          {orderedOffersOnHotel.map((offerOnHotel: any) => {
            return <li className={offerOnHotel.uuid === offer.uuid ? 'active' : ''}>{offerOnHotel.name}</li>;
          })}
        </ol>
      </section>
    );
  };

  const backendApi = makeBackendApi(props.actingCountryCode);

  // load the offer, its associated offers, its associated products, and its sister offers
  useEffect(() => {
    backendApi
      .getOffer(id)
      .then(results => {
        setOffer(results.data.data);
        return results.data.data;
      })
      .then((offer: IOffersViewResponseOffer) => {
        backendApi.getOffersForHotel(offer.hotelUuid).then(results => {
          results.data.data.sort((offerA: IOffersViewResponseOffer, offerB: IOffersViewResponseOffer) => {
            return offerA.order - offerB.order;
          });
          setOrderedOffersOnHotel(results.data.data);
        });

        const offerUuids = [...(offer.combinesWith || []), ...(offer.cannotCombineWith || [])];
        if (offerUuids) {
          backendApi.getOffersAsUuidAndName(offerUuids).then(results => {
            setOfferMapping(apiResultsToUuidNameMapping(results));
          });
        }

        const productUuids = getAllAssociatedProductUuidsFromOffer(offer);
        if (productUuids) {
          backendApi.getProductsAsUuidAndName(productUuids).then(results => {
            setProductMapping(apiResultsToUuidNameMapping(results));
          });
        }
      });
  }, [id]);

  if (offer === undefined) {
    return null;
  }

  return (
    <main className={props.className}>
      <h1>{offer.name}</h1>
      <h2>{offer.hotel.name}</h2>

      <OfferDetailsSection />

      <PrerequisitesSection />

      <ApplicationsSection />

      <OfferOrderingSection />
    </main>
  );
};

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

  li.active {
    background-color: #ccc;
  }
`;

const actionCreators = {};

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
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

const withConnect = connect<StateToProps, DispatchToProps, IOffersViewProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const OffersViewConnected = compose(withConnect)(OffersView);

export default OffersViewConnected;
