import React from 'react';
import { EUserType } from 'services/BackendApi';
import { RouteProps, Route, Redirect } from 'react-router';
import { withAuthentication } from 'hoc';

export const shouldRedirect = (props: AuthRouteOwnProps) => {
  const { allow, deny, isAuthenticated } = props;
  const role = props.role as EUserType;

  return !isAuthenticated
    || allow && !allow.includes(role)
    || deny && deny.includes(role)
    || false;

};

export const AuthRoute = (props: AuthRouteProps) => {
  const { render, component: Component, children, ...rest } = props;
  
  const authRender = renderProps => {
    if(shouldRedirect(props)) {
      return <Redirect to="/login" />;
    }

    if(render){
      return render(renderProps);
    }

    if(Component){
      return <Component {...renderProps} />;
    }

    return children;
  };

  return <Route render={authRender} {...rest}/>;
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