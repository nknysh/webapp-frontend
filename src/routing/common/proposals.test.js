import { map } from 'ramda';

import proposalRoutes from './proposals';

const takeSnapshot = route => expect(route).toMatchSnapshot();

describe('routing', () => {
  it('routes match snapshot', () => {
    map(takeSnapshot, proposalRoutes);
  });
});
