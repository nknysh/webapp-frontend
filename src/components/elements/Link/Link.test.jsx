import React from 'react';

import Link from './Link';

const getComponent = props => shallow(<Link to="/" {...props} />);

describe('<Link />', () => {
  describe('render', () => {
    it('matches default link snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
    it('matches inverse link snapshot', () => {
      expect(getComponent({ inverse: true })).toMatchSnapshot();
    });
  });
});
