import React, { Suspense } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { compose, prop } from 'ramda';

import { getAppRoutes } from 'routing';

import { useScrollToTop, useEffectBoundary } from 'effects';
import { Loader } from 'components/elements';
import { Layout } from 'components/layouts/Layout';
import { ErrorBoundary, withUser } from 'hoc';

import { propTypes, defaultProps } from './App.props';
import connect from './App.state';

export const App = ({ location: { pathname }, user, resetStatuses }) => {
  useScrollToTop(pathname);

  useEffectBoundary(() => {
    resetStatuses();
  }, [pathname]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Switch>{getAppRoutes(prop('type', user))}</Switch>
      </Suspense>
    </Layout>
  );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default compose(
  ErrorBoundary,
  withRouter,
  withUser,
  connect
)(App);
