import { map } from 'ramda';

import appRoutes from './app';

const takeSnapshot = route => expect(route).toMatchSnapshot();

describe('routing', () => {
  it('app routes match snapshot', () => {
    map(takeSnapshot, appRoutes);
  });
});
