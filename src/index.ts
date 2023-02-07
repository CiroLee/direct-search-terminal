#!/usr/bin/env node
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { searchHandler } from './search';
import { searchEngineTable } from './config';
import pkg from '../package.json';

// 允许自定义version和help
const argv = yargs(hideBin(process.argv)).help(false).version(false);
const parsedArgv = argv.parseSync();
const query = parsedArgv._;

// 自定义help信息
function showHelper() {
  const helps = `Usage 
ds <searchEngine> <query>

-v,--version        output the version number
-h,--help           show help info
-l,--list           show supported engine list
  `;
  console.log(helps);
}

(function () {
  const { v, version, h, help, l, list } = parsedArgv;
  if (v || version) {
    console.log(pkg.version);
    process.exit(0);
  }
  if (h || help) {
    showHelper();
    process.exit(0);
  }
  if (l || list) {
    console.log(searchEngineTable());
    process.exit(0);
  }
  searchHandler(query[0] as string, query[1] as string);
})();
