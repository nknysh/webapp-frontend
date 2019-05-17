import { map } from 'ramda';

import siteRoutes from './site';

const takeSnapshot = route => expect(route).toMatchSnapshot();

describe('routing', () => {
  it('routes match snapshot', () => {
    map(takeSnapshot, siteRoutes);
  });
});
