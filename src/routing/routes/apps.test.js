import { map } from 'ramda';

import appsRoutes from './apps';

const takeSnapshot = route => expect(route).toMatchSnapshot();

describe('routing', () => {
  it('routes match snapshot', () => {
    map(takeSnapshot, appsRoutes);
  });
});
