import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch, compose } from 'redux';
import { getUserCountryContext } from 'store/modules/auth';
import { createStructuredSelector } from 'reselect';
import { Breadcrumbs } from 'components';
import { OfferDetailsSection } from './OfferDetailsSection';
import { PrerequisitesSection } from './PrerequisitesSection';
import { ApplicationsSection } from './ApplicationsSection';
import { CombinationAndOrderingSection } from './CombinationAndOrderingSection';
import { Back } from '../BookingContainer/BookingContainer.styles';
import {
  getOfferRequestIsPendingSelector,
  offerSelector,
  getOfferErrorSelector,
  getAssociatedOffersMappingSelector,
  getAssociatedProductsMappingSelector,
  getOffersOnHotelSelector,
  hotelNameSelector,
} from '../../store/modules/offer/selectors';
import { getOfferRequestAction } from '../../store/modules/offer/actions';
import { TabBar, RouteTab } from '../../pureUi/TabBar';
import { RouteComponentProps, Route, Switch, Redirect, withRouter } from 'react-router-dom';

export class OffersViewComponent extends React.Component<IOffersViewProps, {}> {
  componentWillMount() {
    if (!this.props.offer || this.props.offer!.uuid !== this.props.match.params.offerId) {
      this.props.getOfferRequestAction(this.props.match.params.offerId);
    }
  }

  render() {
    if (this.props.offerRequestIsPending || this.props.offer == null) {
      return <p>Loading...</p>;
    }

    if (this.props.offerError) {
      return <p>There was a problem loading this offer. Please refresh the page to try again.</p>;
    }

    const { url } = this.props.match;

    return (
      <main className={this.props.className}>
        <Breadcrumbs
          links={[
            {
              label: <Back>Offers</Back>,
              to: '/offers',
            },
            {
              label: this.props.offer.name,
              to: `/offers/${this.props.offer.uuid}`,
            },
          ]}
        />
        <h1>{this.props.offer.name}</h1>
        <h2>{this.props.hotelName}</h2>

        <TabBar>
          <RouteTab to={`${url}`}>Details</RouteTab>
          <RouteTab to={`${url}/pre-requisites`}>Pre Requisites</RouteTab>
          <RouteTab to={`${url}/applications`}>Applicaitons</RouteTab>
          <RouteTab to={`${url}/combination-ordering`}>Combination & Ordering</RouteTab>
        </TabBar>

        <Switch>
          <Route exact path={`${this.props.match.path}`} data-role="offer-view-offer-details-tab">
            <OfferDetailsSection offer={this.props.offer} offerMapping={this.props.associatedOffersMapping} />
          </Route>

          <Route exact path={`${this.props.match.path}/pre-requisites`} data-role="offer-view-prerequisites-tab">
            <PrerequisitesSection offer={this.props.offer} productMapping={this.props.associatedProductsMapping} />
          </Route>

          <Route exact path={`${this.props.match.path}/applications`} data-role="offer-view-applications-tab">
            <ApplicationsSection offer={this.props.offer} productMapping={this.props.associatedProductsMapping} />
          </Route>

          <Route
            exact
            path={`${this.props.match.path}/combination-ordering`}
            data-role="offer-view-combination-and-ordering-tab"
          >
            <CombinationAndOrderingSection offer={this.props.offer} offersOnHotel={this.props.offersOnHotel} />
          </Route>
        </Switch>
      </main>
    );
  }
}

const StyledOffersView = styled(OffersViewComponent)`
  width: 90%;
  max-width: 1280px;
  margin: 2rem 5%;
  align-self: center;

  padding: 16px;

  .application-product-block {
    border-left: 1px solid #ccc;
    margin-left: 24px;
    padding-left: 24px;
    margin-bottom: 16px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }

  .application-product-field-age-names {
    display: inline;
  }

  .ordering-section {
    li {
      padding: 8px;
      &.active {
        background-color: #e2e8f0;
      }
    }
  }
`;

const actionCreators = {
  getOfferRequestAction,
};

export type StateToProps = ReturnType<typeof mapStateToProps>;
export type DispatchToProps = typeof actionCreators;

export interface IRouteParams {
  offerId: string;
}

export interface IOffersViewProps extends StateToProps, DispatchToProps, RouteComponentProps<IRouteParams> {
  className: string; // from styled components
  actingCountryCode: string;
}

const mapStateToProps = createStructuredSelector({
  actingCountryCode: getUserCountryContext,
  offerRequestIsPending: getOfferRequestIsPendingSelector,
  offer: offerSelector,
  offerError: getOfferErrorSelector,
  associatedOffersMapping: getAssociatedOffersMappingSelector,
  associatedProductsMapping: getAssociatedProductsMappingSelector,
  offersOnHotel: getOffersOnHotelSelector,
  hotelName: hotelNameSelector,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

const withConnect = connect<StateToProps, DispatchToProps, IOffersViewProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const OffersViewConnected = compose(
  withConnect,
  withRouter
)(StyledOffersView);

export default OffersViewConnected;
