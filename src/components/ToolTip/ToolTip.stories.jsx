import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import ToolTip from './ToolTip';

storiesOf('ToolTip', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return <ToolTip>Tooltip text</ToolTip>;
  });
