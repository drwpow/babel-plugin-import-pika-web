import transformImport, { forwardSlash } from '../src/lib/transform-import';

beforeAll(() => {
  const mockResolve = () => `/user/test/code/my-module/index.js`;
  mockResolve.paths = () => [];
  require.resolve = mockResolve;
});

describe('transformImport method', () => {
  it('appends .js to relative modules if it can’t resolve', () => {
    const params = {
      filename: '/user/test/code/app.js',
      moduleName: './my-module',
      webModulesDir: '',
    };
    expect(transformImport(params)).toBe('./my-module.js');
  });

  it('transforms absolute modules for root folder', () => {
    const params = {
      filename: '/user/test/code/app.js',
      moduleName: 'vue',
      webModulesDir: '/user/test/code/web_modules',
    };
    expect(transformImport(params)).toBe('./web_modules/vue.js');
  });

  it('transfroms relative modules for nested folders', () => {
    const params = {
      filename: '/user/test/code/components/button.js',
      moduleName: 'vue',
      webModulesDir: '/user/test/code/web_modules',
    };
    expect(transformImport(params)).toBe('../web_modules/vue.js');
  });
});

describe('forwardSlash', () => {
  it('replaces backslashes with forward slashes', () => {
    expect(forwardSlash('path\\to\\module')).toBe('path/to/module');
  });

  it('ignores forward slashes', () => {
    expect(forwardSlash('path/to/module')).toBe('path/to/module');
  });
});
