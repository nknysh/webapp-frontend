// Libraries
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// App
import { isAuthLoading, isAuthenticated, getCurrentUser } from 'selectors/auth';

const DefaultRedirect = (props) => (
  <Redirect
    to={{
      pathname: '/login',
      state: {
        from: props.location,
      },
    }}
  />
);

const AuthenticatedRoute = (props) => {
  const { isAuthLoading, currentUser, component, getComponent, ...rest } = props;

  return (
    <Route
      {...rest}
      render={routeProps => {
        if (isAuthLoading) {
          return <div />;
        }

        const Component = getComponent(props);
        return (
          <Component
            {...routeProps}
            currentUser={currentUser}
          />
        );
      }}
    />
  );
};

AuthenticatedRoute.propTypes = {
  getComponent: PropTypes.func,
};

AuthenticatedRoute.defaultProps = {
  getComponent: (props) => props.isAuthenticated ? props.component : DefaultRedirect,
};

const mapStateToProps = (state) => ({
  isAuthenticated: isAuthenticated(state),
  isAuthLoading: isAuthLoading(state),
  currentUser: getCurrentUser(state),
});

export default connect(mapStateToProps)(AuthenticatedRoute);
