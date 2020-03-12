import React, { FormEvent } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MultiDateRange } from 'pureUi/forms/MultiDateRange/index';
import { Text } from 'pureUi/typography';
import Label from 'pureUi/Label/index';
import TextInput from 'pureUi/TextInput/index';
import TextArea from 'pureUi/Textarea/index';
import Checkbox from 'pureUi/Checkbox';
import { Fieldset, Legend } from 'pureUi/forms/Fieldset/index';

import {
  offerSelector,
  offerErrorSelector,
  offerStayBetweenPrerequisitesSelector,
  offerNameSelector,
  offerHotelUuidSelector,
  offerTermsSelector,
  offerFurtherInformationSelector,
} from 'store/modules/offer/selectors';
import { getOfferRequestAction } from 'store/modules/offer/actions';

import { OfferEditStyles } from './OffereditStyles';
import {
  offerRemoveStayBetweenPrerequisiteAction,
  offerNameChangeAction,
  offerTermsChangeAction,
  offerFurtherInformationChangeAction,
  offerAddStayBetweenPrerequisiteAction,
  offerChangeStayBetweenPrerequisiteAction,
} from 'store/modules/offer/subdomains/offer/actions';
import { PrimaryButton, SecondaryButton, ButtonBar, ButtonSpacer } from 'pureUi/Buttons';
import { getOfferRequestIsPendingSelector } from 'store/modules/offer/selectors';
import { hotelNameSelector, offerPreDiscountSelector } from '../../store/modules/offer/subdomains/offer/selectors';
import { offerDomainIsTextOnlySelector } from '../../store/modules/offer/subdomains/uiState/selectors';
import { setOfferIsTextOnly } from '../../store/modules/offer/subdomains/uiState/actions';
import { offerSetPreDiscountAction } from '../../store/modules/offer/subdomains/offer/actions';

export class OfferEditContainer extends React.Component<IOfferEditProps, {}> {
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
    this.props.offerChangeStayBetweenPrerequisiteAction(dates);
  };

  handleNewDate = () => {
    this.props.offerAddStayBetweenPrerequisiteAction();
  };

  handleRemoveDate = (idx: number) => {
    this.props.offerRemoveStayBetweenPrerequisiteAction(idx);
  };

  togglePreDiscount = () => this.props.offerSetPreDiscountAction(!this.props.isPreDiscount);

  toggleTextOnly = () => this.props.setOfferIsTextOnly(!this.props.isTextOnly);

  componentWillMount() {
    this.props.getOfferRequestAction(this.props.match.params.offerId, true);
  }

  renderHotelName = () => {
    if (this.props.match.path.includes('edit')) {
      return <h1 className="hotelName">{this.props.hotelName}</h1>;
    }

    return (
      <Label className="hotelName" text="Hotel">
        <select className="hotelSelectInput" placeholder="Select a hotel">
          <option value="1">Hotel 1</option>
          <option value="2">Hotel 2</option>
        </select>
      </Label>
    );
  };

  render() {
    if (this.props.getOfferRequestPending) {
      return (
        <OfferEditStyles>
          <h1>Loading</h1>
        </OfferEditStyles>
      );
    }

    if (this.props.error) {
      return (
        <OfferEditStyles>
          <h1>There was a problem loading Offer:{this.props.match.params.offerId}</h1>
        </OfferEditStyles>
      );
    }

    return (
      <OfferEditStyles>
        {this.props.getOfferRequestPending && (
          <p data-role="loadingMessage">Loading offer {this.props.match.params.offerId}</p>
        )}

        <section className="basicInfo">
          {this.renderHotelName()}

          <Label className="offerNameInput" text="Offer Name">
            <TextInput
              className="offerNameInput"
              value={this.props.offerName}
              onChange={this.handleNameChange}
              placeholder="Offer Name"
            />
          </Label>

          <Label className="termsAndConditions" text="Terms & Conditions">
            <TextArea className="termsInput" value={this.props.offerTerms} onChange={this.handleTermsChange} />
          </Label>

          <Label
            className="furtherInformation"
            text={`Further Information ${this.props.isTextOnly ? `(Required)` : ''}`}
          >
            <TextArea
              className="furtherInformationInput"
              value={this.props.offerFurtherInformation}
              onChange={this.handleFurtherInfoChange}
            />
          </Label>

          <Label className="textOnly" inline reverse text="Text Only">
            <Checkbox
              className="textOnlyCheckbox"
              checked={this.props.isTextOnly}
              onChange={this.toggleTextOnly}
              disabled
            />
          </Label>

          <Text className="textOnlyInfo">Does not change the price of any product.</Text>

          <Label className="preDiscount" inline reverse text="Pre Discount">
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
        </section>

        <ButtonBar className="actions">
          <SecondaryButton>Clear Changes</SecondaryButton>
          <ButtonSpacer />
          <PrimaryButton>Save Changes</PrimaryButton>
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

export interface IOfferEditProps extends StateToProps, DispatchToProps, RouteComponentProps<IRouteParams> {
  className?: string;
}

const mapStateToProps = createStructuredSelector({
  getOfferRequestPending: getOfferRequestIsPendingSelector,
  offer: offerSelector,
  error: offerErrorSelector,
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
  offerAddStayBetweenPrerequisiteAction,
  offerChangeStayBetweenPrerequisiteAction,
  offerRemoveStayBetweenPrerequisiteAction,
  offerNameChangeAction,
  offerTermsChangeAction,
  offerFurtherInformationChangeAction,
  setOfferIsTextOnly,
  offerSetPreDiscountAction,
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
  withRouter
)(OfferEditContainer);
