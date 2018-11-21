#!/usr/bin/env node

import program from 'commander';
import gendiff from '..';

program
  .version('0.0.5')
  .description('Compares two configuration files and shows a difference.')
  .option('-f --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((first, second) => console.log(gendiff(first, second)))
  .parse(process.argv);
