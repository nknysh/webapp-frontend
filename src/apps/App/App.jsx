import React from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import getRoutes from 'routing';
import routes from 'routing/app';

import { useScrollToTop, useTokenFromWindow } from 'effects';
import { Layout } from 'layouts/Layout';
import { ErrorBoundary } from 'hoc/ErrorBoundary';

import { propTypes, defaultProps } from './App.props';
import connect from './App.state';

export const App = ({ location: { pathname }, setToken }) => {
  useTokenFromWindow(setToken);
  useScrollToTop([pathname]);

  return (
    <Layout>
      <Switch>{getRoutes(routes)}</Switch>
    </Layout>
  );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default compose(
  ErrorBoundary,
  withRouter,
  connect
)(App);
