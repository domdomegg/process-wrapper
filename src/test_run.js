#!/usr/bin/env node

// eslint-disable-next-line import/no-extraneous-dependencies
require('ts-node').register({
  projectSearchDir: __dirname,
  swc: true,
});

require('./test_run.ts');
