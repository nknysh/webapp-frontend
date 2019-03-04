import React from 'react';

import Modal from './Modal';

const getComponent = props => shallow(<Modal {...props}>A modal</Modal>);

describe('<Modal />', () => {
  describe('render', () => {
    it('matches snapshots', () => {
      expect(getComponent()).toMatchSnapshot();
      expect(getComponent({ open: true })).toMatchSnapshot();
    });
  });
});
