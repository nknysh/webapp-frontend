import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Helmet } from 'react-helmet';
// import OfflinePluginRuntime from 'offline-plugin/runtime';
import { ThemeProvider } from 'styled-components';
import { appendPortalElements } from 'utils/portals';

import 'store/modules/fastSearch';

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

appendPortalElements();

let hotjarId = undefined;
if (window.location.href.includes('qa.pure-escapes')) {
  hotjarId = '1785849';
} else if (window.location.href.includes('sandbox.pure-escapes')) {
  hotjarId = '1784172';
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Helmet>
        {headerMeta}
        {headerLink}

        {/* if we're on QA or sandbox, load in the hotjar code */}
        {hotjarId !== undefined && (
          <script type="text/javascript">{`
          (function(h, o, t, j, a, r) {
            h.hj =
              h.hj ||
              function() {
                (h.hj.q = h.hj.q || []).push(arguments);
              };
            h._hjSettings = { hjid: 1785849, hjsv: 6 };
            a = o.getElementsByTagName('head')[0];
            r = o.createElement('script');
            r.async = 1;
            r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
            a.appendChild(r);
          })(window, document, 'https://static.hotjar.com/c/hotjar-', '.js?sv=');
    `}</script>
        )}
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
