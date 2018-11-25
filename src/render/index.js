import renderAsTree from './tree';

const choiceRenderFormat = format => {
  const handler = {
    'tree' : renderAsTree,
  }
  return handler[format];
}

export default (ast, format = 'tree') => {
  const rend = choiceRenderFormat(format);
  return rend(ast);
};

