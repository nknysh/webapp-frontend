import React from 'react';
import { ReadOnlyField } from './ReadOnlyField';
import { ageNameToHumanReadable, greenTaxToHumanReadable } from 'utils';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { useTranslation } from 'react-i18next';

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

export const ApplicationsSection = props => {
  const { offer, productMapping } = props;
  if (offer === undefined) {
    return null;
  }
  const { t } = useTranslation();

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
          <ReadOnlyField label={t('labels.applications.discountCheapest')}>
            <p>{offer.stepping.discountCheapest ? <CheckIcon /> : <CloseIcon />}</p>
          </ReadOnlyField>
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
