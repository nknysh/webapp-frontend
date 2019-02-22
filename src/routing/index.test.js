import { map } from 'ramda';

import routes from './index';

describe('routing', () => {
  it('routes match snapshot', () => {
    const takeSnapshot = route => expect(route).toMatchSnapshot();
    map(takeSnapshot, routes);
  });
});
