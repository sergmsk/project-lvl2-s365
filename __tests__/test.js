import { readFileSync } from 'fs';
import gendiff from '../src';

const before = '__tests__/__fixtures__/before';
const after = '__tests__/__fixtures__/after';
const res = '__tests__/__fixtures__/result';


describe('simple diff', () => {
  it('simple', () => {
    const expected = readFileSync(res, 'utf8');
    const json = gendiff(`${before}.json`, `${after}.json`);
    expect(json).toBe(expected);
    const yml = gendiff(`${before}.yml`, `${after}.yml`);
    expect(yml).toBe(expected);
    const ini = gendiff(`${before}.ini`, `${after}.ini`);
    expect(ini).toBe(expected);
  });
});
