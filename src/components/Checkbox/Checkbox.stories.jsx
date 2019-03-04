import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Checkbox from './Checkbox';

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Checkbox />;
  });
