import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import DatePicker from './DatePicker';

storiesOf('Date Picker', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <DatePicker />;
  });
