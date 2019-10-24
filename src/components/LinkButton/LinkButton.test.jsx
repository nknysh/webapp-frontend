import React from 'react';

import LinkButton from './';

const defaultProps = {
  title: 'My button',
};

describe('<LinkButton />', () => {
  describe('render', () => {
    it('matches snapshots (default props)', () => {
      const subject = shallow(<LinkButton {...defaultProps}>Test Button</LinkButton>);
      expect(subject).toMatchSnapshot();
    });
  });
});
