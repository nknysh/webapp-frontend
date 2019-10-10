import React from 'react';
import { LodgingSelect } from './LodgingSelect';

const getComponent = props => shallow(<LodgingSelect {...props} />);

describe('<LodgingSelect />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
