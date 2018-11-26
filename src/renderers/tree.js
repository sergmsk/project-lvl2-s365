import _ from 'lodash';

const stringify = (value, currDept = 1) => {
  if (!_.isObject(value)) return value;
  const tab = 4;
  const space = currDept * tab;
  const stringifedComplexValue = Object.keys(value)
    .map(key => `${' '.repeat(space)}${key}: ${stringify(value[key], currDept + 1)}`)
    .join('\n');
  return `{\n${stringifedComplexValue}\n${' '.repeat(space - tab)}}`;
};

const renderAsTree = (ast, currDept = 1) => {
  const tab = 4;
  const space = currDept * tab;
  const getString = (name, value, symb = ' ') => (
    `${' '.repeat(space - 2)}${symb} ${name}: ${stringify(value, currDept + 1)}`
  );
  const toString = (element) => {
    const handle = {
      unchanged: el => getString(el.key, el.value),
      added: el => getString(el.key, el.value, '+'),
      removed: el => getString(el.key, el.value, '-'),
      changed: el => [getString(el.key, el.oldValue, '-'), getString(el.key, el.newValue, '+')],
      nested: el => `${' '.repeat(space)}${el.key}: ${renderAsTree(el.children, currDept + 1)}`,
    };
    return handle[element.type](element);
  };

  const res = _.flatten(ast.map(element => toString(element))).join('\n');
  return `{\n${res}\n${' '.repeat(space - tab)}}`;
};

export default renderAsTree;
