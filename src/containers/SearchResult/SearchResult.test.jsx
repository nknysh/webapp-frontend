import React from 'react';

import { SearchResult } from './SearchResult';

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
    features: [],
  },
};

const getComponent = props => shallow(<SearchResult {...defaultProps} {...props} />);

describe('<SearchResult />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
