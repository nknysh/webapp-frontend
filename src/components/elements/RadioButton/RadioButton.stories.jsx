import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import RadioButton from './RadioButton';

storiesOf('RadioButton', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <RadioButton options={[{ value: 'true', label: 'An option' }]} />;
  });
