import fs from 'fs';
import gendiff from '../src';

describe('show diff', () => {
  it('simple json -> json', () => {
    const current = gendiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
    const expected = fs.readFileSync('__tests__/__fixtures__/result', 'utf8');
    expect(current).toBe(expected);
  });
  it('simple yml -> yml', () => {
    const current = gendiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.yml');
    const expected = fs.readFileSync('__tests__/__fixtures__/result', 'utf8');
    expect(current).toBe(expected);
  });
  it('simple yml -> json', () => {
    const current = gendiff('__tests__/__fixtures__/before.yml', '__tests__/__fixtures__/after.json');
    const expected = fs.readFileSync('__tests__/__fixtures__/result', 'utf8');
    expect(current).toBe(expected);
  });
  it('simple json -> yml', () => {
    const current = gendiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.yml');
    const expected = fs.readFileSync('__tests__/__fixtures__/result', 'utf8');
    expect(current).toBe(expected);
  });
});
