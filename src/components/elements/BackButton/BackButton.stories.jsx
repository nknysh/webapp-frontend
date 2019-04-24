import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import BackButton from './BackButton';

storiesOf('BackButton', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <BackButton>{text('Button text', 'Back home')}</BackButton>;
  });
