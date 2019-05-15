import React, { Suspense } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import getRoutes from 'routing';
import routes from 'routing/app';

import { useScrollToTop, useTokenFromWindow, useEffectBoundary } from 'effects';
import { Loader } from 'components/elements';
import { Layout } from 'components/layouts/Layout';
import { ErrorBoundary } from 'hoc';

import { propTypes, defaultProps } from './App.props';
import connect from './App.state';

export const App = ({ location: { pathname }, setToken, resetStatuses }) => {
  useTokenFromWindow(setToken);
  useScrollToTop(pathname);

  useEffectBoundary(() => {
    resetStatuses();
  }, [pathname]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Switch>{getRoutes(routes)}</Switch>
      </Suspense>
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
