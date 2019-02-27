import React from 'react';
import { repeat } from 'ramda';

import Sidebar from './Sidebar';

const getComponent = props => shallow(<Sidebar {...props} />);

const testLink = <a>foo</a>;

describe('<Sidebar />', () => {
  describe('render', () => {
    it('matches snapshots', () => {
      expect(getComponent()).toMatchSnapshot();
      expect(getComponent({ title: 'A Sidebar' })).toMatchSnapshot();
      expect(getComponent({ title: 'A Sidebar', links: repeat(testLink, 5) })).toMatchSnapshot();
      expect(getComponent({ title: 'A Sidebar', children: repeat(testLink, 5) })).toMatchSnapshot();
    });
  });
});
