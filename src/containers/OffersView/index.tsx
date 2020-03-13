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
  offerErrorSelector,
  getAssociatedOffersMappingSelector,
  getAssociatedProductsMappingSelector,
  getOffersOnHotelSelector,
} from '../../store/modules/offer/selectors';
import { getOfferRequestAction } from '../../store/modules/offer/actions';
import { TabBar, RouteTab } from '../../pureUi/TabBar';
import { RouteComponentProps, Route, Switch, Redirect } from 'react-router-dom';

export const _ReadOnlyField = props => {
  const { label, children, className } = props;
  return (
    <div className={className}>
      <label className="primary">{label}</label>
      {children}
    </div>
  );
};
export const ReadOnlyField = styled(_ReadOnlyField)`
  border: 1px solid #cbd5e0;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 8px;
  margin-bottom: 16px;
  &:last-of-type {
    margin-bottom: 0px;
  }
  div {
    margin-bottom: 16px;
    &:last-of-type {
      margin-bottom: 0px;
    }
  }
  label {
    display: block;
    color: #4a5568;
    margin-bottom: 4px;
    &.primary {
      font-size: 12px;
      color: #4a5568;
      margin-bottom: 8px;
    }
  }
`;

export class _OffersView extends React.Component<IOffersViewProps, {}> {
  componentDidMount() {
    if (!this.props.offer || this.props.offer!.uuid !== this.props.match.params.id) {
      this.props.getOfferRequestAction(this.props.match.params.id, true);
    }
  }

  render() {
    if (this.props.offerRequestIsPending || this.props.offer == null) {
      return <p>Loading...</p>;
    }

    if (this.props.offerError) {
      return <p>There was a problem loading this offer. Please refresh the page to try again.</p>;
    }

    const { url, path } = this.props.match;

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
        <h2>{this.props.offer.hotel.name}</h2>

        <TabBar>
          <RouteTab to={`${url}/details`}>Details</RouteTab>
          <RouteTab to={`${url}/pre-requisites`}>Pre Requisites</RouteTab>
          <RouteTab to={`${url}/applications`}>Applicaitons</RouteTab>
          <RouteTab to={`${url}/combination-ordering`}>Combination & Ordering</RouteTab>
        </TabBar>

        <Switch>
          <Route exact path={`${path}/details`} data-role="offer-view-offer-details-tab">
            <OfferDetailsSection offer={this.props.offer} offerMapping={this.props.associatedOffersMapping} />
          </Route>

          <Route exact path={`${path}/pre-requisites`} data-role="offer-view-prerequisites-tab">
            <PrerequisitesSection offer={this.props.offer} productMapping={this.props.associatedProductsMapping} />
          </Route>

          <Route exact path={`${path}/applications`} data-role="offer-view-applications-tab">
            <ApplicationsSection offer={this.props.offer} productMapping={this.props.associatedProductsMapping} />
          </Route>

          <Route exact path={`${path}/combination-ordering`} data-role="offer-view-combination-and-ordering-tab">
            <CombinationAndOrderingSection offer={this.props.offer} offersOnHotel={this.props.offersOnHotel} />
          </Route>

          {/* Default route */}
          <Redirect from="/" to={`${url}/details`} />
        </Switch>
      </main>
    );
  }
}

const OffersView = styled(_OffersView)`
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
  id: string;
}

export interface IOffersViewProps extends StateToProps, DispatchToProps, RouteComponentProps<IRouteParams> {
  className: string; // from styled components
  actingCountryCode: string;
}

const mapStateToProps = createStructuredSelector({
  actingCountryCode: getUserCountryContext,
  offerRequestIsPending: getOfferRequestIsPendingSelector,
  offer: offerSelector,
  offerError: offerErrorSelector,
  associatedOffersMapping: getAssociatedOffersMappingSelector,
  associatedProductsMapping: getAssociatedProductsMappingSelector,
  offersOnHotel: getOffersOnHotelSelector,
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actionCreators, dispatch);

const withConnect = connect<StateToProps, DispatchToProps, IOffersViewProps>(
  mapStateToProps,
  mapDispatchToProps
);

export const OffersViewConnected = compose(withConnect)(OffersView);

export default OffersViewConnected;
