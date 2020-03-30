import React, { FormEvent } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OfferEditApplicationsStyles } from './OfferEditApplicationsStyles';

import { IWithBootstrapDataProps, withBootstapData } from 'hoc/WithBootstrapData';
import { 
  offerAccommodationDiscountSelector,
  offerRequiresGreenTaxApproachSelector,
  offerDomainIsTextOnlySelector,
 } from 'store/modules/offer/selectors';

import {
  offerSetAccommodationDiscountDiscountPercentageAction,
  offerSetAccommodationDiscountGreenTaxApproachAction,
} from 'store/modules/offer/actions';

import { EGreenTaxApproach, GreenTaxApproachOptions, GreenTaxApproachInfo } from 'utils/greenTax';
import { Fieldset, Legend } from '../../pureUi/forms/Fieldset/index';
import TextInput from '../../pureUi/TextInput/index';
import { Label } from 'pureUi/Label';
import { PureSelect } from '../../pureUi/forms/PureSelect/index';
import { Text, Heading } from 'pureUi/typography'

export class OfferEditApplicationsContainer extends React.Component<IOfferEditPreRequisitesProps, {}> {
  handleAccomodationDiscountPctChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetAccommodationDiscountDiscountPercentageAction(parseInt(e.currentTarget.value, 10));
  };

  handleAccomodationDiscountGreenTaxChange = (e: FormEvent<HTMLSelectElement>) => {
    this.props.offerSetAccommodationDiscountGreenTaxApproachAction(e.currentTarget.value);
  }
  
  render() {

    if(this.props.isTextOnly) {
      return <Heading level="h3">Text only offers can not have applications.</Heading>
    }
    
    return (
      <OfferEditApplicationsStyles>
        <Fieldset>
          <Legend>Accomodation Discount</Legend>
          <div className="greenTaxGrid">
            <Label className="input" lowercase text="Discount %">
              <TextInput value={this.props.accomodationDiscount?.discountPercentage || ''} onChange={this.handleAccomodationDiscountPctChange}/>
            </Label>
            <Label className="select" lowercase text="Green Tax Approach">
              <PureSelect disabled={!this.props.requiresGreenTax} value={this.props.accomodationDiscount?.greenTaxDiscountApproach || ''} onChange={this.handleAccomodationDiscountGreenTaxChange}>
                <option value="" disabled>{this.props.requiresGreenTax ? 'Select a green tax approach' : 'Not Applicable'}</option>
                {this.props.requiresGreenTax && Object.keys(EGreenTaxApproach).map(key => <option key={key} value={key}>{GreenTaxApproachOptions[key]}</option>)}
              </PureSelect>
            </Label>
            <Text className="info">{this.props.accomodationDiscount?.greenTaxDiscountApproach && GreenTaxApproachInfo[this.props.accomodationDiscount.greenTaxDiscountApproach]}</Text>
          </div>
        </Fieldset>
      </OfferEditApplicationsStyles>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;

export interface IOfferEditPreRequisitesProps extends StateToProps, DispatchToProps, IWithBootstrapDataProps {}

const mapStateToProps = createStructuredSelector({
  accomodationDiscount: offerAccommodationDiscountSelector,
  requiresGreenTax: offerRequiresGreenTaxApproachSelector,
  isTextOnly: offerDomainIsTextOnlySelector,
});

const actionCreators = {
  offerSetAccommodationDiscountDiscountPercentageAction,
  offerSetAccommodationDiscountGreenTaxApproachAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IOfferEditPreRequisitesProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const OfferEditApplicationsContainerConnected = compose(
  withConnect,
  withBootstapData()
)(OfferEditApplicationsContainer);
