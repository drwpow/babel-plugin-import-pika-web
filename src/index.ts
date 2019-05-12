import { resolve } from 'path';
import { ConfigAPI } from '@babel/core';
import { declare } from '@babel/helper-plugin-utils';
import { importDeclaration, stringLiteral } from '@babel/types';
import shouldSkip from './lib/should-skip';
import transformImport from './lib/transform-import';
import withExtension from './lib/with-extension';

interface ImportPath {
  replaceWith(node: any): void;
  node: {
    specifiers: any;
    source: {
      value: string;
    };
  };
}

interface ImportState {
  file: {
    opts: {
      filename: string;
      cwd: string;
    };
  };
}

export default declare((api: ConfigAPI, opts?: BabelPluginImportPikaWeb.Options) => {
  api.assertVersion(7);

  if (opts && opts.ignore && !Array.isArray(opts.ignore)) {
    console.error(`Expected type string[] for "ignore", got ${typeof opts.ignore}`);
  }

  // Options
  const dir = (opts && opts.dir) || 'web_modules';
  const ignore = (opts && opts.ignore) || [];

  return {
    visitor: {
      ImportDeclaration(path: ImportPath, state: ImportState) {
        let token = path.node.source.value;

        // Skip if this module is relative and has extension
        if (shouldSkip(token)) {
          return;
        }

        // Ignore if in ignore array
        if (ignore.includes(token)) {
          return;
        }

        // If extension missing, add `.js`
        let resolvedImport = withExtension(token);

        // If import is absolute, convert to relative
        if (resolvedImport[0] !== '.') {
          const { filename, cwd } = state.file.opts;
          resolvedImport = transformImport({
            filename,
            moduleName: resolvedImport,
            webModulesDir: resolve(cwd, dir),
          });
        }

        path.replaceWith(importDeclaration(path.node.specifiers, stringLiteral(resolvedImport)));
      },
    },
    post() {},
  };
});
