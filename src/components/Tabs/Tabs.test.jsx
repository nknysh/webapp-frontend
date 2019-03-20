import React from 'react';

import { Tabs } from './Tabs';

const getComponent = props => shallow(<Tabs labels={[]} {...props} />);

describe('<Tabs />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
      expect(getComponent({ labels: ['foo', 'bar'] })).toMatchSnapshot();
    });
  });
});
