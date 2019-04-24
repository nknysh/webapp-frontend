import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Link from './Link';

const withRouter = child => (
  <BrowserRouter>
    <Switch>{child}</Switch>
  </BrowserRouter>
);

storiesOf('Link', module)
  .addDecorator(withKnobs)
  .add('default link', () => {
    return withRouter(<Link to={text('Path', '/')}>{text('Link Text', 'Default link')}</Link>);
  })
  .add('with dynamic variables', () => {
    return withRouter(
      <Link
        inverse={boolean('Inverse', false)}
        spaced={boolean('Spaced', false)}
        bold={boolean('Bold', false)}
        to={text('Path', '/')}
      >
        {text('Link Text', 'Default link')}
      </Link>
    );
  });
