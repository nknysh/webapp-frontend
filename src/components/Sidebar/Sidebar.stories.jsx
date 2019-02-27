import React from 'react';
import { repeat } from 'ramda';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, number } from '@storybook/addon-knobs';

import Sidebar from './Sidebar';

const testLink = <a key={Date.now()}>A Link</a>;

storiesOf('Sidebar', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Sidebar
        links={repeat(
          testLink,
          number('Number of items', 3, {
            range: true,
            min: 0,
            max: 10,
            step: 1,
          })
        )}
        title={text('Sidebar title', 'Sidebar')}
      />
    );
  })
  .add('with children', () => {
    return (
      <Sidebar title={text('Sidebar title', 'Sidebar')}>
        {repeat(
          testLink,
          number('Number of items', 3, {
            range: true,
            min: 0,
            max: 10,
            step: 1,
          })
        )}
      </Sidebar>
    );
  });
