#!/usr/bin/env node

require('ts-node').register({
	projectSearchDir: __dirname,
	swc: true,
});

require('./test_run.ts');
