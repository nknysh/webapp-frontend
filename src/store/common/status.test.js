import { values } from 'ramda';

import Status from './status';

describe('Status', () => {
  it('returns all statuses', () => {
    expect(values(Status)).toHaveLength(5);

    expect(Status).toHaveProperty('SUCCESS');
    expect(Status).toHaveProperty('IDLE');
    expect(Status).toHaveProperty('LOADING');
    expect(Status).toHaveProperty('ERROR');
    expect(Status).toHaveProperty('SAVING');
  });

  it('is immutable', () => {
    expect(() => {
      Status.foo = 'bar';
    }).toThrow();
  });
});
