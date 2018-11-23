import fs from 'fs';
import gendiff from '../src';

const before = '__tests__/__fixtures__/before';
const after = '__tests__/__fixtures__/after';
const res = '__tests__/__fixtures__/result';

describe('show diff', () => {
  it('simple json -> json', () => {
    const json = gendiff(`${before}.json`, `${after}.json`);
    const expected = fs.readFileSync(res, 'utf8');
    expect(json).toBe(expected);
  });
  it('simple yml -> yml', () => {
    const yml = gendiff(`${before}.yml`, `${after}.yml`);
    const expected = fs.readFileSync(res, 'utf8');
    expect(yml).toBe(expected);
  });
  it('simple ini -> ini', () => {
    const ini = gendiff(`${before}.ini`, `${after}.ini`);
    const expected = fs.readFileSync(res, 'utf8');
    expect(ini).toBe(expected);
  });
});
