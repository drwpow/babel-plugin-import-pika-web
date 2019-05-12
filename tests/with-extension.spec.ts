import withExtension from '../src/lib/with-extension';

describe('withExtension', () => {
  it('appends ".js" to the end of filenames', () => {
    expect(withExtension('module')).toBe('module.js');
  });

  it('skips adding an extension to one already present', () => {
    expect(withExtension('highlight.js')).toBe('highlight.js');
  });
});
