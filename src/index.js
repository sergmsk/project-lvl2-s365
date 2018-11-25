import { readFileSync } from 'fs';
import { extname } from 'path';
import getJSObj from './parsers';
import makeAST from './ast';
import render from './render';

export default (firstFile, secondFile, format = 'tree') => {
  const firstObj = getJSObj(extname(firstFile), readFileSync(firstFile, 'utf-8'));
  const secondObj = getJSObj(extname(secondFile), readFileSync(secondFile, 'utf-8'));
  const ast = makeAST(firstObj, secondObj);
  return render(ast, format);
};
