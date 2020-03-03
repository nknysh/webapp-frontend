import { validHoldHours } from '../helpers';

describe('validHoldHours', () => {
  it('returns the correct boolean for various values', () => {
    expect(validHoldHours('')).toBe(true);
    expect(validHoldHours('1')).toBe(true);
    expect(validHoldHours('11111111')).toBe(true);

    expect(validHoldHours('0')).toBe(false);
    expect(validHoldHours('A')).toBe(false);
    expect(validHoldHours('1A')).toBe(false);
    expect(validHoldHours('A1')).toBe(false);
    expect(validHoldHours('.')).toBe(false);
    expect(validHoldHours('.1')).toBe(false);
    expect(validHoldHours('0.1')).toBe(false);
  });
});
