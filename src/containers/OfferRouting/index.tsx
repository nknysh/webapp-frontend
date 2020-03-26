import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import OffersViewConnected from '../OffersView/index';
import { OfferEditContainerConnected } from 'containers/OfferEdit';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router';

export interface OfferRoutingProps extends RouteComponentProps {}

export const OfferRoutingComponent = (props: OfferRoutingProps) => {
  return (
    <Switch>
      <Route
        path={[`${props.match.path}/:offerId/edit`, `${props.match.path}/create`]}
        component={OfferEditContainerConnected}
      />
      <Route path={`${props.match.path}/:offerId/view`} component={OffersViewConnected} />
    </Switch>
  );
};

export const OfferRouting = compose(withRouter)(OfferRoutingComponent);
