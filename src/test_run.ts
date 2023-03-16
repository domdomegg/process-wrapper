#!/usr/bin/env npx ts-node --swc

import { resolve } from 'node:path';
import spawnWrapped from './index';
import { getMapFunction } from './test_functions';

spawnWrapped(resolve(__dirname, 'test_sample.sh'), {
  mapStdout: getMapFunction(process.env['MAP_STDOUT_FN']),
  mapStderr: getMapFunction(process.env['MAP_STDERR_FN']),
});
