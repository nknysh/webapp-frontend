import { map } from 'ramda';

import offersRoutes from './offers';

const takeSnapshot = route => expect(route).toMatchSnapshot();

describe('routing', () => {
  it('routes match snapshot', () => {
    map(takeSnapshot, offersRoutes);
  });
});
