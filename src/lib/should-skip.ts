import { extname } from 'path';

function shouldSkip(filename: string): boolean {
  return filename[0] === '.' && extname(filename).length > 0;
}

export default shouldSkip;
