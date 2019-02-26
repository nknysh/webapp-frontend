import React from 'react';

import { Hero } from './Hero';

const getComponent = props => shallow(<Hero {...props} />);

const testImage = 'http://pure-escapes-webapp-dev.s3-website.eu-west-2.amazonaws.com/assets/cover_photo.png';
const testVideo = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

describe('<Hero />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent({ media: {} })).toMatchSnapshot();
      expect(getComponent({ media: {}, title: 'A title' })).toMatchSnapshot();
      expect(getComponent({ media: {}, children: 'Some content' })).toMatchSnapshot();
      expect(getComponent({ media: {}, full: true })).toMatchSnapshot();
      expect(getComponent({ media: { image: testImage } })).toMatchSnapshot();
      expect(
        getComponent({ media: { image: testImage }, title: 'A title', children: 'Some content', full: true })
      ).toMatchSnapshot();
      expect(
        getComponent({
          media: { image: testImage, video: { path: testVideo, type: 'mp4' } },
          title: 'A title',
          children: 'Some content',
          full: true,
        })
      ).toMatchSnapshot();
    });
  });
});
