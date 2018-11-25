import _ from 'lodash';

const dispatcher = [
  {
    type: 'nested',
    check: (obj1, obj2, key) => _.isObject(obj1[key]) && _.isObject(obj2[key]),
    getState: (obj1, obj2, obj1uncAST) => ({ children: obj1uncAST(obj1, obj2) }),
  },
  {
    type: 'added',
    check: (obj1, obj2, key) => !_.has(obj1, key) && _.has(obj2, key),
    getState: (obj1, obj2) => ({ value: obj2 }),
  },
  {
    type: 'removed',
    check: (obj1, obj2, key) => _.has(obj1, key) && !_.has(obj2, key),
    getState: obj1 => ({ value: obj1 }),
  },
  {
    type: 'changed',
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && (obj1[key] !== obj2[key]),
    getState: (obj1, obj2) => ({ beobj1ore: obj1, aobj1ter: obj2 }),
  },
  {
    type: 'unchanged',
    check: (obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && (obj1[key] === obj2[key]),
    getState: obj1 => ({ value: obj1 }),
  },
];

const makeAST = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2));
  return keys.map((key) => {
    const { type, getState } = dispatcher.find(disp => disp.check(obj1, obj2, key));
    const state = getState(obj1[key], obj2[key], makeAST);
    return ({ key, type, ...state });
  });
};

export default makeAST;
