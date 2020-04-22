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
import { PrimaryButton, ButtonBar, ButtonSpacer, SecondaryButton } from 'pureUi/Buttons';
import { ErrorList } from 'pureUi/ErrorList';

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
  offerValidationSelector,
  offerHasPrerequisitesValidationErrorsSelector,
  offerHasValidationErrorsSelector,
  offerIsPristineSelector,
  offerHasApplicationsValidationErrorsSelector,
  offerHasPerishableDataSelector,
  offerHasCombinationValidationErrorsSelector,
  apiRequestIsPendingSelector,
  hasApiErrorSelector,
  offerDetailsValidaitonErrorCountSelector,
  offePrerequisitesValidationErrorCountSelector,
  offerApplicationsValidationErrorCountSelector,
  offerValidationErrorCountSelector,
  showSuccessConfirmationSelector,
  cachedOfferSuccessActionSelector,
} from 'store/modules/offer/selectors';

import {
  RESET_OFFER_CHANGES,
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
  setOfferIsPristineAction,
  resetOfferChangesAction,
} from 'store/modules/offer/actions';
import { TabBar, RouteTab } from 'pureUi/TabBar';
import { OfferEditPreRequisitesContainerConnected } from '../OfferEditPreRequisites';
import { OfferEditApplicationsContainerConnected } from '../OfferEditApplications';
import { OfferEditOrderingContainerConnected } from '../OfferEditOrdering';
import { OfferEditCombinationsContainerConnected } from '../OfferEditCombinations';
import { ResetOfferChangesPayload } from '../../store/modules/offer/actions';

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
    if (this.props.hasPerishableData) {
      if (
        window.confirm(
          'Changing the hotel will remove Accomodaiton pre-requisites and any applicaiton products you have already assigned'
        )
      ) {
        this.props.offerHotelUuidChangeAction(e.currentTarget.value);
      }
    } else {
      this.props.offerHotelUuidChangeAction(e.currentTarget.value);
    }
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

  handleSaveButtonClick = () => {
    if (this.props.hasValidationErrors) {
      this.props.setOfferIsPristineAction(false);
      return;
    }

    this.isEditMode() ? this.props.putOfferRequestAction() : this.handleCreate();
  };

  handleClearChanges = () => {
    if (window.confirm('This will clear any unsaved changes. Are you sure?')) {
      this.props.resetOfferChangesAction({
        ...this.props.cachedOfferSuccessAction,
        type: RESET_OFFER_CHANGES,
      } as ResetOfferChangesPayload);
    }
  };

  renderHotelName = () => {
    if (this.isEditMode()) {
      return (
        <Heading level="h1" className="hotelName">
          Offer for: {this.props.hotelName}
        </Heading>
      );
    }

    return (
      <Label
        isError={!this.props.offerIsPristine && this.props.validationErrors.hotelUuid.length >= 1}
        lowercase
        className="hotelName"
        text="Hotel"
      >
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

  getPrimaryButtonContent = () => {
    if (this.props.apiRequestIsPending) {
      return 'Saving...';
    }
    return this.isEditMode() ? 'Save Edits' : 'Create';
  };

  renderStatus = () => {
    if (this.props.hasValidationErrors && !this.props.offerIsPristine) {
      return (
        <div className="offerError">
          <p>
            There are {this.props.offerValidationErrorCount} problems(s) with this offer. Please fix the problems and
            try again.
          </p>
        </div>
      );
    }

    if (this.props.hasApiError) {
      return (
        <div className="offerError">
          <p>Unable to save this offer. Please try again. If the problem persists, please contact Pure Escapes.</p>
        </div>
      );
    }

    if (this.props.showSuccessConfirmation) {
      return (
        <div className="offerConfirmation">
          <p>Offer saved successfully.</p>
        </div>
      );
    }
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
        <section className="basicInfo">
          {this.renderHotelName()}
          <ErrorList className="hotelErrors">
            {!this.props.offerIsPristine &&
              this.props.validationErrors.hotelUuid.map((error, i) => <li key={i}>{error.message}</li>)}
          </ErrorList>

          <Label
            lowercase
            className="offerName"
            isError={!this.props.offerIsPristine && this.props.validationErrors.name.length >= 1}
            text="Offer Name"
          >
            <TextInput
              className="offerNameInput"
              value={this.props.offerName}
              onChange={this.handleNameChange}
              placeholder="Offer Name"
            />
          </Label>
          <ErrorList className="offerNameErrors">
            {!this.props.offerIsPristine &&
              this.props.validationErrors.name.map((error, i) => <li key={i}>{error.message}</li>)}
          </ErrorList>

          <Label
            isError={!this.props.offerIsPristine && this.props.validationErrors.termsAndConditions.length >= 1}
            lowercase
            className="termsAndConditions"
            text="Terms & Conditions"
          >
            <TextArea className="termsInput" value={this.props.offerTerms} onChange={this.handleTermsChange} />
          </Label>
          <ErrorList className="termsAndConditionsErrors">
            {!this.props.offerIsPristine &&
              this.props.validationErrors.termsAndConditions.map((error, i) => <li key={i}>{error.message}</li>)}
          </ErrorList>

          <Label
            isError={!this.props.offerIsPristine && this.props.validationErrors.furtherInformation.length >= 1}
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
          <ErrorList className="furtherInformationErrors">
            {!this.props.offerIsPristine &&
              this.props.validationErrors.furtherInformation.map((error, i) => <li key={i}>{error.message}</li>)}
          </ErrorList>

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
          <RouteTab
            replace
            isError={!this.props.offerIsPristine && this.props.hasPrerequisiteErrors}
            to={`${this.props.match.url}/pre-requisites`}
          >
            Prerequisites
          </RouteTab>
          <RouteTab
            replace
            isError={!this.props.offerIsPristine && this.props.hasApplicationsErrors}
            to={`${this.props.match.url}/applications`}
          >
            Applications
          </RouteTab>
          <RouteTab
            isError={!this.props.offerIsPristine && this.props.hasCombinationsErrors}
            replace
            to={`${this.props.match.url}/combinations`}
          >
            Combinations
          </RouteTab>
          <RouteTab replace to={`${this.props.match.url}/priority`}>
            Priority
          </RouteTab>
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
            <Route
              exact
              path={`${this.props.match.url}/combinations`}
              component={OfferEditCombinationsContainerConnected}
            />
            <Route exact path={`${this.props.match.url}/priority`} component={OfferEditOrderingContainerConnected} />
          </Switch>
          <Route
            exact
            path={`${this.props.match.path}`}
            render={() => <Redirect to={`${this.props.match.url}/pre-requisites`} />}
          />
        </div>

        <ButtonBar className="actions">
          {/* I'll come back to this late */}
          {this.isEditMode() && <SecondaryButton onClick={this.handleClearChanges}>Clear Changes</SecondaryButton>}
          <ButtonSpacer />
          <PrimaryButton
            className="saveButton"
            disabled={this.props.apiRequestIsPending}
            onClick={this.handleSaveButtonClick}
          >
            {this.getPrimaryButtonContent()}
          </PrimaryButton>
        </ButtonBar>

        {this.renderStatus()}
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
  validationErrors: offerValidationSelector,
  hasPrerequisiteErrors: offerHasPrerequisitesValidationErrorsSelector,
  hasApplicationsErrors: offerHasApplicationsValidationErrorsSelector,
  hasCombinationsErrors: offerHasCombinationValidationErrorsSelector,
  hasValidationErrors: offerHasValidationErrorsSelector,
  offerIsPristine: offerIsPristineSelector,
  hasPerishableData: offerHasPerishableDataSelector,
  apiRequestIsPending: apiRequestIsPendingSelector,
  hasApiError: hasApiErrorSelector,
  offerValidationErrorCount: offerValidationErrorCountSelector,
  showSuccessConfirmation: showSuccessConfirmationSelector,
  cachedOfferSuccessAction: cachedOfferSuccessActionSelector,
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
  setOfferIsPristineAction,
  resetOfferChangesAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IOfferEditProps>(mapStateToProps, mapDispatchToProps);

export const OfferEditContainerConnected = compose(withConnect, withRouter, withBootstapData())(OfferEditContainer);
