import { map } from 'ramda';

import routes from './booking';

const takeSnapshot = route => expect(route).toMatchSnapshot();

describe('routing', () => {
  it('routes match snapshot', () => {
    map(takeSnapshot, routes);
  });
});
