import { extname } from 'path';

function withExtension(filename: string): string {
  const ext = extname(filename);
  return ext.length ? filename : `${filename}.js`;
}

export default withExtension;
