import { map } from 'ramda';

import authRoutes from './auth';

const takeSnapshot = route => expect(route).toMatchSnapshot();

describe('routing', () => {
  it('routes match snapshot', () => {
    map(takeSnapshot, authRoutes);
  });
});
