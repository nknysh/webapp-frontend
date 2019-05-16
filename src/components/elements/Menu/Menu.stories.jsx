import React from 'react';
import { prop } from 'ramda';
import { BrowserRouter, Switch } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import headerLinks from 'config/links/header';

import Menu from './Menu';

const withRouter = child => (
  <BrowserRouter>
    <Switch>{child}</Switch>
  </BrowserRouter>
);

storiesOf('Main Menu', module)
  .addDecorator(withKnobs)
  .add('default logged out', () => {
    return withRouter(<Menu links={object('Links', prop('default', headerLinks))} isAuthenticated={false} />);
  })
  .add('default logged in', () => {
    return withRouter(<Menu links={object('Links', prop('default', headerLinks))} isAuthenticated={true} />);
  });
