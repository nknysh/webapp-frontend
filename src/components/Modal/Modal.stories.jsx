import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import Modal from './Modal';

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <Modal open={boolean('Open', true)}>{text('Content to load', 'Load this content')}</Modal>;
  });
