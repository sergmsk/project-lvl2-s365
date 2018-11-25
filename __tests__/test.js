import { readFileSync } from 'fs';
import gendiff from '../src';

const before = '__tests__/__fixtures__/before';
const after = '__tests__/__fixtures__/after';
const res = '__tests__/__fixtures__/result';

describe('diff tree flat', () => {
  it('simple JSON -> JSON', () => {
    const expected = readFileSync(res, 'utf-8');
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

describe('diff JSON flat', () => {
  it('simple JSON -> JSON', () => {
    const expected = readFileSync(`${res}.json`, 'utf-8');
    expect(gendiff(`${before}.json`, `${after}.json`, 'json')).toBe(expected);
  });

  it('simple yml -> yml', () => {
    const expected = readFileSync(`${res}.json`, 'utf8');
    expect(gendiff(`${before}.yml`, `${after}.yml`, 'json')).toBe(expected);
  });
});

describe('diff plain flat ', () => {
  it('nested JSON -> JSON', () => {
    const expected = readFileSync(`${res}Plain`, 'utf-8');
    expect(gendiff(`${before}.json`, `${after}.json`, 'plain')).toBe(expected);
  });

  it('nested yml -> yml', () => {
    const expected = readFileSync(`${res}Plain`, 'utf-8');
    expect(gendiff(`${before}.yml`, `${after}.yml`, 'plain')).toBe(expected);
  });

  it('nested ini -> ini', () => {
    const expected = readFileSync(`${res}Plain`, 'utf-8');
    expect(gendiff(`${before}.ini`, `${after}.ini`, 'plain')).toBe(expected);
  });
});

describe('diff tree nested', () => {
  it('nested JSON -> JSON', () => {
    const expected = readFileSync(`${res}Nested`, 'utf-8');
    expect(gendiff(`${before}Nested.json`, `${after}Nested.json`)).toBe(expected);
  });

  it('nested yml -> yml', () => {
    const expected = readFileSync(`${res}Nested`, 'utf-8');
    expect(gendiff(`${before}Nested.yml`, `${after}Nested.yml`)).toBe(expected);
  });
});

describe('diff plain nested ', () => {
  it('nested JSON -> JSON', () => {
    const expected = readFileSync(`${res}NestedPlain`, 'utf-8');
    expect(gendiff(`${before}Nested.json`, `${after}Nested.json`, 'plain')).toBe(expected);
  });

  it('nested yml -> yml', () => {
    const expected = readFileSync(`${res}NestedPlain`, 'utf-8');
    expect(gendiff(`${before}Nested.yml`, `${after}Nested.yml`, 'plain')).toBe(expected);
  });
});

describe('diff JSON nested ', () => {
  it('nested JSON -> JSON', () => {
    const expected = readFileSync(`${res}Nested.json`, 'utf-8');
    expect(gendiff(`${before}Nested.json`, `${after}Nested.json`, 'json')).toBe(expected);
  });

  it('nested yml -> yml', () => {
    const expected = readFileSync(`${res}Nested.json`, 'utf-8');
    expect(gendiff(`${before}Nested.yml`, `${after}Nested.yml`, 'json')).toBe(expected);
  });
});
