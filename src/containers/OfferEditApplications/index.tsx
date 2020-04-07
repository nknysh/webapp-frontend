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
  availableAccommodationProductsSelector,
  availableFineProductsSelector,
  availableTransferProductsSelector,
  availableGroundServiceProductsSelector,
  availableMealPlanProductsSelector,
  availableSupplementProductsSelector, 
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
  offerToggleProductOnProductDiscountAction,
  offerToggleProductOnSubProductDiscountAction
} from 'store/modules/offer/actions';

import { IOfferProductDiscounts, IOfferSubProductDiscounts } from '../../services/BackendApi/types/OfferResponse';
import { EGreenTaxApproach, GreenTaxApproachOptions, GreenTaxApproachInfo } from 'utils/greenTax';
import { Fieldset, Legend } from '../../pureUi/forms/Fieldset/index';
import TextInput from '../../pureUi/TextInput/index';
import { Label } from 'pureUi/Label';
import { PureSelect } from '../../pureUi/forms/PureSelect/index';
import { Text, Heading } from 'pureUi/typography'
import Checkbox from 'pureUi/Checkbox';
import { ActionButton, CloseButton } from '../../pureUi/Buttons/index';
import { sanitizeInteger } from 'utils/number';
import { offerProductDiscountsFinesSelector, offerProductDiscountsGroundServicesSelector, offerProductDiscountsTransfersSelector, offerSubProductDiscountsMealPlansSelector, offerProductDiscountsSupplementsSelector } from '../../store/modules/offer/subdomains/offer/selectors';
import { FormControlGrid } from 'pureUi/forms/FormControlGrid';


export class OfferEditApplicationsContainer extends React.Component<IOfferEditPreRequisitesProps, {}> {
  
  discountTypeToPropName = (discountType: keyof IOfferProductDiscounts<any> | keyof IOfferSubProductDiscounts<any>, isSubProduct?: boolean): keyof DiscountTypeProps => {
    switch(discountType) {
      case 'Fine': return 'fineDiscounts';
      case 'Ground Service': return 'groundServiceDiscounts';
      case 'Transfer': return 'transferDiscounts';
      case 'Meal Plan': return 'mealPlanDiscounts';
      // Annoying...
      case 'Supplement': return isSubProduct ? 'extraPersonSupplementDiscounts' : 'supplementDiscounts';
    }
  }

  handleAccomodationDiscountPctChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetAccommodationDiscountDiscountPercentageAction(
      sanitizeInteger(e.currentTarget.value, this.props.accomodationDiscount?.discountPercentage)

    );
  };

  handleAccomodationDiscountGreenTaxChange = (e: FormEvent<HTMLSelectElement>) => {
    this.props.offerSetAccommodationDiscountGreenTaxApproachAction(e.currentTarget.value);
  }

  handleUpdateExtraPersonSupplementChange = (uuid: string, key: EditableProductDiscountField) => (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const currentValue = this.props.extraPersonSupplementDiscounts!.find(eps => eps.uuid === uuid)![key];
    this.props.offerUpdateSubProductDiscountAction('Supplement', uuid, key, e.currentTarget.value, currentValue);
  }
  
  handleExtraPersonSupplementAgeNameChange = (uuid: string, ageName: string) => () => {
    this.props.offerToggleSubProductDiscountAgeNameAction('Supplement', uuid, this.props.bootsrapExtraPersonSupplementId.uuid, ageName);
  }
  
  handleAddProduct = (type: keyof IOfferProductDiscounts<any>) => () => { this.props.offerAddProductDiscountAction(type)}
  
  handleAddSubProduct = (type: keyof IOfferSubProductDiscounts<any>) => () => { this.props.offerAddSubProductDiscountAction(type)}
  
  handleAddExtraPersonSupplement = () => this.props.offerAddSubProductDiscountAction('Supplement', this.props.bootsrapExtraPersonSupplementId.uuid)  
  
  handleRemoveProductDiscount = (type: keyof IOfferProductDiscounts<any>, uuid: string) => () => { this.props.offerRemoveProductDiscountAction(type, uuid); }
  
  handleRemoveSubProductDiscount = (type: keyof IOfferSubProductDiscounts<any>, uuid: string) => () => { this.props.offerRemoveSubProductDiscountAction(type, uuid); }

  handleProductDiscountChange = (discountType: keyof IOfferProductDiscounts<any>, uuid: string, key: EditableProductDiscountField) => (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const currentValue = this.props[this.discountTypeToPropName(discountType)]!.find(d => d.uuid === uuid)![key];
    this.props.offerUpdateProductDiscountAction(discountType, uuid, key, e.currentTarget.value, currentValue);
  };
  
  handleSubProductDiscountChange = (discountType: keyof IOfferSubProductDiscounts<any>, uuid: string, key: EditableProductDiscountField) => (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const currentValue = this.props[this.discountTypeToPropName(discountType, true)]!.find(d => d.uuid === uuid)![key];
    this.props.offerUpdateSubProductDiscountAction(discountType, uuid, key, e.currentTarget.value, currentValue);
  };
  
  handleProductDiscountBooleanChange = (discountType: keyof IOfferProductDiscounts<any>, uuid: string, key: EditableProductDiscountField) => (e: FormEvent<HTMLInputElement>) => {
    const currentValue = this.props[this.discountTypeToPropName(discountType)]!.find(d => d.uuid === uuid)![key];
    this.props.offerUpdateProductDiscountAction(discountType, uuid, key, e.currentTarget.checked, currentValue);
  };
  
  handleSubProductDiscountBooleanChange = (discountType: keyof IOfferSubProductDiscounts<any>, uuid: string, key: EditableProductDiscountField) => (e: FormEvent<HTMLInputElement>) => {
    const currentValue = this.props[this.discountTypeToPropName(discountType, true)]!.find(d => d.uuid === uuid)![key];
    this.props.offerUpdateSubProductDiscountAction(discountType, uuid, key, e.currentTarget.checked, currentValue);
  };

  toggleProductOnProductDiscount = (discountType: keyof IOfferProductDiscounts<any>, discountUuid: string, productUuid: string) => () => {
    this.props.offerToggleProductOnProductDiscountAction(discountType, discountUuid, productUuid);
  }
  
  toggleProductOnSubProductDiscount = (discountType: keyof IOfferSubProductDiscounts<any>, discountUuid: string, productUuid: string) => () => {
    this.props.offerToggleProductOnSubProductDiscountAction(discountType, discountUuid, productUuid);
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

          {this.props.hotelUuid && this.props.extraPersonSupplementDiscounts.map((eps: IUIOfferProductDiscountInstanceWithAgeNames) => {
            return (
              <div key={eps.uuid} className="extraPersonSupplement">
                  <FormControlGrid columnCount={4} className="ageNames">
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
                  </FormControlGrid>
                  <span className="epsCloseButton"><CloseButton onClick={this.handleRemoveSubProductDiscount('Supplement', eps.uuid)} /></span>
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

        <Fieldset>
          <Legend>Fine Discount</Legend>
          {this.props.fineDiscounts.map(fineDiscount => {
            return (
              <div key={fineDiscount.uuid} className="fineDiscountGrid">
                <FormControlGrid className="formGrid" columnCount={4}>
                  {this.props.availableFineProducts.map(product => (
                    <Label key={product.name} text={product.name} inline reverse lowercase>
                      <Checkbox 
                        checked={fineDiscount.products.findIndex(f => f.uuid === product.uuid) > -1}
                        onChange={this.toggleProductOnProductDiscount('Fine', fineDiscount.uuid, product.uuid)}
                      />
                    </Label>
                  ))}
                </FormControlGrid>
                <span className="removeDiscountButton">
                  <CloseButton 
                    onClick={this.handleRemoveProductDiscount('Fine', fineDiscount.uuid)} 
                  />
                </span>
                <Label className="discountInput"  text="Discount %">
                  <TextInput 
                    value={fineDiscount.discountPercentage || ''} 
                    onChange={this.handleProductDiscountChange('Fine', fineDiscount.uuid, 'discountPercentage')}
                  />
                </Label>
                <Label className="maxQuantityInput" text="Maximum Quantity">
                  <TextInput  
                    value={fineDiscount.maximumQuantity || ''} 
                    onChange={this.handleProductDiscountChange('Fine', fineDiscount.uuid, 'maximumQuantity')} 
                  />
                </Label>
                <Label className="occupancyCheckbox" text="Only apply this to the number of guests that fit within the room's standard occupancy." inline reverse lowercase>
                  <Checkbox 
                    checked={fineDiscount.standardOccupancyOnly} 
                    onChange={this.handleProductDiscountBooleanChange('Fine', fineDiscount.uuid, 'standardOccupancyOnly')}
                  />
                </Label>
              </div>
            );
          })}
          {this.props.hotelUuid && this.props.availableFineProducts.length > 0 && (
            <ActionButton action="add" onClick={this.handleAddProduct('Fine')}>Add Fine Discount</ActionButton>
          )}

          {!this.props.hotelUuid && <Text>Select a hotel to add fine discount</Text>}
          {this.props.hotelUuid && this.props.availableFineProducts.length === 0 && <Text>No fines available for this hotel.</Text>}
        </Fieldset>

        <Fieldset>
          <Legend>Ground Service Discount</Legend>
          {this.props.groundServiceDiscounts.map(groundServiceDiscount => {
            return (
              <div key={groundServiceDiscount.uuid} className="groundServiceDiscountGrid">
                <FormControlGrid className="formGrid" columnCount={4}>
                  {this.props.availableGroundServiceProducts.map(product => (
                    <Label key={product.name} text={product.name} inline reverse lowercase>
                      <Checkbox 
                        checked={groundServiceDiscount.products.findIndex(f => f.uuid === product.uuid) > -1}
                        onChange={this.toggleProductOnProductDiscount('Ground Service', groundServiceDiscount.uuid, product.uuid)}
                      />
                    </Label>
                  ))}
                </FormControlGrid>
                <span className="removeDiscountButton">
                  <CloseButton 
                    onClick={this.handleRemoveProductDiscount('Ground Service', groundServiceDiscount.uuid)} 
                  />
                </span>
                <Label className="discountInput"  text="Discount %">
                  <TextInput 
                    value={groundServiceDiscount.discountPercentage || ''} 
                    onChange={this.handleProductDiscountChange('Ground Service', groundServiceDiscount.uuid, 'discountPercentage')}
                  />
                </Label>
                <Label className="maxQuantityInput" text="Maximum Quantity">
                  <TextInput  
                    value={groundServiceDiscount.maximumQuantity || ''} 
                    onChange={this.handleProductDiscountChange('Ground Service', groundServiceDiscount.uuid, 'maximumQuantity')} 
                  />
                </Label>
                <Label className="occupancyCheckbox" text="Only apply this to the number of guests that fit within the room's standard occupancy." inline reverse lowercase>
                  <Checkbox 
                    checked={groundServiceDiscount.standardOccupancyOnly} 
                    onChange={this.handleProductDiscountBooleanChange('Ground Service', groundServiceDiscount.uuid, 'standardOccupancyOnly')}
                  />
                </Label>
              </div>
            );
          })}
          {this.props.hotelUuid && this.props.availableGroundServiceProducts.length > 0 && (
            <ActionButton action="add" onClick={this.handleAddProduct('Ground Service')}>Add Ground Service Discount</ActionButton>
          )}

          {!this.props.hotelUuid && <Text>Select a hotel to add an ground service discount</Text>}
          {this.props.hotelUuid && this.props.availableGroundServiceProducts.length === 0 && <Text>No ground services available for this hotel.</Text>}
        </Fieldset>

        <Fieldset>
          <Legend>Transfer Discount</Legend>
          {this.props.transferDiscounts.map(transferDiscount => {
            return (
              <div key={transferDiscount.uuid} className="transferDiscountGrid">
                <FormControlGrid className="formGrid" columnCount={4}>
                  {this.props.availableGroundServiceProducts.map(product => (
                    <Label key={product.name} text={product.name} inline reverse lowercase>
                      <Checkbox 
                        checked={transferDiscount.products.findIndex(f => f.uuid === product.uuid) > -1}
                        onChange={this.toggleProductOnProductDiscount('Transfer', transferDiscount.uuid, product.uuid)}
                      />
                    </Label>
                  ))}
                </FormControlGrid>
                <span className="removeDiscountButton">
                  <CloseButton 
                    onClick={this.handleRemoveProductDiscount('Transfer', transferDiscount.uuid)} 
                  />
                </span>
                <Label className="discountInput"  text="Discount %">
                  <TextInput 
                    value={transferDiscount.discountPercentage || ''} 
                    onChange={this.handleProductDiscountChange('Transfer', transferDiscount.uuid, 'discountPercentage')}
                  />
                </Label>
                <Label className="maxQuantityInput" text="Maximum Quantity">
                  <TextInput  
                    value={transferDiscount.maximumQuantity || ''} 
                    onChange={this.handleProductDiscountChange('Transfer', transferDiscount.uuid, 'maximumQuantity')} 
                  />
                </Label>
                <Label className="occupancyCheckbox" text="Only apply this to the number of guests that fit within the room's standard occupancy." inline reverse lowercase>
                  <Checkbox 
                    checked={transferDiscount.standardOccupancyOnly} 
                    onChange={this.handleProductDiscountBooleanChange('Transfer', transferDiscount.uuid, 'standardOccupancyOnly')}
                  />
                </Label>
              </div>
            );
          })}
          {this.props.hotelUuid && this.props.availableTransferProducts.length > 0 && (
            <ActionButton action="add" onClick={this.handleAddProduct('Transfer')}>Add Transfer Discount</ActionButton>
          )}

          {!this.props.hotelUuid && <Text>Select a hotel to add an transfer discount</Text>}
          {this.props.hotelUuid && this.props.availableTransferProducts.length === 0 && <Text>No transfer products available for this hotel.</Text>}
        </Fieldset>

        <Fieldset>
          <Legend>Meal Plan Discount</Legend>
          {this.props.mealPlanDiscounts.map(mealPlanDiscount => {
            return (
              <div key={mealPlanDiscount.uuid} className="mealPlanDiscountGrid">
                <FormControlGrid className="formGrid" columnCount={4}>
                  {this.props.availableMealPlanProducts.map(product => (
                    <Label key={product.name} text={product.name} inline reverse lowercase>
                      <Checkbox 
                        checked={mealPlanDiscount.products.findIndex(f => f.uuid === product.uuid) > -1}
                        onChange={this.toggleProductOnSubProductDiscount('Meal Plan', mealPlanDiscount.uuid, product.uuid)}
                      />
                    </Label>
                  ))}
                </FormControlGrid>
                <span className="removeDiscountButton">
                  <CloseButton 
                    onClick={this.handleRemoveSubProductDiscount('Meal Plan', mealPlanDiscount.uuid)} 
                  />
                </span>
                <Label className="discountInput"  text="Discount %">
                  <TextInput 
                    value={mealPlanDiscount.discountPercentage || ''} 
                    onChange={this.handleSubProductDiscountChange('Meal Plan', mealPlanDiscount.uuid, 'discountPercentage')}
                  />
                </Label>
                <Label className="maxQuantityInput" text="Maximum Quantity">
                  <TextInput  
                    value={mealPlanDiscount.maximumQuantity || ''} 
                    onChange={this.handleSubProductDiscountChange('Meal Plan', mealPlanDiscount.uuid, 'maximumQuantity')} 
                  />
                </Label>
                <Label className="occupancyCheckbox" text="Only apply this to the number of guests that fit within the room's standard occupancy." inline reverse lowercase>
                  <Checkbox 
                    checked={mealPlanDiscount.standardOccupancyOnly} 
                    onChange={this.handleSubProductDiscountBooleanChange('Meal Plan', mealPlanDiscount.uuid, 'standardOccupancyOnly')}
                  />
                </Label>
              </div>
            );
          })}
          {this.props.hotelUuid && this.props.availableMealPlanProducts.length > 0 && (
            <ActionButton action="add" onClick={this.handleAddSubProduct('Meal Plan')}>Add Meal Plan Discount</ActionButton>
          )}

          {!this.props.hotelUuid && <Text>Select a hotel to add a meal plan discount</Text>}
          {this.props.hotelUuid && this.props.availableMealPlanProducts.length === 0 && <Text>No meal plans available for this hotel.</Text>}
        </Fieldset>

        <Fieldset>
          <Legend>Supplement Discount</Legend>
          {this.props.supplementDiscounts.map(supplementDiscount => {
            return (
              <div key={supplementDiscount.uuid} className="supplementDiscountGrid">
                <FormControlGrid className="formGrid" columnCount={4}>
                  {this.props.availableSupplementProducts.map(product => (
                    <Label key={product.name} text={product.name} inline reverse lowercase>
                      <Checkbox 
                        checked={supplementDiscount.products.findIndex(f => f.uuid === product.uuid) > -1}
                        onChange={this.toggleProductOnProductDiscount('Supplement', supplementDiscount.uuid, product.uuid)}
                      />
                    </Label>
                  ))}
                </FormControlGrid>
                <span className="removeDiscountButton">
                  <CloseButton 
                    onClick={this.handleRemoveProductDiscount('Supplement', supplementDiscount.uuid)} 
                  />
                </span>
                <Label className="discountInput"  text="Discount %">
                  <TextInput 
                    value={supplementDiscount.discountPercentage || ''} 
                    onChange={this.handleProductDiscountChange('Supplement', supplementDiscount.uuid, 'discountPercentage')}
                  />
                </Label>
                <Label className="maxQuantityInput" text="Maximum Quantity">
                  <TextInput  
                    value={supplementDiscount.maximumQuantity || ''} 
                    onChange={this.handleProductDiscountChange('Supplement', supplementDiscount.uuid, 'maximumQuantity')} 
                  />
                </Label>
                <Label className="occupancyCheckbox" text="Only apply this to the number of guests that fit within the room's standard occupancy." inline reverse lowercase>
                  <Checkbox 
                    checked={supplementDiscount.standardOccupancyOnly} 
                    onChange={this.handleProductDiscountBooleanChange('Supplement', supplementDiscount.uuid, 'standardOccupancyOnly')}
                  />
                </Label>
              </div>
            );
          })}
          {this.props.availableSupplementProducts.length > 0 && this.props.hotelUuid && (
            <ActionButton action="add" onClick={this.handleAddProduct('Supplement')}>Add Supplement Discount</ActionButton>
          )}

          {!this.props.hotelUuid && <Text>Select a hotel to add a meal plan discount</Text>}
          {this.props.hotelUuid && this.props.availableSupplementProducts.length === 0 && <Text>No Supplements available for this hotel.</Text>}
        </Fieldset>
      </OfferEditApplicationsStyles>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export interface IOfferEditPreRequisitesProps extends StateToProps, DispatchToProps, IWithBootstrapDataProps {}
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;
export type DiscountTypeProps = typeof discountTypes;

const discountTypes = {
  // NOTE: These prop names are bound to thge discountTypeToPropName method
  fineDiscounts: offerProductDiscountsFinesSelector,
  groundServiceDiscounts: offerProductDiscountsGroundServicesSelector,
  transferDiscounts: offerProductDiscountsTransfersSelector,
  extraPersonSupplementDiscounts: offerExtraPersonSupplementsSelector,
  mealPlanDiscounts: offerSubProductDiscountsMealPlansSelector,
  supplementDiscounts: offerProductDiscountsSupplementsSelector,
}


const mapStateToProps = createStructuredSelector({
  ...discountTypes,
  accomodationDiscount: offerAccommodationDiscountSelector,
  requiresGreenTax: offerRequiresGreenTaxApproachSelector,
  isTextOnly: offerDomainIsTextOnlySelector,
  hotelUuid: offerHotelUuidSelector,
  accomodationAgeNames: accomodationPreRequisiteAgeNamesSelector,
  availableAccommodationProducts: availableAccommodationProductsSelector,
  availableFineProducts: availableFineProductsSelector,
  availableTransferProducts: availableTransferProductsSelector,
  availableGroundServiceProducts: availableGroundServiceProductsSelector,
  availableMealPlanProducts: availableMealPlanProductsSelector,
  availableSupplementProducts: availableSupplementProductsSelector,
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
  offerToggleProductOnProductDiscountAction,
  offerToggleProductOnSubProductDiscountAction,
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
