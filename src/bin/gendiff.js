#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .version('0.0.17')
  .description('Compares two configuration files and shows a difference.')
  .option('-f --format [type]', 'output format: tree, plain, json', 'tree')
  .arguments('<firstConfig> <secondConfig>')
  .action((file1, file2, options) => console.log(gendiff(file1, file2, options.format)))
  .parse(process.argv);
