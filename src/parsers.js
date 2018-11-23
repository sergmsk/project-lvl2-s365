import { safeLoad } from 'js-yaml';
import { decode } from 'ini';

const parsers = (ext) => {
  const handler = {
    '.json': JSON.parse,
    '.yaml': safeLoad,
    '.yml': safeLoad,
    '.ini': decode,
  };
  return handler[ext];
};

export default (fileExt, data) => {
  const parse = parsers(fileExt);
  return parse(data);
};
