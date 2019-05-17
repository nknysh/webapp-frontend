import { map } from 'ramda';

import nfRoute from './hotels';

const takeSnapshot = route => expect(route).toMatchSnapshot();

describe('routing', () => {
  it('routes match snapshot', () => {
    map(takeSnapshot, nfRoute);
  });
});
