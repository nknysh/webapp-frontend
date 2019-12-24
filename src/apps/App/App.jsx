import React, { Suspense } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose, prop } from 'ramda';
import { ErrorBoundary, Loader } from '@pure-escapes/webapp-ui-components';

import { getAppRoutes } from 'routing';

import { Layout } from 'components';
import { useScrollToTop, useEffectBoundary } from 'effects';
import { withUser } from 'hoc';

import { propTypes, defaultProps } from './App.props';
import connect from './App.state';
import { FastSearchContainerConnected } from 'containers/FastSearch';
import { ProposalListConnected } from 'containers/ProposalList';

export const App = ({ location: { pathname }, user, resetStatuses, pageChange }) => {
  // Scroll to top on path change
  useScrollToTop(pathname);

  useEffectBoundary(() => {
    // Trigger page change action on pathname change
    pageChange(pathname);

    // Reset statuses on page change
    resetStatuses();
  }, [pathname]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/search/beta" exact component={FastSearchContainerConnected} />
          <Route path="/proposals" exact component={ProposalListConnected} />

          {...getAppRoutes(prop('type', user))}
        </Switch>
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
