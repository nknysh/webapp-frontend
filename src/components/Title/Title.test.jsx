import React from 'react';

import { Title } from './Title';

const getComponent = props => shallow(<Title {...props} />);

describe('<Title />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent({ children: 'A Title' })).toMatchSnapshot();
    });
  });
});
