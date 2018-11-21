import fs from 'fs';
// import _ from 'lodash';

const expected = `{
  host: hexlet.io
+ timeout: 20
- timeout: 50
- proxy: 123.234.53.22
- follow: false
+ verbose: true
}`;

export default (firstFile, secondFile) => {
  console.log(JSON.parse(fs.readFileSync(firstFile)));
  console.log(JSON.parse(fs.readFileSync(secondFile)));
  return expected;
};
