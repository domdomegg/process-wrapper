# process-wrapper

🌯 Run binaries from node, with easy stdout/stderr manipulation + signal passthrough + exit code propagation.

Useful for building wrappers that affect the behaviour of CLI programs, for example by changing their output format.

## Usage

```ts
import spawnWrapped from 'process-wrapper';

// All arguments and signals are automatically are passed through.
// If the spawned command exits, this process will too with the same status code.
// 'line' is a line printed to an output stream. It includes the line terminator at the end.
spawnWrapped("some-cli", {
  mapStdout: (line) => "my stdout: " + line,
  mapStderr: (line) => "my stderr: " + line,
});
```

## Contributing

Pull requests are welcomed on GitHub! To get started:

1. Install Git and Node.js
2. Clone the repository
3. Install dependencies with `npm install`
4. Run `npm run test` to run tests
5. Build with `npm run build`

## Releases

Versions follow the [semantic versioning spec](https://semver.org/).

To release:

1. Use `npm version <major | minor | patch>` to bump the version
2. Run `git push --follow-tags` to push with tags
3. Wait for GitHub Actions to publish to the NPM registry.
