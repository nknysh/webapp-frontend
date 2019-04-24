import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';

import DropDownContent from './DropDownContent';

storiesOf('Drop Down Content', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <DropDownContent
        showRawInput={boolean('Show raw input', false)}
        showRenderChildren={boolean('Show children', true)}
        showArrow={boolean('Show arrow', true)}
      >
        {text('Content', 'rendered content')}
      </DropDownContent>
    );
  });
