import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
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

const _ReadOnlyField = props => {
  const { label, children, className } = props;
  return (
    <div className={className}>
      <label>{label}</label>
      {children}
    </div>
  );
};
const ReadOnlyField = styled(_ReadOnlyField)`
  border: 1px solid black;
  padding: 8px;
  margin-bottom: 8px;
  &:last-of-type {
    margin-bottom: 0px;
  }
  p {
    margin: ;
  }
  label {
    text-transform: uppercase;
    display: block;
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
            <div key={`transfers-${i}`} className="application-product-block">
              <h3>{label}</h3>
              {productBlock.products.map(product => {
                return (
                  <div key={product.uuid} className="application-product-field">
                    <ResultBadge key={product.uuid} type="text" label={productMapping[product.uuid]} />

                    {product.ageNames && (
                      <div className="application-product-field-age-names">
                        /
                        {product.ageNames.map(ageName => {
                          return <ResultBadge key={ageName} type="text" label={ageName} />;
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
              <ReadOnlyField label={'Discount Percentage'}>
                <p>{productBlock.discountPercentage}</p>
              </ReadOnlyField>
              <ReadOnlyField label={'Maximum Quantity'}>
                {(productBlock.maximumQuantity && <p>{productBlock.maximumQuantity}</p>) || <p>N/A</p>}
              </ReadOnlyField>
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
        <h2>Offer Details</h2>
        <ReadOnlyField label={'Terms and Conditions'}>
          <p>{offer.termsAndConditions}</p>
        </ReadOnlyField>

        {offer.furtherInformation && (
          <ReadOnlyField label={'Further Information'}>
            <p>{offer.furtherInformation}</p>
          </ReadOnlyField>
        )}

        <ReadOnlyField label={'Pre Discount'}>{offer.preDiscount ? <CheckIcon /> : <CloseIcon />}</ReadOnlyField>

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
        <h2>Prerequisites</h2>
        {offer.prerequisites.dates && (
          <ReadOnlyField label={t('labels.prerequisites.dates')}>
            {offer.prerequisites.dates.map(date => (
              <p key={date.startDate}>
                {date.startDate} - {date.endDate}
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
            <p>{offer.prerequisites.advance.bookBy}</p>
          </ReadOnlyField>
        )}

        {offer.prerequisites.stayLength && (
          <ReadOnlyField label={t('labels.prerequisites.stayLength')}>
            <p>{offer.prerequisites.stayLength.minimum}</p>
            <p>{offer.prerequisites.stayLength.strictMinMaxStay ? <CheckIcon /> : <CloseIcon />}</p>
          </ReadOnlyField>
        )}

        {offer.prerequisites.countryCodes && (
          <ReadOnlyField label={t('labels.prerequisites.countryCodes')}>
            {offer.prerequisites.countryCodes.map(countryCode => (
              <ResultBadge key={countryCode} type="text" label={countryCode} />
            ))}
          </ReadOnlyField>
        )}

        {offer.prerequisites.accommodationProducts && (
          <ReadOnlyField label={t('labels.prerequisites.accommodationProducts')}>
            {offer.prerequisites.accommodationProducts.map((pUuid: string) => (
              <ResultBadge key={pUuid} type="text" label={productMapping[pUuid]} />
            ))}
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
        <h2>Applications</h2>
        {offer.stepping && (
          <ReadOnlyField label={'Stepping'}>
            <p>{offer.stepping.applyTo}</p>
            <p>{offer.stepping.everyXNights}</p>
            <p>{offer.stepping.maximumNights}</p>
          </ReadOnlyField>
        )}

        {offer.accommodationProductDiscount && (
          <div>
            <label>Accommodation Discount</label>
            <p>{offer.accommodationProductDiscount.discountPercentage}</p>
            <p>{offer.accommodationProductDiscount.greenTaxDiscountApproach}</p>
          </div>
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
        <h2>Offer Ordering</h2>

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
      <p>{offer.hotel.name}</p>

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

  .application-product-block {
    background-color: #ccc;
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
