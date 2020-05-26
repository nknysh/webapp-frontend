import React, { Suspense, useEffect } from 'react';
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
import { RatesImportContainerConnected } from 'containers/RatesImport';
import { AllotmentsImportContainerConnected } from 'containers/AllotmentsImport';
import { OfferRouting } from 'containers/OfferRouting';
import { AuthRoute } from 'containers/AuthRoute';
import { EUserType } from 'services/BackendApi';

export const App = ({
  location: { pathname },
  user,
  resetStatuses,
  pageChange,
  bootstrapAppRequestAction,
  isAppVersionDeprecated,
}) => {
  // Scroll to top on path change
  useScrollToTop(pathname);

  useEffect(() => {
    bootstrapAppRequestAction();
  }, [bootstrapAppRequestAction]);

  useEffectBoundary(() => {
    // Trigger page change action on pathname change
    pageChange(pathname);

    // Reset statuses on page change
    resetStatuses();
  }, [pathname]);

  return (
    <Layout isAppVersionDeprecated={isAppVersionDeprecated}>
      <Suspense fallback={<Loader />}>
        <Switch>
          <Route path="/search/beta" exact component={FastSearchContainerConnected} />
          <Route path="/offers" component={OfferRouting} />
          <AuthRoute allow={[EUserType.RL, EUserType.ADMIN]} exact path="/rates/import" component={RatesImportContainerConnected} />
          <AuthRoute allow={[EUserType.RL, EUserType.ADMIN]} exact path="/allotments/import" component={AllotmentsImportContainerConnected} />
          {...getAppRoutes(prop('type', user))}
        </Switch>
      </Suspense>
    </Layout>
  );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default compose(ErrorBoundary, withRouter, withUser, connect)(App);
