import React from 'react';
import ReactDOM from 'react-dom';
import { Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
import * as Sentry from '@sentry/browser';
// import OfflinePluginRuntime from 'offline-plugin/runtime';
import { ThemeProvider } from 'styled-components';
import { appendPortalElements } from 'utils/portals';
import HotjarSnippet from 'integrations/hotjar/Snippet';
import DriftSnippet from 'integrations/drift/Snippet';

import 'store/modules/fastSearch';

import './config/i18n';

import store, { history } from 'store';

import { APP_ENV, SENTRY_DSN, SENTRY_ENV, HOTJAR_APP_ID, DRIFT_APP_ID } from 'config';

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

if (SENTRY_DSN) {
  // Sentry should handle "any uncaught exceptions triggered from your application"
  // https://docs.sentry.io/platforms/javascript/react/?platform=browser
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENV,
    release: SENTRY_ENV,
  });
}

appendPortalElements();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Helmet>
        {headerMeta}
        {headerLink}
      </Helmet>
      {HOTJAR_APP_ID && <HotjarSnippet appId={HOTJAR_APP_ID} />}
      {DRIFT_APP_ID && <DriftSnippet appId={DRIFT_APP_ID} />}
      <GlobalFonts />
      <GlobalStyle />
      <ConnectedRouter history={history}>
        <Switch>{getRoutes(entryRoutes)}</Switch>
      </ConnectedRouter>
    </Provider>
  </ThemeProvider>,
  document.getElementById('app')
);
