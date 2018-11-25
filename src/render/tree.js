import _ from 'lodash';

const stringify = (value, currDept = 1, tab = 4) => {
  const space = currDept * tab;
  if (!_.isObject(value)) {
    return value;
  }
  const body = Object.keys(value)
    .map(key => `${' '.repeat(space)}${key}: ${stringify(value[key], currDept + 1)}`)
    .join('\n');
  return `{\n${body}\n${' '.repeat(space - tab)}}`;
};

const renderAsTree = (ast, currDept = 1, tab = 4) => {
  const space = currDept * tab;
  const getString = (name, value, symb = ' ') => (
    `${' '.repeat(space - 2)}${symb} ${name}: ${stringify(value, currDept + 1)}`
  );
  const toString = (element) => {
    const handle = {
      unchanged: el => getString(el.key, el.value),
      added: el => getString(el.key, el.value, '+'),
      removed: el => getString(el.key, el.value, '-'),
      changed: el => [getString(el.key, el.before, '-'), getString(el.key, el.after, '+')],
      nested: el => `${' '.repeat(space)}${el.key}: ${renderAsTree(el.children, currDept + 1)}`,
    };
    return handle[element.type](element);
  }

  const res = _.flatten(ast.map(element => toString(element))).join('\n');
  return `{\n${res}\n${' '.repeat(space - tab)}}`;
};

export default renderAsTree;
