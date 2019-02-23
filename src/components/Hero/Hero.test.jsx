import React from 'react';

import { Hero } from './Hero';

const getComponent = props => shallow(<Hero {...props} />);

const testImage = 'http://pure-escapes-webapp-dev.s3-website.eu-west-2.amazonaws.com/assets/cover_photo.png';

describe('<Hero />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
      expect(getComponent({ image: testImage })).toMatchSnapshot();
      expect(getComponent({ title: 'A title' })).toMatchSnapshot();
      expect(getComponent({ children: 'Some content' })).toMatchSnapshot();
      expect(getComponent({ full: true })).toMatchSnapshot();
      expect(
        getComponent({ image: testImage, title: 'A title', children: 'Some content', full: true })
      ).toMatchSnapshot();
    });
  });
});
