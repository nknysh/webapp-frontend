import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import OfflinePluginRuntime from 'offline-plugin/runtime';

import store from 'store';

import headerMeta from 'config/meta';
import headerLink from 'config/link';

import getRoutes from 'routing';
import appRoutes from 'routing/routes/apps';

import { GlobalStyle, GlobalFonts } from 'styles/global';

import './styles/fonts/HurmeGeometricSans2.css';
import './styles/fonts/NoeDisplay.css';

if (process.env.NODE_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

ReactDOM.render(
  <Provider store={store}>
    <Helmet>
      {headerMeta}
      {headerLink}
    </Helmet>
    <GlobalFonts />
    <GlobalStyle />
    <BrowserRouter>
      <Switch>{getRoutes(appRoutes)}</Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

OfflinePluginRuntime.install();
