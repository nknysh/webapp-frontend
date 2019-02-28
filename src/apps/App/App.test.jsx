import React from 'react';

import { App } from './App';

const getShallow = props => shallow(<App setToken={() => {}} location={{ pathname: '/' }} {...props} />);

describe('<App />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      const component = getShallow();
      expect(component).toMatchSnapshot();
    });
  });
});
