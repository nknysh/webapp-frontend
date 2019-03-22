import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { range } from 'ramda';

import { mapWithIndex } from 'utils';

import { storiesOf } from '@storybook/react';
import { withKnobs, number, text } from '@storybook/addon-knobs';

import Breadcrumbs from './Breadcrumbs';

storiesOf('Breadcrumbs', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const renderBreadcrumb = number => ({
      label: `Crumb ${number}`,
      to: `/${number}`,
    });

    return (
      <BrowserRouter>
        <Breadcrumbs
          location={{ pathname: text('Current path', '/1') }}
          links={mapWithIndex(
            renderBreadcrumb,
            range(
              0,
              number('Number of crumbs', 2, {
                range: true,
                min: 1,
                max: 5,
                step: 1,
              })
            )
          )}
        />
      </BrowserRouter>
    );
  });
