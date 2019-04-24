import React from 'react';
import { range } from 'ramda';

import { mapWithIndex } from 'utils';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, boolean } from '@storybook/addon-knobs';

import Tabs from './Tabs';

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const items = number('Number of crumbs', 2, {
      range: true,
      min: 1,
      max: 5,
      step: 1,
    });

    const renderLabel = number => `Crumb ${number}`;
    const renderContent = number => <h1>Content {number}</h1>;

    return (
      <Tabs centered={boolean('Centered', false)} labels={mapWithIndex(renderLabel, range(0, items))}>
        {mapWithIndex(renderContent, range(0, items))}
      </Tabs>
    );
  });
