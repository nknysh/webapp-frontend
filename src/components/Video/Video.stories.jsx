import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';

import Video from './Video';

storiesOf('Video', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    return (
      <Video
        autoPlay
        srcs={[
          object('Video path', {
            path: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            type: 'mp4',
          }),
        ]}
      />
    );
  });
