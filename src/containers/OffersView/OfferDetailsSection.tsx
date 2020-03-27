import React from 'react';
import { ReadOnlyField } from './ReadOnlyField';
import ResultBadge from 'pureUi/ResultBadge';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

export const OfferDetailsSection = props => {
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
