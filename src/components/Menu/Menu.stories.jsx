import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import headerLinks from 'config/links/header--authenticated';

import Menu from './Menu';

const withRouter = child => (
  <BrowserRouter>
    <Switch>{child}</Switch>
  </BrowserRouter>
);

storiesOf('Main Menu', module)
  .addDecorator(withKnobs)
  .add('default logged out', () => {
    return withRouter(<Menu links={object('Links', headerLinks)} isAuthenticated={false} />);
  })
  .add('default logged in', () => {
    return withRouter(<Menu links={object('Links', headerLinks)} isAuthenticated={true} />);
  });
