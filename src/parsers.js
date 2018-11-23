import { safeLoad } from 'js-yaml';

const parsers = (ext) => {
  const handler = {
    '.json': JSON.parse,
    '.yaml': safeLoad,
    '.yml': safeLoad,
  };
  return handler[ext];
};

export default (fileExt, file) => {
  const parse = parsers(fileExt);
  return parse(file);
};
