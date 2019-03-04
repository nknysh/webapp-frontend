import { map } from 'ramda';

import pageRoute from './page';

const takeSnapshot = route => expect(route).toMatchSnapshot();

describe('routing', () => {
  it('routes match snapshot', () => {
    map(takeSnapshot, pageRoute);
  });
});
