import fs from 'fs';
import gendiff from '../src';

describe('show diff', () => {
  it('simple text', () => {
    const current = gendiff('__tests__/__fixtures__/before.json', '__tests__/__fixtures__/after.json');
    const expected = fs.readFileSync('__tests__/__fixtures__/result', 'utf8');
    expect(current).toBe(expected);
  });
});
