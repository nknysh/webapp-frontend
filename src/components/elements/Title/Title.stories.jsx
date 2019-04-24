import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Title from './Title';

storiesOf('Title', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Title>{text('Title', 'A Title')}</Title>;
  });
