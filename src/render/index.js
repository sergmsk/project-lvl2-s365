import renderAsTree from './tree';

const choice = format => {
  const handler = {
    'tree' : renderAsTree,
  }
  return handler[format];
}

export default (ast, format = 'tree') => {
  const rend = choice(format);
  return rend(ast);
};

