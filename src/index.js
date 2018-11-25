import { readFileSync } from 'fs';
import { extname } from 'path';
import parsers from './parsers';
import makeAST from './ast';
import render from './render'

export default (firstFile, secondFile, format) => {
  const first = parsers(extname(firstFile), readFileSync(firstFile, 'utf-8'));
  const second = parsers(extname(secondFile), readFileSync(secondFile, 'utf-8'));
  const ast = makeAST(first, second);
  const res = render(ast, format = 'tree');
  return res;
};
