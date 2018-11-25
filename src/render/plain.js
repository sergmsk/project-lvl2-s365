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
  const toString = (element) => {
    const handler = {
      nested: el => `${renderAsPlain(el.children, `${parent}${el.key}.`)}`,
      removed: el => getString(el),
      modified: (el) => {
        const body = `. From ${getValue(el.before)} to ${getValue(el.after)}`;
        return getString(el, body);
      },
      added: (el) => {
        const stringify = ` with ${_.isObject(el.value)
          ? '[complex value]'
          : `value: ${getValue(el.value)}`}`;
        return getString(el, stringify);
      },
    };
    return handler[element.type](element);
  };

  const filtered = ast.filter(element => element.type !== 'unchanged');
  return filtered.map(element => toString(element)).join('\n');
};

export default renderAsPlain;