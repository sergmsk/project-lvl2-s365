import { readFileSync } from 'fs';
import { extname } from 'path';
import _ from 'lodash';
import parsers from './parsers';
import makeAST from './ast';
import render from './render/..'

const typeDispatcher = [
  {
    type: 'added',
    check: (f, s, key) => !_.has(f, key) && _.has(s, key),
    string: (f, s, key) => `+ ${key}: ${s[key]}`,
  },
  {
    type: 'removed',
    check: (f, s, key) => _.has(f, key) && !_.has(s, key),
    string: (f, s, key) => `- ${key}: ${f[key]}`,
  },
  {
    type: 'changed',
    check: (f, s, key) => _.has(f, key) && _.has(s, key) && f[key] !== s[key],
    string: (f, s, key) => `+ ${key}: ${s[key]}\n- ${key}: ${f[key]}`,
  },
  {
    type: 'unchanged',
    check: (f, s, key) => _.has(f, key) && _.has(s, key) && f[key] === s[key],
    string: (f, s, key) => `  ${key}: ${f[key]}`,
  },
];

export default (firstFile, secondFile) => {
  const first = parsers(extname(firstFile), readFileSync(firstFile, 'utf-8'));
  const second = parsers(extname(secondFile), readFileSync(secondFile, 'utf-8'));
  const ast = makeAST(first, second);
  return render(ast, 'string');
  // const keys = _.union(Object.keys(first), Object.keys(second));
  // const dispatcher = key => _.find(typeDispatcher, disp => disp.check(first, second, key));
  // const result = keys.reduce((acc, key) => (
  //   [...acc, dispatcher(key).string(first, second, key)]
  // ), []);
  // return `{\n${result.join('\n')}\n}`;
};
