import renderAsTree from './tree';
import renderAsPlain from './plain';
import renderAsJSON from './json';

const choiceRenderFormat = (format) => {
  const handler = { tree: renderAsTree, plain: renderAsPlain, json: renderAsJSON };
  return handler[format];
};

export default (ast, format = 'tree') => {
  const rend = choiceRenderFormat(format);
  return rend(ast);
};
