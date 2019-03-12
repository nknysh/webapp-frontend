import React from 'react';

import { Card } from './Card';

const defaultProps = {
  hotel: {
    image: '',
    name: '',
    preferred: true,
    promotionalText: '',
    starRating: 5,
    suitableForHoneymooners: false,
    listPrice: '123',
    additionalInfo: [],
    amenities: [],
  },
};

const getComponent = props => shallow(<Card {...defaultProps} {...props} />);

describe('<Card />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
