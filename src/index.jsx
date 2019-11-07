import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
// import OfflinePluginRuntime from 'offline-plugin/runtime';
import { ThemeProvider } from 'styled-components';

import './config/i18n';

import store from 'store';

import { APP_ENV } from 'config';
import headerMeta from 'config/meta';
import headerLink from 'config/link';
import entryRoutes from 'routing/entry';
import { getRoutes } from 'routing';

import { theme, GlobalStyle, GlobalFonts } from 'styles';

import './styles/fonts/HurmeGeometricSans2.css';
import './styles/fonts/NoeDisplay.css';

if (APP_ENV !== 'production') {
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React);
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Helmet>
        {headerMeta}
        {headerLink}
      </Helmet>
      <GlobalFonts />
      <GlobalStyle />
      <BrowserRouter>
        <Switch>{getRoutes(entryRoutes)}</Switch>
      </BrowserRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('app')
);

// APP_ENV === 'production' && OfflinePluginRuntime.install();
