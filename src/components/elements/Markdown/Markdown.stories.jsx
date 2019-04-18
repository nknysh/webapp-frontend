import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Markdown from './Markdown';

storiesOf('Markdown', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Markdown>{text('Markdown', '### Some markdown')}</Markdown>;
  });
