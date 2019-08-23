import React from 'react';

import { Breadcrumbs } from './Breadcrumbs';

const getComponent = props => shallow(<Breadcrumbs location={{ pathname: '' }} {...props} />);

describe('<Breadcrumbs />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
      expect(getComponent({ links: [{ label: <div /> }] })).toMatchSnapshot();
      expect(getComponent({ links: [{ label: 'foo', to: 'bar' }] })).toMatchSnapshot();
      expect(getComponent({ links: [{ label: 'foo', to: 'bar' }, { label: <div /> }] })).toMatchSnapshot();
    });
  });
});
