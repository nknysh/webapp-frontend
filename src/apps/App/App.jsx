import React, { useEffect, useState, Fragment } from 'react';
import { Switch, withRouter } from 'react-router-dom';
import { compose } from 'ramda';

import getRoutes from 'routing';
import routes from 'routing/app';

import { Layout } from 'layouts/Layout';
import { ErrorBoundary } from 'hoc/ErrorBoundary';
import { getToken } from 'utils/auth';
import { windowExists } from 'utils/window';

import { propTypes, defaultProps } from './App.props';
import connect from './App.state';

const scrollToTop = () => {
  if (windowExists.scrollTo) {
    windowExists.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }
};

export const App = () => {
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const newToken = getToken(windowExists);
    if (newToken !== token) {
      setToken(newToken);
    }
    scrollToTop();
  });

  return (
    <Fragment>
      <Layout>
        <Switch>{getRoutes(routes)}</Switch>
      </Layout>
    </Fragment>
  );
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;

export default compose(
  ErrorBoundary,
  withRouter,
  connect
)(App);
