import React from 'react';

import { Hotel } from './Hotel';

const defaultProps = {
  images: [],
  name: '',
  preferred: true,
  promotionalText: '',
  starRating: 5,
  suitableForHoneymooners: false,
  listPrice: '123',
  additionalInfo: [],
  features: [],
};

const getComponent = props => shallow(<Hotel {...defaultProps} {...props} />);

describe('<Hotel />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
