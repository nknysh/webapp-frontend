import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';

import Hero from './Hero';

storiesOf('Hero Section', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const image = text(
      'Image',
      'http://pure-escapes-webapp-dev.s3-website.eu-west-2.amazonaws.com/assets/cover_photo.png'
    );
    const title = text('Title');
    const children = text('Content');

    return (
      <Hero media={{ image }} title={title}>
        {children}
      </Hero>
    );
  })
  .add('Full', () => {
    const image = text(
      'Image',
      'http://pure-escapes-webapp-dev.s3-website.eu-west-2.amazonaws.com/assets/cover_photo.png'
    );
    const title = text('Title');
    const children = text('Content');

    return (
      <div style={{ height: '1000px', display: 'flex', 'flex-direction': 'column' }}>
        <Hero media={{ image }} title={title} full>
          {children}
        </Hero>
      </div>
    );
  })
  .add('With Video', () => {
    const image = text(
      'Image',
      'http://pure-escapes-webapp-dev.s3-website.eu-west-2.amazonaws.com/assets/cover_photo.png'
    );
    const title = text('Title');
    const children = text('Content');

    return (
      <div style={{ height: '1000px', display: 'flex', 'flex-direction': 'column' }}>
        <Hero
          media={{
            image,
            video: {
              path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
              type: 'mp4',
            },
          }}
          title={title}
        >
          {children}
        </Hero>
      </div>
    );
  });