import renderAsTree from './tree';
import renderAsPlain from './plain';
import renderAsJSON from './json';

const choiceRenderFormat = {
  tree: renderAsTree,
  plain: renderAsPlain,
  json: renderAsJSON,
};

export default (ast, format = 'tree') => {
  const render = choiceRenderFormat[format];
  return render(ast);
};
