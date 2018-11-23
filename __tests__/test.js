import { readFileSync } from 'fs';
import gendiff from '../src';

const before = '__tests__/__fixtures__/before';
const after = '__tests__/__fixtures__/after';
const res = '__tests__/__fixtures__/result';

describe('diff flat', () => {
  it('simple JSON -> JSON', () => {
    const expected = readFileSync(res, 'utf8');
    expect(gendiff(`${before}.json`, `${after}.json`)).toBe(expected);
  });

  it('simple yml -> yml', () => {
    const expected = readFileSync(res, 'utf8');
    expect(gendiff(`${before}.yml`, `${after}.yml`)).toBe(expected);
  });

  it('simple ini -> ini', () => {
    const expected = readFileSync(res, 'utf8');
    expect(gendiff(`${before}.ini`, `${after}.ini`)).toBe(expected);
  });
});

describe('diff nested', () => {
  it('nested JSON -> JSON', () => {
    const expected = readFileSync(`${res}Nested`, 'utf8');
    expected(gendiff(`${before}Nested.json`, `${after}Nested.json`)).toBe(expected);
  });
});
