import React from 'react';

import { Fields } from './Fields';

const getComponent = props => shallow(<Fields {...props} />);

describe('<Fields />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent({ children: ['field', 'field'] })).toMatchSnapshot();
    });
  });
});
