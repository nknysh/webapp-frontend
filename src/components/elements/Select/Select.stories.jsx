import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Select from './Select';

storiesOf('Select', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Select />;
  });
