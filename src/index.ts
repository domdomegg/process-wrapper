import { spawn } from 'node:child_process';
import { EOL } from 'os';
import type { Readable, Writable } from 'node:stream';
import PASSTHROUGHABLE_SIGNALS from './signals';

export interface ProcessWrapperOptions {
  mapStdout?: ((line: string) => string) | undefined,
  mapStderr?: ((line: string) => string) | undefined,
}

const spawnWrapped = (command: string, options: ProcessWrapperOptions = {}) => {
  const wrapped = spawn(command, process.argv.slice(2));

  mapStreamLines(wrapped.stdout, process.stdout, options.mapStdout);
  mapStreamLines(wrapped.stderr, process.stderr, options.mapStderr);

  PASSTHROUGHABLE_SIGNALS.forEach((signal) => {
    process.on(signal, () => {
      wrapped.kill(signal);
    });
  });

  wrapped.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
    } else {
      process.exit(code ?? undefined);
    }
  });
};

const mapStreamLines = (readable: Readable, writable: Writable, lineMapper?: ((line: string) => string) | undefined) => {
  if (!lineMapper) {
    readable.pipe(writable);
    return;
  }

  let lineBuffer = '';
  readable.on('data', (data) => {
    lineBuffer += data.toString();
    const lines = lineBuffer.split(EOL);

    for (let i = 0; i < lines.length - 1; i += 1) {
      const line = lines[i] + EOL;

      writable.write(lineMapper(line));
    }
    lineBuffer = lines[lines.length - 1] ?? '';
  });
};

export default spawnWrapped;
