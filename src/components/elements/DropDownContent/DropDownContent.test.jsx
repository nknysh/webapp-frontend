import React from 'react';

import { DropDownContent } from './DropDownContent';

const getComponent = props => shallow(<DropDownContent {...props} />);

describe('<DropDownContent />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
