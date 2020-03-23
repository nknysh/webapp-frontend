import React, { FormEvent } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MultiDateRange } from 'pureUi/forms/MultiDateRange/index';
import { Text, Heading } from 'pureUi/typography';
import Label from 'pureUi/Label/index';
import TextInput from 'pureUi/TextInput/index';
import TextArea from 'pureUi/Textarea/index';
import Checkbox from 'pureUi/Checkbox';
import { Fieldset, Legend, LegendExtras } from 'pureUi/forms/Fieldset/index';
import { OfferEditStyles } from './OffereditStyles';
import { PrimaryButton, ButtonBar, ButtonSpacer } from 'pureUi/Buttons';
import { Throggle } from 'pureUi/forms/Throggle';

import { IWithBootstrapDataProps, withBootstapData } from 'hoc/WithBootstrapData';
import { IOfferPrerequisitesPayload } from 'services/BackendApi/types/OfferResponse';
import { AccordianSection, Accordian } from 'pureUi/Accordian/index';
import { CloseButton } from 'pureUi/Buttons/index';
import { FormControlGrid } from 'pureUi/forms/FormControlGrid';
import { PureSelect } from 'pureUi/forms/PureSelect';

import {
  offerSelector,
  getOfferErrorSelector,
  offerStayBetweenPrerequisitesSelector,
  offerNameSelector,
  offerHotelUuidSelector,
  offerTermsSelector,
  offerFurtherInformationSelector,
  offerDomainIsTextOnlySelector,
  putOfferErrorSelector,
  hotelNameSelector,
  offerPreDiscountSelector,
  getOfferRequestIsPendingSelector,
  postOfferErrorSelector,
  offerBooleanPrerequisitesSelector,
  taCountryAccordianKeysSelector,
  offerTaCountriesLabelPrerequisiteSelector,
  offerTaCountriesPrerequisiteByRegionSelector,
  offerAccommodationProductPrerequisitesSelector,
  offerAccommodationProductPrerequisitesLabelSelector,
  offerMaxLodgingsPrerequisiteSelector,
} from 'store/modules/offer/selectors';

import {
  offerRemoveStayBetweenPrerequisiteAction,
  offerNameChangeAction,
  offerTermsChangeAction,
  offerFurtherInformationChangeAction,
  offerAddStayBetweenPrerequisiteAction,
  offerChangeStayBetweenPrerequisiteAction,
  offerSetPreDiscountAction,
  offerHotelUuidChangeAction,
  setOfferIsTextOnly,
  putOfferRequestAction,
  postOfferRequestAction,
  getOfferRequestAction,
  resetOfferModuleAction,
  offerSetBooleanPrerequisiteAction,
  offerSetCountryCodePrerequisiteAction,
  offerToggleTaCountryAccodian,
  offerClearAllCountryCodePrerequisiteAction,
  offerClearAllAccommodationProductPrerequisiteAction,
  offerSetAccommodationProductPrerequisiteAction,
  offerSetMaxLodgingsPrerequisiteAction,
} from 'store/modules/offer/actions';

export class OfferEditContainer extends React.Component<IOfferEditProps, {}> {
  isEditMode = () => this.props.match.path.includes('edit');

  componentWillMount() {
    if (this.isEditMode() && this.props.offer.uuid !== this.props.match.params.offerId) {
      this.props.getOfferRequestAction(this.props.match.params.offerId, true);
    }
  }

  componentWillUnmount() {
    this.props.resetOfferModuleAction();
  }

  handleHotelChange = (e: FormEvent<HTMLSelectElement>) => {
    this.props.offerHotelUuidChangeAction(e.currentTarget.value);
  };

  handleNameChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.offerNameChangeAction(e.currentTarget.value);
  };

  handleTermsChange = (e: FormEvent<HTMLTextAreaElement>) => {
    this.props.offerTermsChangeAction(e.currentTarget.value);
  };

  handleFurtherInfoChange = (e: FormEvent<HTMLTextAreaElement>) => {
    this.props.offerFurtherInformationChangeAction(e.currentTarget.value);
  };

  handleDateChange = (dates: string[][]) => {
    const datesWithoutTime = dates.map(pair => pair.map(date => date.split('T')[0]));
    this.props.offerChangeStayBetweenPrerequisiteAction(datesWithoutTime);
  };

  handleNewDate = () => {
    this.props.offerAddStayBetweenPrerequisiteAction();
  };

  handleRemoveDate = (idx: number) => {
    this.props.offerRemoveStayBetweenPrerequisiteAction(idx);
  };

  togglePreDiscount = () => this.props.offerSetPreDiscountAction(!this.props.isPreDiscount);

  toggleTextOnly = () => this.props.setOfferIsTextOnly(!this.props.isTextOnly);

  toggleTaCountryAccordian = (key: string) => () => {
    this.props.offerToggleTaCountryAccodian(key);
  };

  handleNullableBooleanChange = (key: keyof IOfferPrerequisitesPayload) => (value: boolean | null) => {
    this.props.offerSetBooleanPrerequisiteAction(key, value);
  };

  handleTaCoutryChange = (code: string) => (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetCountryCodePrerequisiteAction(code, e.currentTarget.checked);
  };

  handleAccomPreReqChange = (uuid: string) => (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetAccommodationProductPrerequisiteAction(uuid, e.currentTarget.checked);
  };

  handleMaxLodgingsChange = (e: FormEvent<HTMLInputElement>) => {
    this.props.offerSetMaxLodgingsPrerequisiteAction(parseInt(e.currentTarget.value, 10));
  };

  renderHotelName = () => {
    if (this.isEditMode()) {
      return (
        <Heading level="h1" className="hotelName">
          {this.props.hotelName}
        </Heading>
      );
    }

    return (
      <Label lowercase className="hotelName" text="Hotel">
        <PureSelect className="hotelSelectInput" value={this.props.offerHotelUuid} onChange={this.handleHotelChange}>
          <option value="" disabled>
            Select a hotel
          </option>
          {this.props.bootstrapHotels.map(hotel => (
            <option key={hotel.uuid} value={hotel.uuid}>
              {hotel.name}
            </option>
          ))}
        </PureSelect>
      </Label>
    );
  };

  handleCreate = () => {
    this.props.postOfferRequestAction(this.props.history);
  };

  render() {
    if (this.props.getOfferRequestPending) {
      return (
        <OfferEditStyles>
          <h1 data-role="loadingMessage">Loading</h1>
        </OfferEditStyles>
      );
    }

    if (this.props.getError) {
      return (
        <OfferEditStyles>
          <h3>There was a problem loading Offer:{this.props.match.params.offerId}</h3>
        </OfferEditStyles>
      );
    }

    return (
      <OfferEditStyles>
        {(this.props.putError || this.props.postError) && (
          <section className="errors">
            <h3 className="error">There was a problem saving the Offer</h3>
          </section>
        )}

        <section className="basicInfo">
          {this.renderHotelName()}

          <Label lowercase className="offerName" text="Offer Name">
            <TextInput
              className="offerNameInput"
              value={this.props.offerName}
              onChange={this.handleNameChange}
              placeholder="Offer Name"
            />
          </Label>

          <Label lowercase className="termsAndConditions" text="Terms & Conditions">
            <TextArea className="termsInput" value={this.props.offerTerms} onChange={this.handleTermsChange} />
          </Label>

          <Label
            lowercase
            className="furtherInformation"
            text={`Further Information ${this.props.isTextOnly ? `(Required)` : ''}`}
          >
            <TextArea
              className="furtherInformationInput"
              value={this.props.offerFurtherInformation}
              onChange={this.handleFurtherInfoChange}
            />
          </Label>

          <Label lowercase className="textOnly" inline reverse text="Text Only">
            <Checkbox
              className="textOnlyCheckbox"
              checked={this.props.isTextOnly}
              onChange={this.toggleTextOnly}
              disabled
            />
          </Label>

          <Text className="textOnlyInfo">Does not change the price of any product.</Text>

          <Label lowercase className="preDiscount" inline reverse text="Pre Discount">
            <Checkbox
              className="preDiscountCheckbox"
              checked={this.props.isPreDiscount}
              onChange={this.togglePreDiscount}
            />
          </Label>

          <Text className="preDiscountInfo">
            Precentage discounts will be applied to product base rates, before any other percentage discounts.
          </Text>
        </section>

        <section className="preRequisites">
          <Fieldset>
            <Legend>Stay between</Legend>
            <MultiDateRange
              className="stayBetweenInputs"
              dateRanges={this.props.stayBetweenDates}
              onDateChange={this.handleDateChange}
              onNewDate={this.handleNewDate}
              onRemoveDate={this.handleRemoveDate}
            />
          </Fieldset>

          <Fieldset>
            <Legend className="legendWithExtras">
              Accomodation Products
              {this.props.offerHotelUuid && (
                <LegendExtras>
                  {this.props.accomodationPreReqsLabel}
                  <CloseButton onClick={this.props.offerClearAllAccommodationProductPrerequisiteAction} />
                </LegendExtras>
              )}
            </Legend>
            {!this.props.offerHotelUuid && <Text>Select a hotel to see accomodation products</Text>}

            <FormControlGrid columnCount={3}>
              {this.props.accomodationPreReqs.map(product => {
                return (
                  <Label lowercase key={product.label} inline reverse text={product.label}>
                    <Checkbox checked={product.value} onChange={this.handleAccomPreReqChange(product.uuid)} />
                  </Label>
                );
              })}
            </FormControlGrid>
          </Fieldset>

          <Fieldset>
            <Legend className="legendWithExtras">
              Travel Agent Countries
              <LegendExtras>
                {this.props.taCountriesLabel}
                <CloseButton onClick={this.props.offerClearAllCountryCodePrerequisiteAction} />
              </LegendExtras>
            </Legend>

            <Accordian>
              {Object.keys(this.props.taCountries).map(region => (
                <AccordianSection
                  title={region}
                  key={region}
                  suffix={this.props.taCountries[region].total}
                  isOpen={this.props.taCountryAccordianKeys.includes(region)}
                  onClick={this.toggleTaCountryAccordian(region)}
                >
                  <FormControlGrid columnCount={4}>
                    {this.props.taCountries[region].countries.map(country => {
                      return (
                        <Label lowercase key={country.label} inline reverse text={country.label}>
                          <Checkbox checked={country.value} onChange={this.handleTaCoutryChange(country.code)} />
                        </Label>
                      );
                    })}
                  </FormControlGrid>
                </AccordianSection>
              ))}
            </Accordian>
          </Fieldset>

          <Fieldset>
            <Label text="Maximum Lodgings" inline>
              <TextInput value={this.props.maxLodgings} onChange={this.handleMaxLodgingsChange} />
            </Label>
          </Fieldset>

          <Fieldset>
            <Legend>Booking Type</Legend>
            <div className="nullableBooleans">
              {Object.keys(this.props.nullableBooleans).map(key => {
                return (
                  <Throggle
                    label={key.replace(/([A-Z])/g, ' $1')}
                    name={key}
                    key={key}
                    trueLabel="Include"
                    falseLabel="Exclude"
                    value={this.props.nullableBooleans[key]}
                    onChange={this.handleNullableBooleanChange(key as keyof IOfferPrerequisitesPayload)}
                  />
                );
              })}
            </div>
          </Fieldset>
        </section>

        <ButtonBar className="actions">
          {/* I'll come back to this late */}
          {/* <SecondaryButton disabled>Clear Changes</SecondaryButton> */}
          <ButtonSpacer />
          <PrimaryButton
            className="saveButton"
            onClick={this.isEditMode() ? this.props.putOfferRequestAction : this.handleCreate}
          >
            {this.isEditMode() ? 'Save Edits' : 'Create'}
          </PrimaryButton>
        </ButtonBar>
      </OfferEditStyles>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;

export interface IRouteParams {
  offerId: string;
}

export interface IOfferEditProps
  extends StateToProps,
    DispatchToProps,
    IWithBootstrapDataProps,
    RouteComponentProps<IRouteParams> {
  className?: string;
}

const mapStateToProps = createStructuredSelector({
  getOfferRequestPending: getOfferRequestIsPendingSelector,
  offer: offerSelector,
  getError: getOfferErrorSelector,
  putError: putOfferErrorSelector,
  postError: postOfferErrorSelector,
  stayBetweenDates: offerStayBetweenPrerequisitesSelector,
  offerName: offerNameSelector,
  offerHotelUuid: offerHotelUuidSelector,
  offerTerms: offerTermsSelector,
  offerFurtherInformation: offerFurtherInformationSelector,
  hotelName: hotelNameSelector,
  isTextOnly: offerDomainIsTextOnlySelector,
  isPreDiscount: offerPreDiscountSelector,
  nullableBooleans: offerBooleanPrerequisitesSelector,
  taCountries: offerTaCountriesPrerequisiteByRegionSelector,
  taCountryAccordianKeys: taCountryAccordianKeysSelector,
  taCountriesLabel: offerTaCountriesLabelPrerequisiteSelector,
  accomodationPreReqs: offerAccommodationProductPrerequisitesSelector,
  accomodationPreReqsLabel: offerAccommodationProductPrerequisitesLabelSelector,
  maxLodgings: offerMaxLodgingsPrerequisiteSelector,
});

const actionCreators = {
  getOfferRequestAction,
  offerAddStayBetweenPrerequisiteAction,
  offerChangeStayBetweenPrerequisiteAction,
  offerRemoveStayBetweenPrerequisiteAction,
  offerNameChangeAction,
  offerTermsChangeAction,
  offerFurtherInformationChangeAction,
  setOfferIsTextOnly,
  offerSetPreDiscountAction,
  offerHotelUuidChangeAction,
  putOfferRequestAction,
  postOfferRequestAction,
  resetOfferModuleAction,
  offerSetBooleanPrerequisiteAction,
  offerSetCountryCodePrerequisiteAction,
  offerToggleTaCountryAccodian,
  offerClearAllCountryCodePrerequisiteAction,
  offerClearAllAccommodationProductPrerequisiteAction,
  offerSetAccommodationProductPrerequisiteAction,
  offerSetMaxLodgingsPrerequisiteAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IOfferEditProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const OfferEditContainerConnected = compose(
  withConnect,
  withRouter,
  withBootstapData()
)(OfferEditContainer);
