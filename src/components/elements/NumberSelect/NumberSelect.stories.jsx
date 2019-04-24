import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import NumberSelect from './NumberSelect';

storiesOf('NumberSelect', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <NumberSelect />;
  });
