import React from 'react';

import Markdown from './Markdown';

const getComponent = props => shallow(<Markdown {...props} />);

describe('<Markdown />', () => {
  describe('render', () => {
    it('matches snapshots', () => {
      expect(getComponent()).toMatchSnapshot();
      expect(getComponent({ children: '' })).toMatchSnapshot();
      expect(getComponent({ children: '### test content' })).toMatchSnapshot();
      expect(getComponent({ children: '<p>test content</p>' })).toMatchSnapshot();
    });
  });
});
