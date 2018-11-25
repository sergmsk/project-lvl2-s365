import _ from 'lodash';

const getValue = (arg) => {
  const types = {
    boolean: (`'${arg}'`),
    string: (`'${arg}'`),
    object: 'complex value',
  };
  return types[typeof arg];
};

const renderAsPlain = (ast, parent) => {
  const getString = (el, body = '') => `Property '${parent}${el.key}' was ${el.type}${body}`;
  const cases = {
    nested: el => `${renderAsPlain(el.children, `${parent}${el.key}.`)}`,
    modified: (el) => {
      const body = `. From ${getValue(el.before)} to ${getValue(el.after)}`;
      return getString(el, body);
    },
    added: (el) => {
      const stringify = ` with ${_.isObject(el.value)
        ? 'complex value'
        : `value: ${getValue(el.value)}`}`;
      return getString(el, stringify);
    },
    removed: el => getString(el),
  };

  const filtered = ast.filter(element => element.type !== 'unchanged');
  return filtered.map(node => cases[node.nodeType](node)).join('\n');
};

export default renderAsPlain;
