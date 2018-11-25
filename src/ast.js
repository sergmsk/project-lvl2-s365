import _ from 'lodash';

const dispatcher = [
  {
    type: 'nested',
    check: (f, s, key) => _.isObject(f[key]) && _.isObject(s[key]),
    getState: (f, s, funcAST) => ({ children: funcAST(f, s) }),
  },
  {
    type: 'added',
    check: (f, s, key) => !_.has(f, key) && _.has(s, key),
    getState: (f, s) => ({ value: s }),
  },
  {
    type: 'removed',
    check: (f, s, key) => _.has(f, key) && !_.has(s, key),
    getState: (f, s) => ({ value: f }),
  },
  {
    type: 'changed',
    check: (f, s, key) => _.has(f, key) && _.has(s, key) && (f[key] !== s[key]),
    getState: (f, s) => ({ before: f, after: s }),
  },
  {
    type: 'unchanged',
    check: (f, s, key) => _.has(f, key) && _.has(s, key) && (f[key] === s[key]),
    getState: (f, s) => ({ value: f }),
  },
];

const makeAST = (before, after) => {
  const keys = _.union(Object.keys(before), Object.keys(after));
  return keys.map((key) => {
    const { type, getState } = dispatcher.find(disp => disp.check(before, after, key));
    const state = getState(before[key], after[key], makeAST);
    return ({ key, type, ...state });
  });
};

export default makeAST;