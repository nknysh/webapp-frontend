import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Loader from './Loader';

storiesOf('Loader', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Loader text={text('Loading text')} isLoading={boolean('Is Loading', true)}>
        {text('Content to load', 'Load this content')}
      </Loader>
    );
  });
