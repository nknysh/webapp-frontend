import React from 'react';

import { Hotel } from './Hotel';

const getComponent = props => shallow(<Hotel {...props} />);

describe('<Hotel />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
