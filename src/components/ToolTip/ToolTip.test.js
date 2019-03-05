import React from 'react';

import ToolTip from './ToolTip';

const getComponent = props => shallow(<ToolTip {...props} />);

describe('<ToolTip />', () => {
  describe('render', () => {
    it('matches snapshots', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
