import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';

import store from 'store';

import getRoutes from 'routing';
import appRoutes from 'routing/routes/apps';

import './styles/fonts/HurmeGeometricSans2.css';
import { GlobalStyle, GlobalFonts } from 'styles/global';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Helmet>
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    </Helmet>
    <GlobalFonts />
    <GlobalStyle />
    <BrowserRouter>
      <Switch>{getRoutes(appRoutes)}</Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
registerServiceWorker();
