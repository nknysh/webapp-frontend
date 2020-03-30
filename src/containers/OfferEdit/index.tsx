import React, { FormEvent } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, RouteComponentProps, Switch, Route, Redirect } from 'react-router-dom';
import { Text, Heading } from 'pureUi/typography';
import Label from 'pureUi/Label/index';
import TextInput from 'pureUi/TextInput/index';
import TextArea from 'pureUi/Textarea/index';
import Checkbox from 'pureUi/Checkbox';
import { OfferEditStyles } from './OffereditStyles';
import { PrimaryButton, ButtonBar, ButtonSpacer } from 'pureUi/Buttons';

import { IWithBootstrapDataProps, withBootstapData } from 'hoc/WithBootstrapData';
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
} from 'store/modules/offer/selectors';

import {
  offerNameChangeAction,
  offerTermsChangeAction,
  offerFurtherInformationChangeAction,
  offerSetPreDiscountAction,
  offerHotelUuidChangeAction,
  setOfferIsTextOnly,
  putOfferRequestAction,
  postOfferRequestAction,
  getOfferRequestAction,
  resetOfferModuleAction,
} from 'store/modules/offer/actions';
import { TabBar, RouteTab } from 'pureUi/TabBar';
import { OfferEditPreRequisitesContainerConnected } from '../OfferEditPreRequisites/index';
import { OfferEditApplicationsContainerConnected } from 'containers/OfferEditApplications';

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

  togglePreDiscount = () => this.props.offerSetPreDiscountAction(!this.props.isPreDiscount);

  toggleTextOnly = () => this.props.setOfferIsTextOnly(!this.props.isTextOnly);

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
            <Checkbox className="textOnlyCheckbox" checked={this.props.isTextOnly} onChange={this.toggleTextOnly} />
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

        <TabBar className="tabBar">
          <RouteTab to={`${this.props.match.url}/pre-requisites`}>Pre Requisites</RouteTab>
          <RouteTab to={`${this.props.match.url}/applications`}>Applications</RouteTab>
          <RouteTab to={`${this.props.match.url}/combinations`}>Combinations</RouteTab>
          <RouteTab to={`${this.props.match.url}/priority`}>Priority</RouteTab>
        </TabBar>

        <div className="routes">
          <Switch>
            <Route
              exact
              path={`${this.props.match.url}/pre-requisites`}
              component={OfferEditPreRequisitesContainerConnected}
            />
            <Route
              exact
              path={`${this.props.match.url}/applications`}
              component={OfferEditApplicationsContainerConnected}
            />
          </Switch>
          <Route
            exact
            path={`${this.props.match.path}`}
            render={() => <Redirect to={`${this.props.match.url}/pre-requisites`} />}
          />
        </div>

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
});

const actionCreators = {
  getOfferRequestAction,
  offerNameChangeAction,
  offerTermsChangeAction,
  offerFurtherInformationChangeAction,
  setOfferIsTextOnly,
  offerSetPreDiscountAction,
  offerHotelUuidChangeAction,
  putOfferRequestAction,
  postOfferRequestAction,
  resetOfferModuleAction,
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
