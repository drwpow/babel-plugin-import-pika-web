import shouldSkip from '../src/lib/should-skip';

describe('shouldSkip', () => {
  it('doesn’t skip absolute modules', () => {
    expect(shouldSkip('react')).toBe(false);
  });

  it('doesn’t skip absolute modules with extensions', () => {
    expect(shouldSkip('react.js')).toBe(false);
  });

  it('doesn’t skip relative modules without extensions', () => {
    expect(shouldSkip('./components/Button')).toBe(false);
  });

  it('skips relative modules with extensions', () => {
    expect(shouldSkip('./lib/string.js')).toBe(true);
  });
});
