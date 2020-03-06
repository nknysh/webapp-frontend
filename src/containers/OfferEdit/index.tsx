import React, { FormEvent } from 'react';
import { compose, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import {
  getOfferRequestIsPendingSelector,
  offerSelector,
  offerErrorSelector,
} from '../../store/modules/offer/selectors';
import { getOfferRequestAction } from '../../store/modules/offer/actions';

export class OfferEditContainer extends React.PureComponent<IOfferEditProps, {}> {
  componentWillMount() {
    this.props.getOfferRequestAction(this.props.match.params.offerId);
  }

  render() {
    return (
      <div>
        <h1 data-role="heading">Edit Offer</h1>
        {this.props.getOfferRequestPending && (
          <p data-role="loadingMessage">Loading offer {this.props.match.params.offerId}</p>
        )}
        {this.props.error && <p>There was a problem loading Offer:{this.props.match.params.offerId}</p>}
        {this.props.offer && <p>Offer:{this.props.match.params.offerId} loaded succesfully</p>}
      </div>
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
