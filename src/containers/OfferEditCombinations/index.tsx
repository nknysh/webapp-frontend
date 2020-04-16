import React, { FormEvent } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { OfferEditCombinationStyles } from './OfferEditCombinationStyles';
import { PureSelect } from '../../pureUi/forms/PureSelect/index';
import { FormControlGrid } from '../../pureUi/forms/FormControlGrid/index';
import Checkbox from 'pureUi/Checkbox';
import Label from 'pureUi/Label';
import { Text } from 'pureUi/typography';
import { ECombinationMode } from '../../store/modules/offer/model';

import {
  combinationModeSelector,
  getOffersOnHotelSelector,
  offerHotelUuidSelector,
  offerValidationSelector,
  offerIsPristineSelector,
} from '../../store/modules/offer/selectors';
import { ErrorList } from 'pureUi/ErrorList';

import { offerSetCombinationMode, offerToggleOfferInCombinationList } from '../../store/modules/offer/actions';
import { combinationListSelector } from '../../store/modules/offer/subdomains/uiState/selectors';

export class OfferEditCombinationsContainer extends React.Component<IOfferEditOrderingProps, {}> {
  showOfferList = () =>
    this.props.combinationMode === ECombinationMode.COMBINES_WITH_LIST ||
    this.props.combinationMode === ECombinationMode.CANNOT_COMBINE_WITH_LIST;

  handleCombinationModeChange = (e: FormEvent<HTMLSelectElement>) =>
    this.props.offerSetCombinationMode(e.currentTarget.value as ECombinationMode);

  handleToggleOffer = (uuid: string) => (e: FormEvent<HTMLInputElement>) => {
    this.props.offerToggleOfferInCombinationList(uuid, e.currentTarget.checked);
  };

  render() {
    if (!this.props.hotelUuid) {
      return <Text className="noHotel">Select a hotel to set combinations.</Text>;
    }
    return (
      <React.Fragment>
        <OfferEditCombinationStyles>
          <PureSelect value={this.props.combinationMode} onChange={this.handleCombinationModeChange}>
            <option value={ECombinationMode.COMBINES_WITH_ANY}>Combines with any offer</option>
            <option value={ECombinationMode.COMBINES_WITH_NONE}>Does not combine with any offers</option>
            <option value={ECombinationMode.COMBINES_WITH_LIST}>Only combines with these offers...</option>
            <option value={ECombinationMode.CANNOT_COMBINE_WITH_LIST}>Combines with any offers, excluding...</option>
          </PureSelect>

          {this.showOfferList() && (
            <FormControlGrid className="offerGrid" columnCount={2}>
              {this.props.combinationList.map(offer => {
                return (
                  <Label key={offer.uuid} text={offer.label} lowercase inline reverse>
                    <Checkbox checked={offer.value} onChange={this.handleToggleOffer(offer.uuid)} />
                  </Label>
                );
              })}
            </FormControlGrid>
          )}
        </OfferEditCombinationStyles>
        <ErrorList>
          {!this.props.offerIsPristine &&
            this.props.validationErrors.combinations.map((error, i) => <li key={i}>{error.message}</li>)}
        </ErrorList>
      </React.Fragment>
    );
  }
}

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------
export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;
export interface IOfferEditOrderingProps extends StateToProps, DispatchToProps {}

const mapStateToProps = createStructuredSelector({
  hotelUuid: offerHotelUuidSelector,
  combinationMode: combinationModeSelector,
  combinationList: combinationListSelector,
  validationErrors: offerValidationSelector,
  offerIsPristine: offerIsPristineSelector,
});

const actionCreators = {
  offerSetCombinationMode,
  offerToggleOfferInCombinationList,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

// -----------------------------------------------------------------------------
// Connected
// -----------------------------------------------------------------------------
const withConnect = connect<StateToProps, DispatchToProps, IOfferEditOrderingProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const OfferEditCombinationsContainerConnected = withConnect(OfferEditCombinationsContainer);
