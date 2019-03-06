import React from 'react';

import { DropDownMenu } from './DropDownMenu';

const getComponent = props => shallow(<DropDownMenu {...props} />);

describe('<DropDownMenu />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
