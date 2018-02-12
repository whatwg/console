# Console Standard

All web browsers, and most other JavaScript environments, have shipped some form of developer console. This standard attempts to finally define the semantics of the console APIs, in an attempt to create convergence.

A list containing some of the observed differences so far in different environments is available in [NOTES.md](NOTES.md).

## Work in progress

This specification is still in its very early stages. It is very much a work in progress.

## Building the spec

The Console Standard is written in [Bikeshed](https://github.com/tabatkins/bikeshed), and is available at https://console.spec.whatwg.org/. The main source is in the file `index.bs`.

To build the standard locally, you can either use a locally installed copy of [Bikeshed](https://github.com/tabatkins/bikeshed) by running `make` or use the HTTP API version by running `make remote`.

If you want to do a complete "local deploy" including commit and/or branch snapshots, run

```
make deploy
```

## Tests

Tests can be found in the `console/` directory of [web-platform-tests](https://github.com/w3c/web-platform-tests).

## Contribution guidelines

For guidelines on how to build and edit the spec, see [CONTRIBUTING.md](CONTRIBUTING.md).

## Merge policy

If you can commit to this repository, see the [WHATWG Maintainer Guidelines](https://github.com/whatwg/meta/blob/master/MAINTAINERS.md).

## Code of Conduct

We are committed to providing a friendly, safe and welcoming environment for all. Please read and respect the [WHATWG Code of Conduct](https://whatwg.org/code-of-conduct).
