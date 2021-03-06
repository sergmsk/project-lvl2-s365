import _ from 'lodash';

const isNumeric = num => !isNaN(parseFloat(num)) && isFinite(num); // eslint-disable-line
const stringify = (arg) => {
  const types = {
    boolean: arg,
    number: arg,
    string: `'${arg}'`,
    object: '[complex value]',
  };
  return isNumeric(arg) ? parseFloat(arg) : types[typeof arg];
};

const renderAsPlain = (ast, parent = '') => {
  const getFromTo = el => `From ${stringify(el.oldValue)} to ${stringify(el.newValue)}`;
  const getStringAddedWith = el => (_.isObject(el.value) ? '[complex value]' : `value: ${stringify(el.value)}`);
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
