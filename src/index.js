import fs from 'fs';
import { extname } from 'path';
import _ from 'lodash';
import parsers from './parsers';


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
  const first = parsers(extname(firstFile), fs.readFileSync(firstFile, 'utf-8'));
  const second = parsers(extname(secondFile), fs.readFileSync(secondFile, 'utf-8'));
  const keys = _.union(Object.keys(first), Object.keys(second));
  const dispatcher = key => _.find(typeDispatcher, disp => disp.check(first, second, key));
  const result = keys.reduce((acc, key) => (
    [...acc, dispatcher(key).string(first, second, key)]
  ), []);
  return `{\n${result.join('\n')}\n}`;
};
