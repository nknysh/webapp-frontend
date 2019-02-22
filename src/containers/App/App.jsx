import React, { PureComponent } from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import { compose } from 'ramda';

import routes from 'routing';
import { ErrorBoundary } from 'hoc/ErrorBoundary';
import { getToken } from 'utils/auth';
import { windowExists } from 'utils/window';

import { propTypes } from './App.props';
import connect from './App.state';
import './App.css';

export class App extends PureComponent {
  componentDidMount() {
    const { getUserFromToken } = this.props;
    const token = getToken(windowExists);

    if (token) {
      getUserFromToken(token);
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>{routes}</Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = propTypes;

export default compose(
  ErrorBoundary,
  connect
)(App);
