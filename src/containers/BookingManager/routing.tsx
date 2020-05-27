import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { BookingManagerContainerConnected } from './';
import { compose } from 'redux';
import { RouteComponentProps } from 'react-router';

export interface IBookingManagerRouting extends RouteComponentProps {}

const BookingManagerRoutingComponent = (props: IBookingManagerRouting) => {
  return (
    <Switch>
      <Route path={`${props.match.path}/:bookingUuid`} component={BookingManagerContainerConnected} />
    </Switch>
  );
};

export const BookingManagerRouting = compose(withRouter)(BookingManagerRoutingComponent);
