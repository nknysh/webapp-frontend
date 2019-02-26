import React from 'react';

import { App } from './App';

const getShallow = props => shallow(<App location={{ pathname: '/' }} getUserToken={() => {}} {...props} />);

describe('<App />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      const component = getShallow();
      expect(component).toMatchSnapshot();
    });
  });
});
