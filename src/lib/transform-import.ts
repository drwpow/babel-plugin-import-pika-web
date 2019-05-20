import { dirname, relative, resolve } from 'path';

interface TransformImportParams {
  filename: string;
  moduleName: string;
  webModulesDir: string;
}

export function forwardSlash(str: string): string {
  return str.replace(/\\/g, '/');
}

function transformImport({ filename, moduleName, webModulesDir }: TransformImportParams): string {
  const dir = dirname(filename);

  let newImport;
  if (moduleName[0] === '.') {
    // If local module, use Node to resolve full name
    try {
      newImport = `${relative(dir, require.resolve(resolve(dir, moduleName)))}`;
    } catch (e) {
      console.warn(`Could not find ${moduleName} in ${dir}`);
      newImport = `${moduleName}.js`;
    }
  } else {
    // Otherwise it’s a web module
    newImport = `${relative(dir, webModulesDir)}/${moduleName}.js`;
  }

  // Node doesn’t add ./ for same dir, but this is needed for ESM
  if (newImport[0] !== '.') {
    newImport = `./${newImport}`;
  }

  // Use forward slashes if on Windows
  return forwardSlash(newImport);
}

export default transformImport;
