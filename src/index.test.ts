import { describe, test, expect } from 'vitest';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { mapFunctions } from './test_functions';

describe.each(mapFunctions)('%s: stdout', (name1, _fn1, stdout1) => {
  test.each(mapFunctions)('%s: stderr', (name2, _fn2, _stdout2, stderr2) => {
    const res = spawnSync(
      resolve(__dirname, 'test_run.ts'),
      { env: { MAP_STDOUT_FN: name1, MAP_STDERR_FN: name2, PATH: process.env.PATH } },
    );
    expect(res.error).toBeUndefined();
    expect(res.stdout.toString()).toBe(stdout1);
    expect(res.stderr.toString()).toBe(stderr2);
  });
});

test('exits with appropriate status code', () => {
  spawnSync(resolve(__dirname, 'test_run.ts'), ['exitWithCode27']);
});
