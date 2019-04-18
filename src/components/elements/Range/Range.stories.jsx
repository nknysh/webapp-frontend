import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, object } from '@storybook/addon-knobs';

import Range from './Range';

storiesOf('Range', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Range min={number('Minimum', 0)} max={number('Maximum', 2000)} {...object('RC Slider props', {})} />;
  });
