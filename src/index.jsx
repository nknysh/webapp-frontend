import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'store';

import getRoutes from 'routing';
import appRoutes from 'routing/routes/apps';

import './styles/fonts/HurmeGeometricSans2.css';
import { GlobalStyle, GlobalFonts } from 'styles/global';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <GlobalFonts />
    <GlobalStyle />
    <BrowserRouter>
      <Switch>{getRoutes(appRoutes)}</Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);
registerServiceWorker();
