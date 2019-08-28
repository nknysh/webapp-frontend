import React, { Suspense } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { compose, prop } from 'ramda';
import { ErrorBoundary, Loader } from '@pure-escapes/webapp-ui-components';

import { getAppRoutes } from 'routing';

import { Layout } from 'components';
import { useScrollToTop, useEffectBoundary } from 'effects';
import { withUser } from 'hoc';

import { propTypes, defaultProps } from './App.props';
import connect from './App.state';

export const App = ({ location: { pathname }, user, resetStatuses, pageChange }) => {
  useScrollToTop(pathname);

  useEffectBoundary(() => {
    pageChange(pathname);
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
