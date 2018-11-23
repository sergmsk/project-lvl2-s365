import fs from 'fs';
import gendiff from '../src';

const before = '__tests__/__fixtures__/before';
const after = '__tests__/__fixtures__/after';
const res = '__tests__/__fixtures__/result';
const expected = fs.readFileSync(res, 'utf8');

describe('show diff', () => {
  it('simple json -> json', () => {
    const json = gendiff(`${before}.json`, `${after}.json`);
    expect(json).toBe(expected);
  });
  it('simple yml -> yml', () => {
    const yml = gendiff(`${before}.yml`, `${after}.yml`);
    expect(yml).toBe(expected);
  });
  it('simple ini -> ini', () => {
    const ini = gendiff(`${before}.ini`, `${after}.ini`);
    expect(ini).toBe(expected);
  });
});
