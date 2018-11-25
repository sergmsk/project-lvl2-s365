import _ from 'lodash';

const getValue = (arg) => {
  const types = {
    boolean: arg,
    number: arg,
    string: `'${arg}'`,
    object: '[complex value]',
  };
  return types[typeof arg];
};

const renderAsPlain = (ast, parent = '') => {
  const getFromTo = el => `From ${getValue(el.before)} to ${getValue(el.after)}`;
  const getStringAddedWith = el => (_.isObject(el.value) ? '[complex value]' : `value: ${getValue(el.value)}`);
  const handlerAction = {
    nested: el => `${renderAsPlain(el.children, `${parent}${el.key}.`)}`,
    changed: el => `Property '${parent}${el.key}' was update. ${getFromTo(el)}`,
    added: el => `Property '${parent}${el.key}' was added with ${getStringAddedWith(el)}`,
    removed: el => `Property '${parent}${el.key}' was removed`,
  };
  const filtered = ast.filter(el => el.type !== 'unchanged');
  return filtered.map(el => handlerAction[el.type](el)).join('\n');
};

export default renderAsPlain;
