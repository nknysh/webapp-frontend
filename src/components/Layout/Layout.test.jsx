import React from 'react';

import { Layout } from './Layout';

const getComponent = props =>
  shallow(
    <Layout location={{ pathname: '' }} {...props}>
      <h1>Some content</h1>
    </Layout>
  );

describe.skip('<Layout />', () => {
  describe('render', () => {
    it('matches snapshot', () => {
      expect(getComponent()).toMatchSnapshot();
    });
  });
});
