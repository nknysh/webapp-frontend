import { map } from 'ramda';

import adminRoutes from './admin';

const takeSnapshot = route => expect(route).toMatchSnapshot();

describe('routing', () => {
  it('admin routes match snapshot', () => {
    map(takeSnapshot, adminRoutes);
  });
});
