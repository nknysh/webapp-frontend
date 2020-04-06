import React, { FormEvent } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OfferEditApplicationsStyles } from './OfferEditApplicationsStyles';

import { IWithBootstrapDataProps, withBootstapData } from 'hoc/WithBootstrapData';
import { 
  IUIOfferProductDiscountInstanceWithAgeNames,
  offerAccommodationDiscountSelector,
  offerRequiresGreenTaxApproachSelector,
  offerDomainIsTextOnlySelector,
  offerExtraPersonSupplementsSelector, 
  accomodationPreRequisiteAgeNamesSelector,
  offerHotelUuidSelector, 
 } from 'store/modules/offer/selectors';

import {
  EditableProductDiscountField,
  offerSetAccommodationDiscountDiscountPercentageAction,
  offerSetAccommodationDiscountGreenTaxApproachAction,
  offerAddProductDiscountAction,
  offerAddSubProductDiscountAction,
  offerRemoveProductDiscountAction,
  offerRemoveSubProductDiscountAction,
  offerUpdateProductDiscountAction,
  offerUpdateSubProductDiscountAction,
  offerAddProductToProductDiscountAction,
  offerAddProductToSubProductDiscountAction,
  offerToggleProductDiscountAgeNameAction,
  offerToggleSubProductDiscountAgeNameAction,
} from 'store/modules/offer/actions';

import { IUIOfferProductDiscountInstance } from '../../services/BackendApi/types/OfferResponse';
import { EGreenTaxApproach, GreenTaxApproachOptions, GreenTaxApproachInfo } from 'utils/greenTax';
import { Fieldset, Legend } from '../../pureUi/forms/Fieldset/index';
import TextInput from '../../pureUi/TextInput/index';
import { Label } from 'pureUi/Label';
import { PureSelect } from '../../pureUi/forms/PureSelect/index';
import { Text, Heading } from 'pureUi/typography'
import Checkbox from 'pureUi/Checkbox';
import { ActionButton, CloseButton } from '../../pureUi/Buttons/index';
import { sanitizeInteger } from 'utils/number';

export class OfferEditApplicationsContainer extends React.Component<IOfferEditPreRequisitesProps, {}> {

  handleAccomodationDiscountPctChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetAccommodationDiscountDiscountPercentageAction(
      sanitizeInteger(e.currentTarget.value, this.props.accomodationDiscount?.discountPercentage)

    );
  };

  handleAccomodationDiscountGreenTaxChange = (e: FormEvent<HTMLSelectElement>) => {
    this.props.offerSetAccommodationDiscountGreenTaxApproachAction(e.currentTarget.value);
  }

  handleAddExtraPersonSupplement = () => this.props.offerAddSubProductDiscountAction('Supplement', this.props.bootsrapExtraPersonSupplementId.uuid)
  
  handleRemoveExtraPersonSupplement = (uuid: string) => () => this.props.offerRemoveSubProductDiscountAction('Supplement', uuid);
  
  handleUpdateExtraPersonSupplementChange = (uuid: string, key: EditableProductDiscountField) => (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const currentValue = this.props.extraPersonSupplements!.find(eps => eps.uuid === uuid)![key];
    this.props.offerUpdateSubProductDiscountAction('Supplement', uuid, key, e.currentTarget.value, currentValue);
  }

  handleExtraPersonSupplementAgeNameChange = (uuid: string, ageName: string) => () => {
    this.props.offerToggleSubProductDiscountAgeNameAction('Supplement', uuid, this.props.bootsrapExtraPersonSupplementId.uuid, ageName);
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

        <Fieldset>
          <Legend>Extra Person Supplement</Legend>
          {!this.props.hotelUuid && <Text>Select a hotel to add an extra person supplement</Text>}

          {this.props.hotelUuid && this.props.extraPersonSupplements.map((eps: IUIOfferProductDiscountInstanceWithAgeNames) => {
            return (
              <div key={eps.uuid} className="extraPersonSupplement">
                  <div className="ageNames">
                    <Label inline reverse text={'Adult'}>
                      <Checkbox 
                        checked={eps.ageNames.includes('Adult')} 
                        onChange={this.handleExtraPersonSupplementAgeNameChange(eps.uuid, 'Adult')}
                      />
                    </Label>

                    {this.props.accomodationAgeNames.map(an => {
                      const label = an.ageTo
                        ? `${an.name} ( ${an.ageFrom} to ${an.ageTo} )`
                        : `${an.name} ( ${an.ageFrom}+ )`;

                      return (
                      <Label key={an.name} inline reverse text={label}>
                        <Checkbox 
                          checked={eps.ageNames.includes(an.name)} 
                          onChange={this.handleExtraPersonSupplementAgeNameChange(eps.uuid, an.name)}
                        />
                      </Label>
                      );
                    })}
                  </div>
                  <span className="epsCloseButton"><CloseButton onClick={this.handleRemoveExtraPersonSupplement(eps.uuid)} /></span>
                  <Label text="Discount %">
                    <TextInput className="discountInput" value={eps.discountPercentage || ''} onChange={this.handleUpdateExtraPersonSupplementChange(eps.uuid, 'discountPercentage')}/>
                  </Label>
                  <Label text="Maximum Quantity">
                    <TextInput className="maxQuantityInput" value={eps.maximumQuantity || ''} onChange={this.handleUpdateExtraPersonSupplementChange(eps.uuid, 'maximumQuantity')} />
                  </Label>
                  <div className="epsGreentax">
                    <Label className="select" lowercase text="Green Tax Approach">
                      <PureSelect disabled={!this.props.requiresGreenTax} value={eps.greenTaxDiscountApproach || ''} onChange={this.handleUpdateExtraPersonSupplementChange(eps.uuid, 'greenTaxDiscountApproach')}>
                        <option value="" disabled>{this.props.requiresGreenTax ? 'Select a green tax approach' : 'Not Applicable'}</option>
                        {this.props.requiresGreenTax && Object.keys(EGreenTaxApproach).map(key => <option key={key} value={key}>{GreenTaxApproachOptions[key]}</option>)}
                      </PureSelect>
                    </Label>
                    {this.props.requiresGreenTax && <Text className="info">{eps.greenTaxDiscountApproach && GreenTaxApproachInfo[eps.greenTaxDiscountApproach] || 'No green tax approach selected'}</Text>}
                  </div>
              </div>
            );
          })}

          {this.props.hotelUuid && (
            <ActionButton action="add" onClick={this.handleAddExtraPersonSupplement}>Add Extra Person Supplement</ActionButton>
          )}
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
  extraPersonSupplements: offerExtraPersonSupplementsSelector,
  accomodationAgeNames: accomodationPreRequisiteAgeNamesSelector,
  hotelUuid: offerHotelUuidSelector,
});

const actionCreators = {
  offerSetAccommodationDiscountDiscountPercentageAction,
  offerSetAccommodationDiscountGreenTaxApproachAction,
  offerAddProductDiscountAction,
  offerAddSubProductDiscountAction,
  offerRemoveProductDiscountAction,
  offerRemoveSubProductDiscountAction,
  offerUpdateProductDiscountAction,
  offerUpdateSubProductDiscountAction,
  offerAddProductToProductDiscountAction,
  offerAddProductToSubProductDiscountAction,
  offerToggleProductDiscountAgeNameAction,
  offerToggleSubProductDiscountAgeNameAction,
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
