import React from 'react';

import { Video } from './Video';

const getComponent = props => shallow(<Video {...props} />);

describe('<Video />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
      expect(getComponent({ srcs: [{ path: 'http://foo', type: 'mp4' }] })).toMatchSnapshot();
      expect(
        getComponent({ srcs: [{ path: 'http://foo', type: 'mp4' }], fallbackImage: 'http://foo' })
      ).toMatchSnapshot();
    });
  });
});
