import React from 'react';
import { EUserType } from 'services/BackendApi';
import { RouteProps, Route, Redirect } from 'react-router';
import { withAuthentication } from 'hoc';
import { omit } from 'ramda';

export const shouldRedirect = (props: AuthRouteOwnProps) => {
  const { allow, deny, isAuthenticated } = props;
  const role = props.role as EUserType;

  return !isAuthenticated
    || allow && !allow.includes(role)
    || deny && deny.includes(role)
    || false;

};

export const AuthRoute = (props: AuthRouteProps) => {
  if(shouldRedirect(props)) {
    const noRenderProps = omit(['render', 'component', 'children'], props);

    return (
      <Route {...noRenderProps}>
        <Redirect to="/login" />
      </Route>
    );
  }
  
  return <Route {...props}/>;
};

// -----------------------------------------------------------------------------
// Prop Typings
// -----------------------------------------------------------------------------

interface AuthRouteOwnProps {
  allow?: EUserType[];
  deny?:  EUserType[];
  
  isAuthenticated: boolean;
  role?: string | null;
}

export interface AuthRouteProps extends AuthRouteOwnProps, RouteProps { 
}

const AuthRouteConnected = withAuthentication(AuthRoute);
export default AuthRouteConnected;