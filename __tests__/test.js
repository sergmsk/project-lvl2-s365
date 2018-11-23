import { readFileSync } from 'fs';
import gendiff from '../src';

const before = '__tests__/__fixtures__/before';
const after = '__tests__/__fixtures__/after';
const res = '__tests__/__fixtures__/result';


describe('diff', () => {
  it('simple', () => {
    const expected = readFileSync(res, 'utf8');
    expect(gendiff(`${before}.json`, `${after}.json`)).toBe(expected);
    expect(gendiff(`${before}.yml`, `${after}.yml`)).toBe(expected);
    expect(gendiff(`${before}.ini`, `${after}.ini`)).toBe(expected);
  });
});
