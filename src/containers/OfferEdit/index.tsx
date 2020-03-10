import React, { FormEvent } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { MultiDateRange } from '../../pureUi/forms/MultiDateRange/index';
import { Text } from 'pureUi/typography';
import Label from '../../pureUi/Label/index';
import TextInput from '../../pureUi/TextInput/index';
import TextArea from '../../pureUi/Textarea/index';
import Checkbox from 'pureUi/Checkbox';
import { Fieldset, Legend } from '../../pureUi/forms/Fieldset/index';

import {
  getOfferRequestIsPendingSelector,
  offerSelector,
  offerErrorSelector,
} from '../../store/modules/offer/selectors';
import { getOfferRequestAction } from '../../store/modules/offer/actions';
import { OfferEditStyles } from './OffereditStyles';

export interface IState {
  dateRanges: string[][];
}

export class OfferEditContainer extends React.Component<IOfferEditProps, IState> {
  state = {
    dateRanges: [[]],
  };

  handleDateChange = (dates: string[][]) => {
    this.setState({ dateRanges: dates });
  };

  handleNewDate = () => {
    this.setState({ dateRanges: [...this.state.dateRanges, []] });
  };

  handleRemoveDate = (idx: number) => {
    console.log('remove at index', idx);
    this.setState({ dateRanges: this.state.dateRanges.filter((_, i) => i !== idx) });
  };

  componentWillMount() {
    this.props.getOfferRequestAction(this.props.match.params.offerId);
  }

  render() {
    {
      this.props.error && <p>There was a problem loading Offer:{this.props.match.params.offerId}</p>;
    }
    {
      this.props.offer && <p>Offer:{this.props.match.params.offerId} loaded succesfully</p>;
    }

    return (
      <OfferEditStyles>
        {this.props.getOfferRequestPending && (
          <p data-role="loadingMessage">Loading offer {this.props.match.params.offerId}</p>
        )}

        <section className="basicInfo">
          <Label className="hotelSelect" text="Hotel">
            <select className="hotelSelectInput" placeholder="Select a hotel">
              <option value="1">Hotel 1</option>
              <option value="2">Hotel 2</option>
            </select>
          </Label>
          <Label className="offerNameInput" text="Offer Name">
            <TextInput className="offerNameInput" placeholder="Offer Name" />
          </Label>
          <Label className="termsAndConditions" text="Terms & Conditions">
            <TextArea className="termsInput" />
          </Label>
          <Label className="furtherInformation" text="Further Information">
            <TextArea className="furtherInformationInput" />
          </Label>
          <Label className="textOnly" inline reverse text="Text Only">
            <Checkbox className="textOnlyCheckbox" disabled checked />
          </Label>
          <Text className="textOnlyInfo">Does not change the price of any product.</Text>
          <Label className="preDiscount" inline reverse text="Pre Discount">
            <Checkbox className="preDiscountCheckbox" disabled />
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
              dateRanges={this.state.dateRanges}
              onDateChange={this.handleDateChange}
              onNewDate={this.handleNewDate}
              onRemoveDate={this.handleRemoveDate}
            />
          </Fieldset>
        </section>
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
});

const actionCreators = {
  getOfferRequestAction,
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
