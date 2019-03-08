import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import FormFieldError from './FormFieldError';

storiesOf('Form: Field Error', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <FormFieldError>{text('Message', 'This value is required')}</FormFieldError>;
  });
