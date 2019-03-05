import React from 'react';

import RadioButton from './RadioButton';

const getComponent = props => shallow(<RadioButton {...props} />);

describe('<RadioButton />', () => {
  describe('render', () => {
    it('matches snapshots', () => {
      expect(getComponent({ options: [{ value: 'true', label: 'An option' }] })).toMatchSnapshot();
    });
  });
});
