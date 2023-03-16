export const mapFunctions = [
  ['undefined', undefined, 'Something to stdout\nAnother thing to stdout\n', 'Something to stderr\n'],
  ['noop', (line: string) => line, 'Something to stdout\nAnother thing to stdout\n', 'Something to stderr\n'],
  ['prefix', (line: string) => `prefix: ${line}`, 'prefix: Something to stdout\nprefix: Another thing to stdout\n', 'prefix: Something to stderr\n'],
  ['suffix', (line: string) => `${line.slice(undefined, -1)} (suffix)\n`, 'Something to stdout (suffix)\nAnother thing to stdout (suffix)\n', 'Something to stderr (suffix)\n'],
  ['replace', (line: string) => `${line.replaceAll('e', 'k')}`, 'Somkthing to stdout\nAnothkr thing to stdout\n', 'Somkthing to stdkrr\n'],
] as const;

export const getMapFunction = (name?: string): ((line: string) => string) | undefined => {
  if (name === undefined) {
    throw new Error('Map function not set');
  }

  const entry = mapFunctions.find((f) => f[0] === name);

  if (!entry) {
    throw new Error(`Unknown map function: ${name}`);
  }

  return entry[1];
};
