import { map } from 'ramda';

import searchRoute from './search';

const takeSnapshot = route => expect(route).toMatchSnapshot();

describe('routing', () => {
  it('routes match snapshot', () => {
    map(takeSnapshot, searchRoute);
  });
});
